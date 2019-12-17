const React = require("react");
class ConfirmMeeting extends React.Component {
  constructor(props) {
    super(props);
    this.makeMeeting = this.makeMeeting.bind(this);
    this.state = {
      userCredentials: this.props.userCredentials,
      success: false,
      interviewer: this.props.interviewer,
      leader: this.props.leader,
      chosenCandidate: this.props.chosenCandidate,
      chosenProfile: this.props.chosenProfile,
      day: this.props.day,
      startTime: this.props.startTime,
      room: this.props.room,
      months: [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
  }
  makeMeeting(event) {
    
    let day = this.state.day;
    let dateTime =
      day.getFullYear() +
      "-" +
      day.getMonth() +
      "-" +
      day.getDate() +
      " " +
      this.state.startTime.start_time;
    let peopleInMeeting = [];
    peopleInMeeting.push(this.state.leader.people_id);
    peopleInMeeting.push(this.state.interviewer.people_id);
    let body = {
      meeting_datetime: dateTime,
      meeting_room_id: this.state.room.meeting_room_id,
      candidate_id: this.state.chosenCandidate.candidate_id,
      profile_id: this.state.chosenCandidate.profile_id[
        this.state.chosenProfile
      ],
      people_id: peopleInMeeting
    };
    const basicString =
      this.state.userCredentials.email +
      ":" +
      this.state.userCredentials.password;

    fetch(`${process.env.API_URL}/meeting`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      },
      body: JSON.stringify(body)
    })
      .then(response => this.handleHTTPErrors(response))
      .then(result => result.json())
      .then(result => {
        this.props.makeNewMeeting({target:{value:"5"}});
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }
  render() {
    let button = (
      <button className="btn btn-primary" value={5} onClick={this.makeMeeting}>
        Book this Meeting
      </button>
    );
    let header = <div> Book a meeting</div>
  
    return (
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-4" />
            <div className="col-sm-4"> {header}</div>
          </div>
        </div>
        <div className="card-body">
        <div className="row">
        <div className="col-sm-4" ></div>
            <div className="col-sm-4" >{button}</div>
        </div>
        <div className="row"></div>
          <ul className="list-group">
            <li className="list-group-item">
              <div className="row">
                <div className="col-sm-1">Name:</div>
                <div className="col-sm-3">
                  {this.state.chosenCandidate.first_name}{" "}
                  {this.state.chosenCandidate.last_name}
                </div>
                <div className="col-sm-4" />
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-sm-1">Email:</div>
                <div className="col-sm-3">
                  {this.state.chosenCandidate.email}
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-sm-1">Profile:</div>
                <div className="col-sm-3">
                  {
                    this.state.chosenCandidate.profile_name[
                      this.state.chosenProfile
                    ]
                  }
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-sm-1">Start Time:</div>
                <div className="col-sm-3">
                  {this.state.startTime.start_time}
                </div>
                <div className="col-sm-1">End Time:</div>
                <div className="col-sm-3">{this.state.startTime.end_time}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-sm-1">Duartion:</div>
                <div className="col-sm-3">{this.state.startTime.duration}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-sm-1">Day:</div>
                <div className="col-sm-3">
                  {this.state.startTime.week_day}
                  {", "}
                  {this.state.day.getDate()}{" "}
                  {this.state.months[this.state.day.getMonth()]}{" "}
                  {this.state.day.getFullYear()}
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-sm-1">Room:</div>

                <div className="col-sm-3">{this.state.room.room_name}</div>
                <div className="col-sm-1">Location:</div>

                <div className="col-sm-3">{this.state.room.room_location}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-sm-1">Interview Leader:</div>
                <div className="col-sm-3">{this.state.leader.name}</div>
                <div className="col-sm-1">Email:</div>
                <div className="col-sm-3">{this.state.leader.email}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-sm-1">Interviewer:</div>
                <div className="col-sm-3">{this.state.interviewer.name}</div>
                <div className="col-sm-1">Email:</div>
                <div className="col-sm-3">{this.state.interviewer.email}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = ConfirmMeeting;
