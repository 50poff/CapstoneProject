/************************/
/***** Manager Tool *****/
/************************/
// Managers can add users as 'Interviewers' or 'Interview Leaders'
// Managers can also add profiles to interviewers

const React = require("react");
const SingleUser = require("./SingleInterviewer.jsx");
const ProfileList = require("./ProfileList.jsx");

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      chosenEmployeeFirstName: "",
      chosenEmployeeLastName: "",
      chosenEmployeeEmail: "",
      chosenEmployeeLocation: "",
      chosenEmployeePassword: "",
      chosenEmployeePasswordMatch: "",
      showSingleEmployee: false,
      chosenRolesToAdd: new Set(),
      profiles: [],
      interviewerProfiles: new Set(),
      interviewerProfileIds: new Set()
    };
    this.handleGoBackButton = this.handleGoBackButton.bind(this);
    this.loadSingleEmployee = this.loadSingleEmployee.bind(this);
    this.addEmployeeToDB = this.addEmployeeToDB.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.addEmployeeErrorChecking = this.addEmployeeErrorChecking.bind(this);
    this.loadEmptyEmployee = this.loadEmptyEmployee.bind(this);
    this.alterCandidateToAddProfiles = this.alterCandidateToAddProfiles.bind(
      this
    );
  } // ends constructor

  alterCandidateToAddProfiles(event) {
    event.preventDefault();

    let profileName = event.target.value;
    let profileId = event.target.id;

    let temporarySet = this.state.interviewerProfiles; // Name set
    if (this.state.interviewerProfiles.has(profileName)) {
      temporarySet.delete(profileName);
      this.state.interviewerProfileIds.delete(profileId); // ID Set
    } else {
      temporarySet.add(profileName);
      this.state.interviewerProfileIds.add(profileId); // ID Set
    }
    this.setState({
      interviewerProfiles: temporarySet
    });
  }

  // When the users changes their mind about adding a new interviewer and clicks "go back"
  handleGoBackButton(event) {
    event.preventDefault();
    this.setState({
      showSingleEmployee: false
    });
    window.scrollTo(0, 0); // teleport the user to the top of the page
  }

  handleCheckboxChange(event) {
    let label = event.target.value;
    if (this.state.chosenRolesToAdd.has(label)) {
      //'has' is for sets, 'includes' is for arrays
      this.state.chosenRolesToAdd.delete(label);
    } else {
      this.state.chosenRolesToAdd.add(label); // This is for sets
      //this.chosenRolesToAdd.push(label); // This is for arrays
    }
  }

  // Copied from InterviewerList.jsx
  // This is called during componentDidMount() in order to get all the profiles from the database and put them into the state variable array 'profiles'
  getAllProfilesFromDB(basicString) {
    fetch(`${process.env.API_URL}/profiles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      }
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        this.setState({
          profiles: result
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Updates the values in textboxes based on the id passed in
  handleText(event) {
    switch (event.target.id) {
      case "firstName":
        this.setState({ chosenEmployeeFirstName: event.target.value });
        break;
      case "lastName":
        this.setState({ chosenEmployeeLastName: event.target.value });
        break;
      case "email":
        this.setState({ chosenEmployeeEmail: event.target.value });
        break;
      case "location":
        this.setState({ chosenEmployeeLocation: event.target.value });
        break;
      case "password":
        this.setState({ chosenEmployeePassword: event.target.value });
        break;
        case "password2":
          this.setState({ chosenEmployeePasswordMatch: event.target.value });
          break;
      default:
        console.log("Uh oh, you shouldn't see this console log...");
    }
  }

  // Checks to ensure the set of roles to add isn't empty
  // (email handling is done in the form) (empty box handling is done in the form also)
  // TODO: Add checking to ensure passwords are strong (?)
  addEmployeeErrorChecking() {
    if (this.state.chosenRolesToAdd.size == 0) {
      alert(" You must select at least one role!");
      return false;
    } else {
      return true;
    }
  }

  // Adds the chosen employee to Dai Hire's Database
  addEmployeeToDB(event) {
    event.preventDefault(); // Prevents the function from moving the user to the login page
    if (!this.addEmployeeErrorChecking()) {
      console.log(" Some kinda error");
      return;
    }
    if (
      this.state.chosenEmployeePassword !=
      this.state.chosenEmployeePasswordMatch
    ) {
      alert("The two password fields do not match!");
      return;
    }


    const basicString =
      this.props.userCredentials.email +
      ":" +
      this.props.userCredentials.password;
    let ArrayOfRoles = Array.from(this.state.chosenRolesToAdd);

    let ArrayOfProfileIds = Array.from(this.state.interviewerProfileIds);

    if(ArrayOfProfileIds.length === 0){
      alert("No profiles selected");
      return;
    }

    // perform a POST request to add the new user to the db
    // the code for this is in loadCSV.js (addNewEmployee)
    //fetch(`https://localhost:80/api/v1/user`, {
    fetch(`${process.env.API_URL}/addInterviewer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      },
      body: JSON.stringify({
        first_name: this.state.chosenEmployeeFirstName,
        last_name: this.state.chosenEmployeeLastName,
        email: this.state.chosenEmployeeEmail,
        p_password: this.state.chosenEmployeePassword,
        p_location: this.state.chosenEmployeeLocation,
        role_name: ArrayOfRoles,
        profile_ids: ArrayOfProfileIds
      })
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        console.log("success my brother");
        this.setState({ showSingleEmployee: false }); // Done adding this user; show all users from CSV again
      })
      .catch(error => {
        console.log(error);
      });
  }

  // This function is responsible for viewing the details of a single employee
  loadSingleEmployee(event) {
    event.preventDefault();
    let currentFirstName = this.state.employees[event.target.value].first_name;
    let currentLastName = this.state.employees[event.target.value].last_name;
    let currentEmail = this.state.employees[event.target.value].email;
   // console.log(currentFirstName + " " + currentLastName + ", " + currentEmail);
    this.setState({
      //chosenEmployee: [currentFirstName, currentLastName, currentEmail],
      chosenEmployeeFirstName: currentFirstName,
      chosenEmployeeLastName: currentLastName,
      chosenEmployeeEmail: currentEmail,
      showSingleEmployee: true
    });
    window.scrollTo(0, 0); // teleports the user to the top of the page
  }
  loadEmptyEmployee() {
    this.setState({
      //chosenEmployee: [currentFirstName, currentLastName, currentEmail],
      chosenEmployeeFirstName: "",
      chosenEmployeeLastName: "",
      chosenEmployeeEmail: "",
      showSingleEmployee: true
    });
    window.scrollTo(0, 0); // teleports the user to the top of the page
  }

  // HTTP GET Request to retrieve the list of employees from the CSV file
  // Also gets list of profiles from the DB
  componentDidMount() {
    const basicString =
      this.props.userCredentials.email +
      ":" +
      this.props.userCredentials.password;
    this.getAllProfilesFromDB(basicString);
    fetch(`${process.env.API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      }
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        this.setState({
          employees: result
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }

  /*********************************/
  /*** R E N D E R   M E T H O D ***/
  /*********************************/
  render() {
    let pageContents = <div />; // changes whether the user is viewing all employees or just one

    // Can add as an interviewer or interview leader
    let rolesManagerCanAdd = (
      <div>
        <label>
          <input
            onChange={this.handleCheckboxChange}
            type="checkbox"
            className="form-check-input"
            value="Interviewer"
          />{" "}
          Interviewer
        </label>
        <br />
        <label>
          <input
            onChange={this.handleCheckboxChange}
            type="checkbox"
            className="form-check-input"
            value="Interview Leader"
          />{" "}
          Interview Leader
        </label>
      </div>
    );

    // Profile List
    let profileList = (
      <div>
        <ProfileList
          alterProfilesToAddCallback={this.alterCandidateToAddProfiles}
          profilesToAddSet={this.state.interviewerProfiles}
          profiles={this.state.profiles}
        />
      </div>
    );

    /***************************************************************************/
    /***  This IF block is executed if the user is viewing ONE employee      ***/
    /***************************************************************************/
    if (this.state.showSingleEmployee) {
      pageContents = (
        <div>
          Please review the information before adding the interviewer to Dai
          Hire.
          <br />
          <br />
          <div className="col-sm-12">
            <form onSubmit={this.addEmployeeToDB}>
              <div className="col-sm-6">
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    id="firstName"
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    required="required"
                    value={this.state.chosenEmployeeFirstName}
                    onChange={this.handleText}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    id="lastName"
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    required="required"
                    value={this.state.chosenEmployeeLastName}
                    onChange={this.handleText}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    required="required"
                    value={this.state.chosenEmployeeEmail}
                    onChange={this.handleText}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    id="location"
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    required="required"
                    onChange={this.handleText}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Temporary password"
                    required="required"
                    onChange={this.handleText}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    id="password2"
                    type="password"
                    className="form-control"
                    placeholder="Temporary password"
                    required="required"
                    onChange={this.handleText}
                  />
                </div>
              </div>

              <strong>Grant this user one or more roles:</strong>
              <div>
                <div className="form-check">{rolesManagerCanAdd}</div>
              </div>
              <strong>Grant this user one or more profiles:</strong>
              <div>{profileList}</div>
              <br />
              <div className="row">
                <div className="col-sm-6">
                  <button
                    className="btn btn-dark btn-block"
                    onClick={this.handleGoBackButton}
                  >
                    Go back
                  </button>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    {/*<button className="btn btn-primary btn-block" value="Submit">Add employee to Dai Hire</button>*/}
                    <input
                      type="Submit"
                      className="btn btn-dark btn-block"
                      defaultValue="Add Employee to Dai Hire"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
    /************************************************************************************************/
    /***  This ELSE block is executed if the user is viewing ALL employees (from the csv file)    ***/
    /************************************************************************************************/
      pageContents = (
        <div>
          Click on their name to add them.
          <br />
          <br />
          <div className="row">
            <div className="col-sm-3">
              <button
                className="btn btn-warning btn-sm btn-block"
                onClick={this.loadEmptyEmployee}
              >
                {" "}
                Add Employee
                <br />
                <br />
              </button>
              <br />
            </div>
            {this.state.employees.map((employee, index) => (
              <SingleUser
                index={index}
                key={index}
                firstName={employee.first_name}
                lastName={employee.last_name}
                email={employee.email}
                addUserCallback={this.loadSingleEmployee}
              />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div>
        <h2>Add Interviewer</h2>
        Add a Daitan employee to Dai Hire from a CSV file as an Interviewer or
        Interview Leader .{pageContents}
      </div>
    );
  }
}

module.exports = AddUser;

/*
							<li className="list-group-item" key={index}>
								<div className="row">
									<div className="col-sm-4">
										<button className="btn btn-primary btn-block" onClick={this.loadSingleEmployee} 
										value={index}><strong>{employee.first_name} {employee.last_name}</strong>
										<br/><i>{employee.email}</i></button>
									</div>
								</div>
							</li>


*/
