/* ******************* */
/* ** Manager Tool *** */
/* ******************* */

const React = require("react");
const ViewTimeslots = require("../ViewTimeslots.jsx");

class ListManagersInterviewers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Interviewers: [],
      Interviewer: [],
      InterviewerMeet: [],
      PersonAvailability: [],
      buttonText: this.props.buttonText,
      noInterviewerDetail: true
    };
    this.loadSingleInterviewer = this.loadSingleInterviewer.bind(this);
    this.prettyDate = this.prettyDate.bind(this);
    this.showInterviewers = this.showInterviewers.bind(this);
  }
  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    if (response.status === 204) throw 204;

    return response;
  }
  componentDidMount() {
    const basicString =
      this.props.userCredentials.email +
      ":" +
      this.props.userCredentials.password;
    fetch(`${process.env.API_URL}/getInterviewers`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(basicString)
      }
    })
      .then(result => result.json())
      .then(result => {
        this.setState({
          Interviewers: result
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  loadSingleInterviewer(event) {
    let people_id = parseInt(event.target.value);
    const basicString =
      this.props.userCredentials.email +
      ":" +
      this.props.userCredentials.password;

    fetch(`${process.env.API_URL}/getSingleInterviewerMeet/${people_id}`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(basicString)
      }
    })
      .then(response => this.handleHTTPErrors(response))
      .then(result => result.json())
      .then(result => {
        let InterviewerMeet = result;
        fetch(`${process.env.API_URL}/getSingleInterviewer/${people_id}`, {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa(basicString)
          }
        })
          .then(response => this.handleHTTPErrors(response))
          .then(result => result.json())
          .then(result => {
            let Interviewer = result;
            fetch(`${process.env.API_URL}/interviewers/time/${people_id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + btoa(basicString)
              }
            })
              .then(response => this.handleHTTPErrors(response))
              .then(result => result.json())
              .then(result => {
                this.setState({
                  PersonAvailability: result,
                  InterviewerMeet: InterviewerMeet,
                  Interviewer: Interviewer,
                  noInterviewerDetail: false
                });
              })
              .catch(err => {
                if (err === 204) {
                  alert(
                    "No availability set for interviewers with this profile. Contact the interviewers below for to set their availability"
                  );
                } else {
                  console.log(err);
                }
              });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  prettyDate(meeting_datetime, position) {
    meeting_datetime = meeting_datetime.replace("Z", "");
    meeting_datetime = meeting_datetime.split("T");
    meeting_datetime[1] = meeting_datetime[1].slice(0, -4);
    if (position) {
      return meeting_datetime[0];
    } else {
      return meeting_datetime[1];
    }
  }

  showInterviewers(){

    this.setState({
      PersonAvailability: [],
      InterviewerMeet: [],
      Interviewer: [],
      noInterviewerDetail: true
    });
    
  }

  render() {
    if (this.state.viewInterviewer) {
      return <div>stuff</div>;
    } else if (this.state.noInterviewerDetail) {
      return (
        <div>
          <h2>View Interviewers You Have Added</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <div className="row">
                <div className="col-sm-3">
                  <b>First Name</b>
                </div>
                <div className="col-sm-3">
                  <b>Last Name</b>
                </div>
                <div className="col-sm-3">
                  <b>Email</b>
                </div>
              </div>
            </li>
            {this.state.Interviewers.map((Interviewer, index) => (
              <li className="list-group-item" key={index}>
                <div className="row" key={index} value={Interviewer.people_id}>
                  <div className="col-sm-3">{Interviewer.first_name}</div>
                  <div className="col-sm-3">{Interviewer.last_name}</div>
                  <div className="col-sm-3">{Interviewer.email}</div>
                  <div className="col-sm-1">
                    <button
                      className="btn btn-primary"
                      value={Interviewer.people_id}
                      onClick={this.loadSingleInterviewer}
                    >
                      {this.state.buttonText}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-sm-4">
            <button className="btn btn-block btn btn-dark btn-sm" onClick={this.showInterviewers}>
              Return to the list of Interviewers
            </button>
            </div>
          </div>
          <div>
            <h2>More information about the Interviewer</h2>
            <ul className="list-group">
              <li className="list-group-item">
                <div className="row">
                  <div className="col-sm-2">
                    <b>Name</b>
                  </div>
                  <div className="col-sm-2">
                    <b>Location</b>
                  </div>
                  <div className="col-sm-3">
                    <b>Role</b>
                  </div>
                  <div className="col-sm-2">
                    <b>Max Interviews</b>
                  </div>
                  <div className="col-sm-3">
                    <b>profiles</b>
                  </div>
                </div>
              </li>
              {this.state.Interviewer.map((Interviewer, index) => (
                <li className="list-group-item" key={index}>
                  <div
                    className="row"
                    key={index}
                    value={Interviewer.people_id}
                  >
                    <div className="col-sm-2">{Interviewer.person}</div>
                    <div className="col-sm-2">{Interviewer.p_location}</div>
                    <div className="col-sm-3">{Interviewer.role_name}</div>
                    <div className="col-sm-2">{Interviewer.max_interviews}</div>
                    <div className="col-sm-3">{Interviewer.profiles}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Interviewer's weekly</h2>
            <ViewTimeslots
              userCredentials={this.props.userCredentials}
              //Interviewer = {this.state.Interviewer}
              PersonAvailability={this.state.PersonAvailability}
            />
          </div>
          <div>
            <h2>Meetings the Interviewer is scheduled for</h2>
            <ul className="list-group">
              <li className="list-group-item">
                <div className="row">
                  {/* 12 */}
                  <div className="col-sm-2">
                    <b>Meeting Date</b>
                  </div>
                  <div className="col-sm-2">
                    <b>Meeting Time</b>
                  </div>
                  <div className="col-sm-2">
                    <b>Candidate</b>
                  </div>
                  <div className="col-sm-2">
                    <b>room name</b>
                  </div>
                  <div className="col-sm-2">
                    <b>room location</b>
                  </div>
                  <div className="col-sm-2">
                    <b>Position</b>
                  </div>
                </div>
              </li>
              {this.state.InterviewerMeet.map((Interviewer, index) => (
                <li className="list-group-item" key={index}>
                  <div
                    className="row"
                    key={index}
                    value={Interviewer.meeting_datetime}
                  >
                    <div className="col-sm-2">
                      {this.prettyDate(Interviewer.meeting_datetime, true)}
                    </div>
                    <div className="col-sm-2">
                      {this.prettyDate(Interviewer.meeting_datetime, false)}
                    </div>
                    <div className="col-sm-2">{Interviewer.Candidate}</div>
                    <div className="col-sm-2">{Interviewer.room_name}</div>
                    <div className="col-sm-2">{Interviewer.room_location}</div>
                    <div className="col-sm-2">{Interviewer.profile_name}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  }
}

module.exports = ListManagersInterviewers;
