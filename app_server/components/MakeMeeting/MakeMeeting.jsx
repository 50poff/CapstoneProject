const React = require("react");
const ListCandidates = require("../ListCandidates.jsx");
const PickProfile = require("./PickProfile.jsx");
const PickMeetingTime = require("./pickMeetingTime.jsx");
const PickRoom = require("./PickRoom.jsx");
const ConfirmMeeting = require("./ConfirmMeeting.jsx");
class MakeMeeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCredentials: this.props.userCredentials,
      currentActivity: "candidate",
      interviewers: [],
      chosenCandidate: {},
      chosenProfile: "",
      activitities: [
        "candidate",
        "interviewer",
        "timeslot",
        "room",
        "confirm",
        "success"
      ]
    };
    this.selectCandidate = this.selectCandidate.bind(this);
    this.selectSkill = this.selectSkill.bind(this);
    this.setActivity = this.setActivity.bind(this);
    this.selectProfile = this.selectProfile.bind(this);
    this.selectTimeSlot = this.selectTimeSlot.bind(this);
    this.selectRoom = this.selectRoom.bind(this);
  }
  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    if(response.status === 204) throw 204;
    
    return response;
  }
  selectCandidate(candidate) {
    const basicString =
      this.state.userCredentials.email +
      ":" +
      this.state.userCredentials.password;
    //fetch information on the candidate
    fetch(`${process.env.API_URL}/candidates/${candidate.candidate_id}`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(basicString)
      }
    })
      .then(result => this.handleHTTPErrors(result))
      .then(result => result.json())
      .then(result => {
        let chosenCandidate = result;

        //fetch information on the interviewers
        fetch(`${process.env.API_URL}/interviewers/profile`, {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa(basicString)
          }
        })
          .then(response => this.handleHTTPErrors(response))
          .then(result => result.json())
          .then(result => {
            this.setState({
              interviewers: result,
              currentActivity: this.state.activitities[1],
              chosenCandidate: chosenCandidate,
              chosenProfile: 0,
              userCredentials: this.state.userCredentials
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log("this one");
        console.log(error);
      });
  }

  selectSkill(event) {
    this.setState({
      chosenProfile: event.target.value
    });
  }

  setActivity(event) {
    let pos = event.target.value;
    this.setState({ currentActivity: this.state.activitities[pos] });
  }
  //Passed in the chosen profile and an array of interviewer objects that have that profile
  //GET the time available of the candidate
  //GET the time available of the interviwers
  //Set the activitiy to pick timeslot
  //Store the candidate time available, interviewers time available, interviewers who know that profile and the chosen profile
  selectProfile(value) {
    let interviewList = value.interviewList;
    let interviewIds = [];
    interviewList.forEach(element => {
      interviewIds.push(element.people_id);
    });
    let jsonBody = JSON.stringify({ interviewers: interviewIds });
    let chosenProfile = value.chosenProfile;

    const basicString =
      this.state.userCredentials.email +
      ":" +
      this.state.userCredentials.password;

    //fetch information on the candidate
    fetch(
      `${process.env.API_URL}/candidates/time/${
        this.state.chosenCandidate.candidate_id
      }`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(basicString)
        }
      }
    )
      .then(response => this.handleHTTPErrors(response))
      .then(result => result.json())
      .then(result => {
        let candidate = this.state.chosenCandidate;
        candidate.time = result;
        //fetch information on the candidate
        fetch(`${process.env.API_URL}/interviewers/available`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(basicString)
          },
          body: jsonBody
        })
          .then(response => this.handleHTTPErrors(response))
          .then(result => result.json())
          .then(result => {
            this.setState({
              chosenCandidate: candidate,
              chosenProfile: chosenProfile,
              interviewList: interviewList,
              interviewAvailable: result,
              currentActivity: this.state.activitities[2]
            });
          })
          .catch(err => {
            if(err === 204){
              alert("No availability set for interviewers with this profile. Contact the interviewers below for to set their availability");
            }
            else{
            console.log(error);}
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  //Set the day and start time as well as end time
  //Set the interview leader and the interviewer that will be attending
  //Fetch all the meeting rooms
  //Change activity to choose meeting room
  selectTimeSlot(bundle) {
    this.setState({
      day: bundle.day,
      leader: bundle.leader,
      interviewer: bundle.interviewer,
      startTime: bundle.startTime,
      currentActivity: this.state.activitities[3]
    });
  }
  selectRoom(room) {
    this.setState({
      room: room,
      currentActivity: this.state.activitities[4]
    });
  }
  render() {
    if (this.state.currentActivity == "candidate") {
      return (
        <div>
          <div className="row">
            <div className="col-md-1"> </div>
            <div className="col-md-10">
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  value="0"
                  style={{ width: "20%" }}
                >
                  Select a Candidate
                </div>
              </div>
            </div>
          </div>
          <div className="row" />
          <div className="row">
            <div className="col-md-1" />
          </div>
          <br />
          <ListCandidates
            userCredentials={this.state.userCredentials}
            buttonText={"Select"}
            singleCandidateCallback={this.selectCandidate}
          />
        </div>
      );
    }

    //render skill selection
    else if (this.state.currentActivity == "interviewer") {
      return (
        <div>
          <div className="row">
            <div className="col-md-1"> </div>
            <div className="col-md-10">
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  value="1"
                  style={{ width: "40%" }}
                >
                  Select a Profile
                </div>
              </div>
            </div>
          </div>
          <div className="row" />
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-2">
              {" "}
              <button
                className="btn btn-primary"
                value="0"
                onClick={this.setActivity}
              >
                {" "}
                Change Candidate
              </button>
            </div>
          </div>
          <br />
          <PickProfile
            userCredentials={this.state.userCredentials}
            interviewers={this.state.interviewers}
            chosenCandidate={this.state.chosenCandidate}
            chosenProfile={this.state.chosenProfile}
            profileCallback={this.selectProfile}
          />
        </div>
      );
    } else if (this.state.currentActivity == "timeslot") {
      return (
        <div>
          <div className="row">
            <div className="col-md-1"> </div>
            <div className="col-md-10">
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  value="3"
                  style={{ width: "60%" }}
                >
                  Select a Meeting Time
                </div>
              </div>
            </div>
          </div>
          <div className="row" />
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-2">
              {" "}
              <button
                className="btn btn-primary"
                value="0"
                onClick={this.setActivity}
              >
                {" "}
                Change Candidate
              </button>
            </div>
            <div className="col-md-2">
              {" "}
              <button
                className="btn btn-primary"
                value="1"
                onClick={this.setActivity}
              >
                {" "}
                Change Profile
              </button>
            </div>
          </div>
          <br />
          <PickMeetingTime
            chosenCandidate={this.state.chosenCandidate}
            interviewList={this.state.interviewList}
            interviewAvailable={this.state.interviewAvailable}
            chosenProfile={this.state.chosenProfile}
            timeSlotCallback={this.selectTimeSlot}
          />
        </div>
      );
    } else if (this.state.currentActivity == "room") {
      return (
        <div>
          <div className="row">
            <div className="col-md-1"> </div>
            <div className="col-md-10">
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  value="3"
                  style={{ width: "80%" }}
                >
                  Select a Meeting Room
                </div>
              </div>
            </div>
          </div>
          <div className="row" />
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-2">
              {" "}
              <button
                className="btn btn-primary"
                value="0"
                onClick={this.setActivity}
              >
                {" "}
                Change Candidate
              </button>
            </div>
            <div className="col-md-2">
              {" "}
              <button
                className="btn btn-primary"
                value="1"
                onClick={this.setActivity}
              >
                {" "}
                Change Profile
              </button>
            </div>
            <div className="col-md-2">
              {" "}
              <button
                className="btn btn-primary"
                value="2"
                onClick={this.setActivity}
              >
                {" "}
                Change Time
              </button>
            </div>
          </div>
          <br />
          <PickRoom
            userCredentials={this.state.userCredentials}
            interviewers={this.state.interviewers}
            chosenCandidate={this.state.chosenCandidate}
            chosenProfile={this.state.chosenProfile}
            day={this.state.day}
            startTime={this.state.startTime}
            selectRoomCallback={this.selectRoom}
          />
        </div>
      );
    } else if (this.state.currentActivity == "confirm") {
      return (
        <div>
          <div className="row">
            <div className="col-md-1"> </div>
            <div className="col-md-10">
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  value="3"
                  style={{ width: "100%" }}
                >
                  Confirm Meeting
                </div>
              </div>
            </div>
          </div>
          <div className="row" />
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-2">
              {" "}
              <button
                className="btn btn-primary"
                value="0"
                onClick={this.setActivity}
              >
                {" "}
                Change Candidate
              </button>
            </div>
            <div className="col-md-2">
              {" "}
              <button
                className="btn btn-primary"
                value="1"
                onClick={this.setActivity}
              >
                {" "}
                Change Profile
              </button>
            </div>
            <div className="col-md-2">
              {" "}
              <button
                className="btn btn-primary"
                value="2"
                onClick={this.setActivity}
              >
                {" "}
                Change Time
              </button>
            </div>
            <div className="col-md-2">
              {" "}
              <button
                className="btn btn-primary"
                value="3"
                onClick={this.setActivity}
              >
                {" "}
                Change Meeting Room
              </button>
            </div>
          </div>
          <br />
          <ConfirmMeeting
            userCredentials={this.state.userCredentials}
            interviewer={this.state.interviewer}
            leader={this.state.leader}
            chosenCandidate={this.state.chosenCandidate}
            chosenProfile={this.state.chosenProfile}
            day={this.state.day}
            startTime={this.state.startTime}
            room={this.state.room}
            makeNewMeeting={this.setActivity}
          />
        </div>
      );
    } else if (this.state.currentActivity == "success") {
      return (
        <div>
          <div className="row"></div>
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-2" />
                  <div className="col-sm-8">
                    <h2>Meeting Booked</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3" />
                  <div className="col-sm-8">
                    <button
                      className="btn btn-primary"
                      value="0"
                      onClick={this.setActivity}
                    >
                      Book another meeting
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      );
    }
  }
}

module.exports = MakeMeeting;
