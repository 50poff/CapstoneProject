/*
TODO: 
Determine duration of meeting.
Form duration determine how many interview slots the candidate free for
From the candidates interview slots determine what interviewers/leaders are able to attend what slot
The time slots with at least one interviewer and one interview leaders is a valid time slot

HTM can select one of these time slots 
Once time slot is selected HTM can choose at least one interviewer and one interview leader for the meeting 
The HTM needs to determine what day the meeting will be scheduled for using the day of the week to determin options 
If book interview button is pressed capture the time slot start time + day of the week  and the interviewers ID 

If duration changes create new timeslots and reload page 


*/
const React = require("react");
class PickMeetingTime extends React.Component {
  constructor(props) {
    super(props);
    //default is 1.5 hours
    let duration = 3;
    this.makeMeetingSlots = this.makeMeetingSlots.bind(this);
    this.determineInterviewersAvailabile = this.determineInterviewersAvailabile.bind(
      this
    );
    this.changeDuration = this.changeDuration.bind(this);
    this.changeStartTime = this.changeStartTime.bind(this);
    this.changeInterviewer = this.changeInterviewer.bind(this);
    this.changeLeader = this.changeLeader.bind(this);
    this.changeDay = this.changeDay.bind(this);
    this.determineDays = this.determineDays.bind(this);
    this.confirm = this.confirm.bind(this);

    let meetingSlots = this.makeMeetingSlots(
      duration,
      this.props.chosenCandidate.time
    );
    meetingSlots = this.determineInterviewersAvailabile(
      this.props.interviewAvailable,
      meetingSlots,
      duration
    );

    let possibleDays = [new Date()];
    let startTime = {
      interviewLeaders: ["Non Available"],
      interviewers: ["Non Available"]
    };
    let leader = 0;
    let interviewer = 0;
    if (meetingSlots.length > 0) {
      startTime = meetingSlots[0];
      leader = startTime.interviewLeaders[0];
      interviewer = startTime.interviewers[0];
      possibleDays = this.determineDays(meetingSlots[0].week_day);
    }

    this.state = {
      chosenCandidate: this.props.chosenCandidate,
      interviewList: this.props.interviewList,
      interviewAvailable: this.props.interviewAvailable,
      chosenProfile: this.props.chosenProfile,
      duration: duration,
      meetingSlots: meetingSlots,
      startTime: startTime,
      leader: leader,
      interviewer: interviewer,
      meetingDays: possibleDays,
      chosenDay: possibleDays[0],
      durationOptions: [
        "30 min",
        "1 hour",
        " 1.5 hour",
        "2 hours",
        "2.5 hours",
        "3 hours"
      ],
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
  //Split into two arrays one for interviewLeaders the other for interviewers
  //for each interviewerLeaders check if they can fill the timeslot
  //reduce availabilty to only those interview leaders can fill
  //track which interviewLeaders are able to fill what time slot
  //for each interviewer reduce the availabilty to only interviewers can fill
  //track what interview leaders are able to fill what time slot
  //return array with new timeslots that can be interviewed

  determineInterviewersAvailabile(
    interviewers,
    candidateAvailability,
    duration
  ) {
    let possibleTimeSlots = [];
    let interviewLeaders = [];
    let interviewerList = [];
    //divide interviewer and interview leaders
    interviewers.forEach(person => {
      if (person.role === "Interview Leader") {
        interviewLeaders.push(person);
      } else if (person.role === "Interviewer") {
        interviewerList.push(person);
      }
    });
    //iterate over all timeslots available
    for (let posTime = 0; posTime < candidateAvailability.length; posTime++) {
      let weekDay = candidateAvailability[posTime].week_day;
      let startTime = candidateAvailability[posTime].start_time;

      candidateAvailability[posTime].interviewLeaders = [];
      candidateAvailability[posTime].interviewers = [];

      interviewLeaders.forEach(person => {
        let timeSlots = person.time;
        for (let i = 0; i <= timeSlots.length - duration; i++) {
          let personStart = timeSlots[i].start_time;
          let personWeekDay = timeSlots[i].week_day;

          let personEnd = timeSlots[i].end_time;
          let slot = 0;
          //matched with leaders with candidate availabilty
          if (personStart === startTime && personWeekDay === weekDay) {
            slot = 1;
            for (let j = i + 1; j < i + duration; j++) {
              if (
                personWeekDay === timeSlots[j].week_day &&
                personEnd === timeSlots[j].start_time
              ) {
                slot++;
                personEnd = timeSlots[j].end_time;
              } else {
                break;
              }
            }
          }
          if (slot === duration) {
            candidateAvailability[posTime].interviewLeaders.push({
              people_id: person.people_id,
              name: person.name,
              email:person.email
            });
          }
        }
      });
      interviewerList.forEach(person => {
        let timeSlots = person.time;
        for (let i = 0; i <= timeSlots.length - duration; i++) {
          let personStart = timeSlots[i].start_time;
          let personWeekDay = timeSlots[i].week_day;

          let personEnd = timeSlots[i].end_time;
          let slot = 0;
          //matched with interviewers with candidate availabilty
          if (personStart === startTime && personWeekDay === weekDay) {
            slot = 1;
            for (let j = i + 1; j < i + duration; j++) {
              if (
                personWeekDay === timeSlots[j].week_day &&
                personEnd === timeSlots[j].start_time
              ) {
                slot++;
                personEnd = timeSlots[j].end_time;
              } else {
                break;
              }
            }
          }
          if (slot === duration) {
            candidateAvailability[posTime].interviewers.push({
              people_id: person.people_id,
              name: person.name,
              email:person.email
            });
          }
        }
      });
    }
    //only add timeslots that have interview leaders and interviewers
    candidateAvailability.forEach(timeSlot => {
      if (
        timeSlot.interviewers.length > 0 &&
        timeSlot.interviewLeaders.length > 0
      ) {
        possibleTimeSlots.push(timeSlot);
      }
    });
    return possibleTimeSlots;
  }
  //loop through candidate availabilty to make meeking time
  //array of possible meetings
  //duration determines how many 30min timeslots to add to possible meetings
  //Return an array of possible meetings
  makeMeetingSlots(duration, candidateAvailability) {
    //console.log(candidateAvailability)
   let  durationOptions=   [
      "30 min",
      "1 hour",
      " 1.5 hour",
      "2 hours",
      "2.5 hours",
      "3 hours"
    ];
    let possibleInterviews = [];
    let endTime = "";
    let weekDay = "";
    let slotCount = 0;
    for (let i = 0; i <= candidateAvailability.length - duration; i++) {
      endTime = candidateAvailability[i].timeslot_end_time;
      weekDay = candidateAvailability[i].timeslot_week_day;
      slotCount = 1;
      for (let j = i + 1; j < i + duration; j++) {
        if (
          weekDay === candidateAvailability[j].timeslot_week_day &&
          endTime === candidateAvailability[j].timeslot_start_time
        ) {
          slotCount++;
          endTime = candidateAvailability[j].timeslot_end_time;
        } else {
          break;
        }
      }
      if (slotCount === duration) {
        let slot = {
          start_time: candidateAvailability[i].timeslot_start_time,
          end_time: candidateAvailability[i + duration - 1].timeslot_end_time,
          week_day: weekDay,
          duration: durationOptions[duration-1]
        };
        possibleInterviews.push(slot);
      }
    }
    // console.log(possibleInterviews);
    return possibleInterviews;
  }
  //get current week
  //get next 8 days for the same weekday
  determineDays(weekday) {
    let weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let chosenDay = 0;
    for (let i = 0; i < weekDays.length; i++) {
      if (weekday === weekDays[i]) {
        chosenDay = i;
        break;
      }
    }
    let today = new Date();
    let currentDay = today.getDay();
    let differnce = 0;
    //Determine the next date the weekDay will occure
    //if it has already passed go to next occurnce of the week day
    if (currentDay > chosenDay) {
      //console.log("currentDay:"+currentDay);
      //console.log("chosenDay:"+chosenDay);

      let offset = 6 - currentDay;
      differnce = offset + chosenDay + 1;
      // console.log("offset:"+offset);
      // console.log("difference:"+differnce);
    } else {
      differnce = chosenDay - currentDay;
    }
    let date = today.getDate();
    date = date + differnce;
    let month = today.getMonth();
    let year = today.getFullYear();
    let nextEightMeetingDays = [];
    for (let i = 0; i < 8; i++) {
      nextEightMeetingDays.push(new Date(year, month, date));
      date = date + 7;
    }
    return nextEightMeetingDays;
  }
  changeDuration(event) {
    //determine duration that was selected
    let value = event.target.value;
    let durationOptions = this.state.durationOptions;
    let duration = 1;
    for (let i = 0; i < durationOptions.length; i++) {
      if (value === durationOptions[i]) {
        duration = i + 1;
        break;
      }
    }
    let meetingSlots = this.makeMeetingSlots(
      duration,
      this.state.chosenCandidate.time
    );
    let possibleInterviews = this.determineInterviewersAvailabile(
      this.state.interviewAvailable,
      meetingSlots,
      duration
    );

    //if no meetings set startTime to null
    let possibleDays = [new Date()];
    let startTime = {
      interviewLeaders: ["Non available"],
      interviewers: ["Non available"]
    };
    let leader = 0;
    let interviewer = 0;
    if (possibleInterviews.length > 0) {
      startTime = possibleInterviews[0];
      leader = startTime.interviewLeaders[0];
      interviewer = startTime.interviewers[0];
      possibleDays = this.determineDays(possibleInterviews[0].week_day);
    }
    duration = duration -1;
    this.setState({
      meetingSlots: possibleInterviews,
      duration: duration,
      startTime: startTime,
      leader: leader,
      interviewer: interviewer,
      meetingDays: possibleDays,
      chosenDay: possibleDays[0]
    });
  }
  changeStartTime(event) {
    let pos = event.target.value;
    let startTime = this.state.meetingSlots[pos];
    let possibleDays = this.determineDays(startTime.week_day);
    let leader = startTime.interviewLeaders[0];
    let interviewer =startTime.interviewers[0];
    this.setState({
      startTime: startTime,
      meetingDays: possibleDays,
      chosenDay: possibleDays[0],
      leader:leader,
      interviewer:interviewer
    });
  }
  changeInterviewer(event) {
    let interviewers = this.state.startTime.interviewers;
    let pos = event.target.value;
    let person = interviewers[pos];
    this.setState({
      interviewer: person
    });
  }
  changeLeader(event) {
    let interviewLeaders = this.state.startTime.interviewLeaders;
    let pos = event.target.value;
    let person = interviewLeaders[pos];
    this.setState({
      leader: person
    });
  }
  changeDay(event) {
    let chosenDay = this.state.meetingDays[event.target.value];
    this.setState({
      chosenDay:chosenDay
    });
  }
  confirm(){
    
    let bundle ={
      day:this.state.chosenDay,
      leader:this.state.leader,
      interviewer:this.state.interviewer,
      startTime:this.state.startTime
    };
    this.props.timeSlotCallback(bundle);
  }
  render() {
    let selectStartTime = (
      <li className="list-group-item">
        <div className="row">
          <div className="col-sm-4">Candidate is not available for this duration</div></div>
      </li>
    );
    let selectDay = <div className="row" />;
    let selectLeader = (
      <li className="list-group-item">
        <div className="row">
        <div className="col-sm-4">
          No interviewers are available for this duration at the same time as
          the candidate
          </div>
        </div>
      </li>
    );
    let selectInterviewer = <div className="row" />;
    let button = <div></div>;
    //if there is meeting slots available
    if (this.state.meetingSlots.length > 0) {
      button =( <button 
        type="button"
        onClick={this.confirm}
        className="btn btn-primary"
      >
        Book at this time with these people 
      </button>);
      selectStartTime = (
        <li className="list-group-item">
          <div className="row">
            <div className="col-sm-1">Start time:</div>
            <div className="col-sm-4">
              <form>
                <select
                  name="start_time"
                  className="custom-select"
                  defaultValue={this.state.meetingSlots[0]}
                  onChange={this.changeStartTime}
                >
                  {this.state.meetingSlots.map((slot, index) => (
                    <option key={index} value={index}>
                      {slot.week_day} {slot.start_time}
                    </option>
                  ))}
                </select>
              </form>
            </div>
          </div>
        </li>
      );
      selectDay = (
        <li className="list-group-item">
          <div className="row">
            <div className="col-sm-1">Pick a day:</div>
            <div className="col-sm-4">
              <form>
                <select
                  name="start_time"
                  className="custom-select"
                  defaultValue={this.state.meetingDays[0]}
                  onChange={this.changeDay}
                >
                  {this.state.meetingDays.map((day, index) => (
                    <option key={index} value={index}>
                      {this.state.months[day.getMonth()]}
                      {", "}
                      {day.getDate()}
                      {", "}
                      {day.getFullYear()}
                    </option>
                  ))}
                </select>
              </form>
            </div>
          </div>
        </li>
      );

      selectLeader = (
        <li className="list-group-item">
          <div className="row">
            <div className="col-sm-1">Choose an Interview Leader:</div>
            <div className="col-sm-4">
              <form>
                <select
                  name="Interview Leader"
                  className="custom-select"
                  defaultValue={this.state.meetingSlots[0]}
                  onChange={this.changeLeader}
                >
                  {this.state.startTime.interviewLeaders.map(
                    (person, index) => (
                      <option key={index} value={index}>
                        {person.name}
                      </option>
                    )
                  )}
                </select>
              </form>
            </div>
          </div>
        </li>
      );
      selectInterviewer = (
        <li className="list-group-item">
          <div className="row">
            <div className="col-sm-1">Choose an Interviewer:</div>
            <div className="col-sm-4">
              <form>
                <select
                  name="Interviewer"
                  className="custom-select"
                  defaultValue={this.state.meetingSlots[0]}
                  onChange={this.changeInterviewer}
                >
                  {this.state.startTime.interviewers.map((person, index) => (
                    <option key={index} value={index}>
                      {person.name}
                    </option>
                  ))}
                </select>
              </form>
            </div>
          </div>
        </li>
      );
    }

    return (
      <div>
        <div className="card">
          <div className="card-header" />
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
                     {button}
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
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-sm-1">Duration:</div>
                  <div className="col-sm-4">
                    <form>
                      <select
                        name="duration"
                        className="custom-select"
                        defaultValue={this.state.durationOptions[2]}
                        onChange={this.changeDuration}
                      >
                        {this.state.durationOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </form>
                  </div>
                </div>
              </li>
              {selectStartTime}
              {selectDay}
              {selectLeader}
              {selectInterviewer}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PickMeetingTime;
