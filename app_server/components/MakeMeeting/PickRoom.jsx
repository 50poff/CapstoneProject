const React = require("react");
class PickRoom extends React.Component {
  constructor(props) {
    super(props);
    this.chooseRoom = this.chooseRoom.bind(this);
    this.confirmRoom = this.confirmRoom.bind(this);
    this.state = {
      userCredentials: this.props.userCredentials,
      interviewers: this.props.interviewers,
      chosenCandidate: this.props.chosenCandidate,
      chosenProfile: this.props.chosenProfile,
      day: this.props.day,
      startTime: this.props.startTime,
      meetingRooms: [],
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
  componentDidMount() {
    const basicString =
      this.state.userCredentials.email +
      ":" +
      this.state.userCredentials.password;

    fetch(`${process.env.API_URL}/room`, {
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
          meetingRooms: result,
          room:result[0]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  chooseRoom(event) {
    let pos = event.target.value;
    let room = this.state.meetingRooms[pos];
    this.setState({
      room: room
    });
  }
  confirmRoom() {
      let room = this.state.room;
    this.props.selectRoomCallback(room);
  }
  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }
  render() {
    
    return (
      <div className="card">
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">
              <div className="row">
                <div className="col-sm-1">Name:</div>
                <div className="col-sm-3">
                  {this.state.chosenCandidate.first_name}{" "}
                  {this.state.chosenCandidate.last_name}
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.confirmRoom}
                  >Book Room</button>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-1">Email:</div>
                <div className="col-sm-3">
                  {this.state.chosenCandidate.email}
                </div>
              </div>
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
              <div className="row">
                <div className="col-sm-1">Time</div>
                <div className="col-sm-4">
                  {this.state.startTime.start_time}{" "}
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

                <div className="col-sm-5">
                  <select
                    name="room"
                    className="custom-select"
                    defaultValue={this.state.meetingRooms[0]}
                    onChange={this.chooseRoom}
                  >
                    {this.state.meetingRooms.map((room, index) => (
                      <option key={index} value={index}>
                        {room.room_name}
                        {", "}
                        {room.room_location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = PickRoom;
