  /***********************************/
 /***** Hiring Team Member Tool *****/
/***********************************/
// Child component of ViewCandidates
// Parent component of Timeslot

const React = require("react");
const Timeslot = require("./Timeslot.jsx");

class TimeslotCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidateTimeslotsToAdd: this.props.candidateTimeslotsToAdd,
      allTimeslots: []
    };
  }

  componentDidMount() {
    const basicString =
      this.props.userCredentials.email +
      ":" +
      this.props.userCredentials.password;

    // perform a fetch to get ALL timeslots in the DB
    fetch(`${process.env.API_URL}/calendar`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      }
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        console.log(" * [TimeslotCalendar.jsx] all timeslots:");
        console.log(result);
        this.setState({
          allTimeslots: result
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

  render() {

    let timeslotStyle = {
      borderRadius: "25px",
      background: "rgba(0, 0, 0, 0.5)",
      backgroundColor: "#229ef7",
      padding: "20px"
    }

    return (
      <div className="col-sm-12">
        <div style={timeslotStyle}>
          <div className="row">
            <div className="col-sm-2">
              <b>M</b>
            </div>
            <div className="col-sm-2">
              <b>T</b>
            </div>
            <div className="col-sm-2">
              <b>W</b>
            </div>
            <div className="col-sm-2">
              <b>Th</b>
            </div>
            <div className="col-sm-2">
              <b>F</b>
            </div>
          </div>

          {this.state.allTimeslots.map((calendar, index) => (
            <div className="row" key={index} value={calendar.position}>
              <Timeslot
                index={calendar[0].position}
                key={calendar[0].position}
                position={calendar[0].position}
                week_day={calendar[0].week_day}
                start_time={calendar[0].start_time}
                end_time={calendar[0].end_time}

                // Arrays
                allTimeslots={this.state.allTimeslots}
                candidateTimeslotsToAdd={this.state.candidateTimeslotsToAdd}
                
                // Handling for the adding & deleting of timeslots
                addOneTimeslotCallback={this.props.addOneTimeslotCallback}
                deleteOneTimeslotCallback={this.props.deleteOneTimeslotCallback}
              />
              <Timeslot
                index={calendar[1].position}
                key={calendar[1].position}
                position={calendar[1].position}
                week_day={calendar[1].week_day}
                start_time={calendar[1].start_time}
                end_time={calendar[1].end_time}

                // Arrays
                allTimeslots={this.state.allTimeslots}
                candidateTimeslotsToAdd={this.state.candidateTimeslotsToAdd}

                // Handling for the adding & deleting of timeslots
                addOneTimeslotCallback={this.props.addOneTimeslotCallback}
                deleteOneTimeslotCallback={this.props.deleteOneTimeslotCallback}

              />
              <Timeslot
                index={calendar[2].position}
                key={calendar[2].position}
                position={calendar[2].position}
                week_day={calendar[2].week_day}
                start_time={calendar[2].start_time}
                end_time={calendar[2].end_time}

                // Arrays
                allTimeslots={this.state.allTimeslots}
                candidateTimeslotsToAdd={this.state.candidateTimeslotsToAdd}
                                
                // Handling for the adding & deleting of timeslots
                addOneTimeslotCallback={this.props.addOneTimeslotCallback}
                deleteOneTimeslotCallback={this.props.deleteOneTimeslotCallback}
              />
              <Timeslot
                index={calendar[3].position}
                key={calendar[3].position}
                position={calendar[3].position}
                week_day={calendar[3].week_day}
                start_time={calendar[3].start_time}
                end_time={calendar[3].end_time}

                // Arrays
                allTimeslots={this.state.allTimeslots}
                candidateTimeslotsToAdd={this.state.candidateTimeslotsToAdd}
                                
                // Handling for the adding & deleting of timeslots
                addOneTimeslotCallback={this.props.addOneTimeslotCallback}
                deleteOneTimeslotCallback={this.props.deleteOneTimeslotCallback}
              />
              <Timeslot
                index={calendar[4].position}
                key={calendar[4].position}
                position={calendar[4].position}
                week_day={calendar[4].week_day}
                start_time={calendar[4].start_time}
                end_time={calendar[4].end_time}

                // Arrays
                allTimeslots={this.state.allTimeslots}
                candidateTimeslotsToAdd={this.state.candidateTimeslotsToAdd}
                                
                // Handling for the adding & deleting of timeslots
                addOneTimeslotCallback={this.props.addOneTimeslotCallback}
                deleteOneTimeslotCallback={this.props.deleteOneTimeslotCallback}
              />
            </div>
          ))}
        </div>
        <br />
      </div>
    );
  }
}

module.exports = TimeslotCalendar;
