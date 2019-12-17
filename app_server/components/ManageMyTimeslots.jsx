const React = require("react");
const TimeChosen = require("./ManageMyTimeslots_chosen.jsx");

class ManageMyTimeslots extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ArrayTimeSlot: [], // all timeslots
      chosen_people_id: this.props.user.people_id,
      chosen_timeslot_week_day: [],
      chosen_timeslot_start_time: [],
      chose_timeslot_end_time: [],
      chosenAllTimeSlot: [],
      timeSlots: [],

      showSingleDay: false,
      chosenTimeslotToAdd: new Set() // A Set is like an Array but it can only have unique values
    };
    this.addTimeErrorChecking = this.addTimeErrorChecking.bind(this);
    this.loadSingleDate = this.loadSingleDate.bind(this);

    // Used for adding and removing single timeslots from db when their button is clicked by the user
    this.addOneTimeslotToDB = this.addOneTimeslotToDB.bind(this);
    this.deleteOneTimeslotFromDB = this.deleteOneTimeslotFromDB.bind(this);
  }
  componentDidMount() {
    const basicString =
      this.props.userCredentials.email +
      ":" +
      this.props.userCredentials.password;
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
        let user_id = this.props.user.people_id;
        let arrTimeSlot = result;

        fetch(`${process.env.API_URL}/interviewers/time/${user_id}`, {
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
              ArrayTimeSlot: arrTimeSlot,
              timeSlots: result
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

  // Adds a timeslot to the database
  addOneTimeslotToDB(event) {
    event.preventDefault();
    //console.log(" * [ManageMyTimeslots.jsx] adding a timeslot to PeopleAvailability...");

    const basicString =
      this.props.userCredentials.email +
      ":" +
      this.props.userCredentials.password;

    let interviewer_id = this.props.user.people_id;

    // Have to convert to a string then back into an array
    let eventTargetValueString = event.target.value;
    let chosenTimeslot = eventTargetValueString.split(",");

    // testing; should set these to dynamic values eventually
    let weekDayToAdd = chosenTimeslot[2];
    let startTimeToAdd = chosenTimeslot[1];
    let endTimeToAdd = chosenTimeslot[0];

    fetch(`${process.env.API_URL}/addOneTimeslot/${interviewer_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      },
      body: JSON.stringify({
        week_day: weekDayToAdd,
        start_time: startTimeToAdd,
        end_time: endTimeToAdd
      })
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        let temporaryArray = this.state.timeSlots;

        // The entry we are adding must be a JSON object, since the array is an array of JSON objects
        let entryToAdd = {
          weekday: weekDayToAdd,
          start_time: startTimeToAdd,
          end_time: endTimeToAdd
        };
        temporaryArray.push(entryToAdd);
        this.setState({
          timeSlots: temporaryArray
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // TODO: Delete one timeslot from the database, matches a row with the info passed in
  deleteOneTimeslotFromDB(event) {
    event.preventDefault();
    const basicString =
      this.props.userCredentials.email +
      ":" +
      this.props.userCredentials.password;

    // event.target.value gets passed in as a string, so we have to re-arrayify it
    //let eventTargetValueString = event.target.value;
    let chosenTimeslot = event.target.value.split(",");

    // testing; should set these to dynamic values eventually
    let interviewer_id = this.props.user.people_id;
    let weekDayToDelete = chosenTimeslot[2];
    let startTimeToDelete = chosenTimeslot[1];
    let endTimeToDelete = chosenTimeslot[0];

    fetch(`${process.env.API_URL}/deleteOneTimeslot/${interviewer_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      },
      body: JSON.stringify({
        week_day: weekDayToDelete,
        start_time: startTimeToDelete,
        end_time: endTimeToDelete
      })
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        let temporaryArray = this.state.timeSlots;
        let entryToDelete = {
          weekday: weekDayToDelete,
          start_time: startTimeToDelete,
          end_time: endTimeToDelete
        };

        let temporaryArrayWithoutDeletedTimeslot = [];
        for (let i = 0; i < temporaryArray.length; i++) {
          if (
            !(
              temporaryArray[i].start_time == entryToDelete.start_time &&
              temporaryArray[i].weekday == entryToDelete.weekday
            )
          ) {
            temporaryArrayWithoutDeletedTimeslot.push(temporaryArray[i]);
          }
        }

        this.setState({
          timeSlots: temporaryArrayWithoutDeletedTimeslot
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // This function is responsible for viewing the details of a single date
  loadSingleDate(event) {
    event.preventDefault();
    let currentWeekDay = this.state.timeSlots[event.target.value]
      .timeslot_week_day;
    let currentStartTime = this.state.timeSlots[event.target.value]
      .timeslot_start_time;
    let currentEndTime = this.state.timeSlots[event.target.value]
      .timeslot_end_time;
    this.setState({
      chosen_timeslot_week_day: currentWeekDay,
      chosen_timeslot_start_time: currentStartTime,
      chose_timeslot_end_time: currentEndTime,
      showSingleDay: true
    });
  }

  addTimeErrorChecking() {
    if (this.state.chosenTimeToAdd.size === 0) {
      alert(" You must select at least one time slot!");
      return false;
    } else {
      console.log(" * Looks good mate");
      return true;
    }
  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }

  render() {
    return (
      <div>
        <h2>Manage My Timeslots</h2>
        Set what timeslots you are available for throughout a week.
        <br />
        <br />
        <div
          style={{
            borderRadius: "25px",
            background: "rgba(34,158,247,0.5)",
            //backgroundColor: "#229ef7",
            padding: "20px"
          }}
        >
          <div className="row">
            <div className="col-sm-2">
              <b><center>Monday</center></b>
            </div>
            <div className="col-sm-2">
              <b><center>Tuesday</center></b>
            </div>
            <div className="col-sm-2">
              <b><center>Wednesday</center></b>
            </div>
            <div className="col-sm-2">
              <b><center>Thursday</center></b>
            </div>
            <div className="col-sm-2">
              <b><center>Friday</center></b>
            </div>
          </div>

          {this.state.ArrayTimeSlot.map((calendar, index) => (
            <div className="row" key={index} value={calendar.position}>
              <TimeChosen
                index={calendar[0].position}
                key={calendar[0].position}
                position={calendar[0].position}
                week_day={calendar[0].week_day}
                start_time={calendar[0].start_time}
                end_time={calendar[0].end_time}
                timeSlots={this.state.timeSlots}
                ArrayTimeSlot={this.state.ArrayTimeSlot}
                addTimeslotCallback={this.addOneTimeslotToDB}
                deleteTimeslotCallback={this.deleteOneTimeslotFromDB}
              />
              <TimeChosen
                index={calendar[1].position}
                key={calendar[1].position}
                position={calendar[1].position}
                week_day={calendar[1].week_day}
                start_time={calendar[1].start_time}
                end_time={calendar[1].end_time}
                timeSlots={this.state.timeSlots}
                ArrayTimeSlot={this.state.ArrayTimeSlot}
                addTimeslotCallback={this.addOneTimeslotToDB}
                deleteTimeslotCallback={this.deleteOneTimeslotFromDB}
              />
              <TimeChosen
                index={calendar[2].position}
                key={calendar[2].position}
                position={calendar[2].position}
                week_day={calendar[2].week_day}
                start_time={calendar[2].start_time}
                end_time={calendar[2].end_time}
                timeSlots={this.state.timeSlots}
                ArrayTimeSlot={this.state.ArrayTimeSlot}
                addTimeslotCallback={this.addOneTimeslotToDB}
                deleteTimeslotCallback={this.deleteOneTimeslotFromDB}
              />
              <TimeChosen
                index={calendar[3].position}
                key={calendar[3].position}
                position={calendar[3].position}
                week_day={calendar[3].week_day}
                start_time={calendar[3].start_time}
                end_time={calendar[3].end_time}
                timeSlots={this.state.timeSlots}
                ArrayTimeSlot={this.state.ArrayTimeSlot}
                addTimeslotCallback={this.addOneTimeslotToDB}
                deleteTimeslotCallback={this.deleteOneTimeslotFromDB}
              />
              <TimeChosen
                index={calendar[4].position}
                key={calendar[4].position}
                position={calendar[4].position}
                week_day={calendar[4].week_day}
                start_time={calendar[4].start_time}
                end_time={calendar[4].end_time}
                timeSlots={this.state.timeSlots}
                ArrayTimeSlot={this.state.ArrayTimeSlot}
                addTimeslotCallback={this.addOneTimeslotToDB}
                deleteTimeslotCallback={this.deleteOneTimeslotFromDB}
              />
            </div>
          ))}
        </div>
        <br />
      </div>
    );
  }
}

module.exports = ManageMyTimeslots;
