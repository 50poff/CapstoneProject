const React = require("react");

class DisplayTimeSlot extends React.Component {
  constructor(props) {
    super(props);

    let chosen = false;
    let start_time = this.props.start_time;
    let week_day = this.props.week_day;
    let person = this.props.personTimeslotsToAdd;

    // checks for matching entries in the interviewer's list of timeslots to see if they have an entry where the starttime and weekday matches
    for (let i = 0; i < person.length; i++) {
      if (start_time === person[i].start_time && week_day === person[i].weekday) {
        chosen = true;
        break;
      }
    }
    //check if matches a candidate time table
    //candidate time data use timeslot_week_day and timeslot_start_time 
    //Would be fixed if more time
    for (let i = 0; i < person.length; i++) {
      if (start_time === person[i].timeslot_start_time && week_day === person[i].timeslot_week_day) {
        chosen = true;
        break;
      }
    }
    this.state = {
      week_day: week_day,
      start_time: start_time,
      end_time: this.props.end_time,
      position: this.props.position,
      personTimeslotsToAdd: person,
      allTimeslots: this.props.allTimeslots,
      chosen:chosen
    };
  }

 
  render() {

    const timeStyle= {
		borderStyle : "solid",
		marginTop : "5 px",
		borderColor: "white",
		backgroundColor: "#D3D3D3",
	
		"borderWidth" : "1 px"
    }
    const timeStyle2= {
		borderStyle : "solid",
		marginTop : "5 px",
		borderColor: "white",
		backgroundColor: "#90EE90",
	
		"borderWidth" : "1 px"
	}

    // An array that gets passed to TimeslotCalendar, then ViewCandidates as the 'value'
    // The array contains the end time, start time, and weekday of this current timeslot
    let chosen = this.state.chosen;
    if (chosen) {
      return (
        <div className="col-sm-2 board" style={timeStyle2} >
								{this.state.start_time}
								</div>
      );
    } else {
      return (
        <div className="col-sm-2 board" style={timeStyle} >
        {this.state.start_time}
        </div>
      );
    }
  }
}

module.exports = DisplayTimeSlot;
