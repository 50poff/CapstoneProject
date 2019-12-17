  /***********************************/
 /***** Hiring Team Member Tool *****/
/***********************************/
// Child component of TimeslotCalendar

const React = require("react");

class Timeslot extends React.Component {
  constructor(props) {
    super(props);

    let chosen = false;
    let start_time = this.props.start_time;
    let week_day = this.props.week_day;
    let candidate = this.props.candidateTimeslotsToAdd;

    // checks for matching entries in the interviewer's list of timeslots to see if they have an entry where the starttime and weekday matches
    for (let i = 0; i < candidate.length; i++) {
      if (start_time === candidate[i].timeslot_start_time && week_day === candidate[i].timeslot_week_day) {
        chosen = true;
        break;
      }
    }
    this.state = {
      week_day: week_day,
      start_time: start_time,
      end_time: this.props.end_time,
      position: this.props.position,
      candidateTimeslotsToAdd: candidate,
      allTimeslots: this.props.allTimeslots,
      chosen:chosen
    };
    this.delete = this.delete.bind(this);
    this.add  = this.add.bind(this);
  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }
  delete(event){
    this.props.deleteOneTimeslotCallback(event);
    this.setState({
      chosen:false
    })

  }
  add(event){
    this.props.addOneTimeslotCallback(event);
    this.setState({
      chosen:true
    })
  }
  render() {

    

    // An array that gets passed to TimeslotCalendar, then ViewCandidates as the 'value'
    // The array contains the end time, start time, and weekday of this current timeslot
    let currentTimeslotArray = [
      this.state.end_time,
      this.state.start_time,
      this.state.week_day
    ];
    let chosen = this.state.chosen;
    if (chosen) {
      return (
        <div className="col-sm-2 board" key={this.props.index}>
          <button className="btn btn-block btn-warning btn-sm" value={currentTimeslotArray} onClick={this.delete}>
            {this.props.start_time}
          </button>
        </div>
      );
    } else {
      return (
        <div className="col-sm-2 board" key={this.props.index}>
          <button className="btn btn-block btn-outline-light btn-sm" value={currentTimeslotArray} onClick={this.add}>
          {this.props.start_time}
          </button>
        </div>
      );
    }
  }
}

module.exports = Timeslot;
