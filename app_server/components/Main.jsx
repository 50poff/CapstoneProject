const React = require("react");
const Login = require("./Login.jsx");
const TestPage = require("./TestPage.jsx"); // for testing only
const NavigationBar = require("./NavigationBar.jsx"); // SHOULD render only once the user has logged in

/*************************************** */
/******* Components for Role Tools *******/
/*************************************** */

const ChangePassword = require("./ChangePassword.jsx");
/* *** Admin tools *** */
const AddUser = require("./AddUser/AddUser.jsx");
const EditUser = require("./EditUser.jsx");

/* *** Hiring Team Member tools *** */
const ScheduleaMeeting = require("./MakeMeeting/MakeMeeting.jsx");
const ViewCandidates = require("./ViewCandidates/ViewCandidates.jsx");
const ViewScheduledInterviews = require("./ViewScheduledInterviews.jsx");
const ViewTimeslots = require("./ViewTimeslots.jsx");
const ViewAvailability = require("./ViewAvailability.jsx");
const ViewMeetingRooms = require("./ViewMeetingRooms/ViewMeetingRooms.jsx");
const ViewProfiles = require("./ViewProfiles.jsx");

/* *** Manager tools *** */
const AddInterviewer = require("./AddInterviewer/AddInterviewer.jsx");
const YourStaffsMeetings = require("./YourStaffsMeetings.jsx");
const ViewInterviewers = require("./ViewInterviewers.jsx");
const AddProfilesToInterviewers = require("./AddProfilesToInterviewers/InterviewerList.jsx");

/* *** Interviewer tools *** */
const ManageMyTimeslots = require("./ManageMyTimeslots.jsx");
const ManageMaxInterviewsPerWeek = require("./ManageMaxInterviewsPerWeek.jsx");
const ViewMyInvitedMeetings = require("./ViewMyInvitedMeetings.jsx");

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginForm: true, // defaults to 'true' so that the login component is rendered in the render() function
      loginAttempts: 3, // prevent brute force attacks
      loginFail: false,
      userCredentials: {
        email: "",
        password: ""
      },
      user: "", // used in login-api.jsx
      loggedInUserName: "",
      loggedInUserId: "",
      currentPage: "Login"
    };
    this.login = this.login.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.logout = this.logout.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    if (response.status === 204) throw 204;

    return response;
  }

  // api_server/controllers/people.js  --> updateMyOwnPassword
  changePassword(password){
    console.log("we here ");
    let userInfo = window.localStorage.getItem('login');
    userInfo = JSON.parse(userInfo);
    userInfo.userCredentials.password = password;
    console.log(userInfo);
    const basicString = this.state.userCredentials.email + ':' + this.state.userCredentials.password;
		fetch(`${process.env.API_URL}/updateOwnPassword`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(basicString)
            },
            body:JSON.stringify({
              newPassword:password
            })
		})
			.then(response => this.handleHTTPErrors(response))
			.then(response => response.json())
			.then(result => {
                this.login({ email: this.state.email,
                    password: password,
                    username: this.state.username});

			})
			.catch(error => {
				console.log(error);
			});
	}
  setCurrentPage(pageToReturn) {
    //console.log(" * [Main.jsx] pageToReturn : " + pageToReturn);
    this.setState({
      currentComponent: pageToReturn
    });
  }

  //Manages login. Calls server if response is good set login form to not be rendered
  login(userCredentials) {
    const basicString = userCredentials.email + ":" + userCredentials.password;
    fetch(`${process.env.API_URL}/login`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(basicString)
      }
    })
      .then(response => {
        /**** No more login attempts, throw an error ****/
        if (this.state.loginAttempts === 0) throw "locked out";

        /**** OK response, credentials accepted ****/
        if (response.status === 200) {
          //this.setState({
          //userCredentials: userCredentials,
          //loginForm: false,
          //loginFail: false
          //});
          return response;
        } else {
          /**** Credentials are wrong ****/
          this.setState(state => {
            return {
              loginFail: true,
              loginAttempts: state.loginAttempts - 1
            };
          });
        }
      })
      .then(result => result.json())
      .then(result => {
        let userInfo = {
          userCredentials: userCredentials,
          loginForm: false,
          loginFail: false,
          user: result,
          email: userCredentials.email,
          password: userCredentials.password
        };
        this.setState({
          userCredentials: userCredentials,
          loginForm: false,
          loginFail: false,
          user: result,
          email: userCredentials.email,
          password: userCredentials.password
        });
        window.localStorage.setItem("login", JSON.stringify(userInfo));
        window.scrollTo(0, 0); // teleports the user to the top of the page
      })
      .catch(error => {
        console.log(error);
      });
  }
  logout() {
    window.localStorage.removeItem("login");
    this.setState({
      userCredentials: "",
      loginForm: true,
      loginFail: false,
      user: "",
      email: "",
      password: "",
      currentComponent:""
    });
  }

  /****************************************************************************/
  /***  There are currently two return statements in render(); the first    ***/

  /***  is for when the user IS NOT logged in, and the second is for        ***/
  /***  when the user IS logged in.                                         ***/
  /****************************************************************************/
  render() {
    //  if 'loginForm is true' AKA the user IS NOT logged in...
    //  only return the Login component
    if (this.state.loginForm) {
      return (
        <div>
          <center>
            <Login
              loginCallback={this.login}
              loginFail={this.state.loginFail}
              loginAttempts={this.state.loginAttempts}
            />
          </center>
        </div>
      );
    }
    //  if 'loginForm is false' AKA the user IS logged in...
    //  return the NavigationBar component and the current
    //  page (right now, it is TestPage.jsx)  */
    else {
      let pageToReturn;

      /***************************************************************/
      /***  This switch statement determines what component        ***/

      /***  to render in the right (as in 'not left') column.      ***/
      /***  (the left column contains the NavigationBar component) ***/
      /***************************************************************/
      switch (this.state.currentComponent) {
        /* *** Administrator tools *** */
        case "AddUser":
          pageToReturn = (
            <AddUser
              userCredentials={this.state.userCredentials}
              user={this.state.user}
            />
          );
          break;
        case "EditUser":
          pageToReturn = (
            <EditUser
              userCredentials={this.state.userCredentials}
              user={this.state.user}
            />
          );
          break;

        /* *** Hiring Team Member tools *** */
        case "ScheduleaMeeting":
          pageToReturn = (
            <ScheduleaMeeting userCredentials={this.state.userCredentials} />
          );
          break;
        case "ViewCandidates":
          pageToReturn = (
            <ViewCandidates
              user={this.state.user}
              userCredentials={this.state.userCredentials}
            />
          );
          break;
        case "ViewScheduledInterviews":
          pageToReturn = (
          <ViewScheduledInterviews 
            user={this.state.user}
            userCredentials={this.state.userCredentials}
          />
            );
          break;
        case "ViewTimeslots":
          pageToReturn = (
            <ViewTimeslots
              userCredentials={this.state.userCredentials}
              People_id={this.state.user.people_id}
            />
          );
          break;
        case "ViewAvailability":
          pageToReturn = (
          <ViewAvailability 
            userCredentials={this.state.userCredentials}
            People_id={this.state.user.people_id}
          />
            );
          break;
        case "ViewMeetingRooms":
          pageToReturn = (
            <ViewMeetingRooms userCredentials={this.state.userCredentials} />
          );
          break;
        case "ViewProfiles":
          pageToReturn = (
            <ViewProfiles userCredentials={this.state.userCredentials} />
          );
          break;

        /* *** Manager tools *** */
        case "YourStaff'sMeetings":
          pageToReturn = (
            <YourStaffsMeetings
              userCredentials={this.state.userCredentials}
            />
          );
          break;
        case "ViewInterviewers":
          pageToReturn = (
            <ViewInterviewers userCredentials={this.state.userCredentials} />
          );
          break;
        case "AddProfilesToInterviewers":
          pageToReturn = (
            <AddProfilesToInterviewers
              userCredentials={this.state.userCredentials}
              user={this.state.user}
            />
          );
          break;

        /* *** Interviewer tools *** */
        case "AddInterviewer":
          pageToReturn = (
            <AddInterviewer
              userCredentials={this.state.userCredentials}
              user={this.state.user}
            />
          );
          break;
        case "ManageMyTimeslots":
          pageToReturn = (
            <ManageMyTimeslots
              userCredentials={this.state.userCredentials}
              user={this.state.user}
            />
          );
          break;
        case "ManageMaxInterviewsPerWeek":
          pageToReturn = (
            <ManageMaxInterviewsPerWeek
              userCredentials={this.state.userCredentials}
              user={this.state.user}
            />
          );
          break;
        case "ViewMyInvitedMeetings":
          pageToReturn = (
            <ViewMyInvitedMeetings
              userCredentials={this.state.userCredentials}
            />
          );
          break;
        case "ChangePassword":
          pageToReturn = (
            <ChangePassword user={this.state.user} userCredentials={this.state.userCredentials} 
            changePasswordCallBack={this.changePassword}/>
          );
          break;

        /* *** Nothing selected; default to the landing page *** */
        default:
          pageToReturn = (
            <TestPage
              userCredentials={this.state.userCredentials}
              user={this.state.user}
            />
          );
      }

      //<div style={{backgroundColor: "#8f8"}}>
      return (
        <div>
          <div className="row mt-1">
            <div className="col-3">
              <NavigationBar
                user={this.state.user}
                setCurrentPageCallback={this.setCurrentPage}
                logout={this.logout}
                currentComponent={this.state.currentComponent}
              />
            </div>
            <div className="col-9">
              {/* <TestPage userEmail={this.state.userCredentials.email}/> */}
              {pageToReturn}
            </div>
          </div>
        </div>
      );
    }
  }
}

module.exports = Main;

//userCredentials={this.state.userCredentials}
