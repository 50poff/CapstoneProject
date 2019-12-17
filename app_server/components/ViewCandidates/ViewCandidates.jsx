/*********************************/
/**** Hiring Team Member Tool ****/
/*********************************/
// Parent component of TimeslotCalendar, Candidate, Profile

const React = require("react");
const Candidate = require("./Candidate.jsx");
const Profile = require("./ProfileToAddToCandidate.jsx");
//const TimeslotCalendar = require("./TimeslotCalendar.jsx");
const Timeslot = require("./Timeslot.jsx");
const ViewTimeslots = require("../ViewTimeslots.jsx");

class ViewCandidates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],

      // When the user is viewing info on a candidate already in the Dai Hire database...
      chosenCandidateIndex: 0,
      chosenCandidateFirstName: "",
      chosenCandidateLastName: "",
      chosenCandidateEmail: "",
      chosenCandidateProfiles: [],

      // ... and this is the information about who created that candidate.
      chosenCandidateCreatedByFirstName: "",
      chosenCandidateCreatedByLastName: "",
      chosenCandidateCreatedbyEmail: "",

      // When the user is adding a NEW candidate to Dai Hire, these state variables will be altered and then submitted via POST request
      candidateToAddCreatorId: this.props.user.people_id,
      candidateToAddFirstName: "",
      candidateToAddLastName: "",
      candidateToAddEmail: "",
      candidateTimeslotsToAdd: [],

      // I made two separate sets here because I was having issues with Set's has() function in the child component (It couldn't search for numeric values such as Ids, but it worked with strings)
      // The first set (the one for names) will be used in the child component for comparisons
      candidateToAddProfiles: new Set(), // Holds Ids, not profile_names
      // The second Set (the one for Ids) will be used in the POST request to make coding easier
      candidateToAddProfileIds: new Set(),

      // List of profiles from the database
      //profiles: new Set(),
      profiles: [],

      // all timeslots
      allTimeslots: [],

      // These state variables handle what view is presented to the user
      viewSingleCandidate: false,
      viewAddNewCandidate: false
    };
    //this.loadSingleCandidate = this.loadSingleCandidate.bind(this);
    this.handleViewSingleCandidate = this.handleViewSingleCandidate.bind(this);
    this.handleGoBackButton = this.handleGoBackButton.bind(this);
    this.handleAddNewCanddidateView = this.handleAddNewCanddidateView.bind(
      this
    );
    this.handleAddNewCandidateToDatabase = this.handleAddNewCandidateToDatabase.bind(
      this
    );
    this.handleText = this.handleText.bind(this);
    this.getAllProfilesFromDB = this.getAllProfilesFromDB.bind(this);
    this.alterCandidateToAddProfiles = this.alterCandidateToAddProfiles.bind(
      this
    );

    // handling for when a timeslot in the add new candidate view is pressed
    this.addOneTimeslotToArray = this.addOneTimeslotToArray.bind(this);
    this.deleteOneTimeslotFromArray = this.deleteOneTimeslotFromArray.bind(
      this
    );
    this.loadAllTimeslotsFromDB = this.loadAllTimeslotsFromDB.bind(this);

    //this.setStateVariableCandidateTimeslots = this.setStateVariableCandidateTimeslots.bind(this);
  }

  loadAllTimeslotsFromDB() {
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
        //console.log(" * all timeslots:");
        //console.log(result);
        this.setState({
          allTimeslots: result
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // In the 'add new candidate' view, the user clicks a timeslot to add it to that candidate's timeslots to be added (state array `candidateTimeslotsToAdd`)
  addOneTimeslotToArray(event) {
    event.preventDefault();
    // The event.target.value is intially an array (back in Timeslot.jsx), but when it arrive here, it becomes a string.
    // We have to re-arrayify it using split()
    let ArrayFromEventTargetValue = event.target.value.split(",");
    //console.log(ArrayFromEventTargetValue);

    // Get the values from the array we just made, put them into arrays
    let weekDayToAdd = ArrayFromEventTargetValue[2];
    let startTimeToAdd = ArrayFromEventTargetValue[1];
    let endTimeToAdd = ArrayFromEventTargetValue[0];

    // Create an object holding those 3 variables
    let entryToAdd = {
      timeslot_week_day: weekDayToAdd,
      timeslot_start_time: startTimeToAdd,
      timeslot_end_time: endTimeToAdd
    };

    let temporaryArray = this.state.candidateTimeslotsToAdd;
    temporaryArray.push(entryToAdd);
    this.setState({
      candidateTimeslotsToAdd: temporaryArray
    });
  }

  // In the 'add new candidate' view, the user clicks a timeslot to add it to that candidate's timeslots to be added (state array `candidateTimeslotsToAdd`)
  deleteOneTimeslotFromArray(event) {
    event.preventDefault();
    let ArrayFromEventTargetValue = event.target.value.split(",");
    //console.log(ArrayFromEventTargetValue);

    // Get the values from the array we just made, put them into arrays
    let weekDayToDelete = ArrayFromEventTargetValue[2];
    let startTimeToDelete = ArrayFromEventTargetValue[1];
    let endTimeToDelete = ArrayFromEventTargetValue[0];

    // Create an object holding those 3 variables
    let entryToDelete = {
      timeslot_week_day: weekDayToDelete,
      timeslot_start_time: startTimeToDelete,
      timeslot_end_time: endTimeToDelete
    };

    let temporaryArray = this.state.candidateTimeslotsToAdd;
    let temporaryArrayWithoutDeletedTimeslot = [];
    for (let i = 0; i < temporaryArray.length; i++) {
      if (
        !(
          temporaryArray[i].timeslot_start_time ==
            entryToDelete.timeslot_start_time &&
          temporaryArray[i].timeslot_week_day == entryToDelete.timeslot_week_day
        )
      ) {
        temporaryArrayWithoutDeletedTimeslot.push(temporaryArray[i]);
      }
    }
    this.setState({
      candidateTimeslotsToAdd: temporaryArrayWithoutDeletedTimeslot
    });
  }

  // part of determining what profiles are gonna be added
  alterCandidateToAddProfiles(event) {
    event.preventDefault();

    let profileName = event.target.value;
    let profileId = event.target.id;

    let temporarySet = this.state.candidateToAddProfiles;
    if (this.state.candidateToAddProfiles.has(profileName)) {
      temporarySet.delete(profileName);
      this.state.candidateToAddProfileIds.delete(profileId); // ID Set
    } else {
      temporarySet.add(profileName);
      this.state.candidateToAddProfileIds.add(profileId); // ID Set
    }
    this.setState({
      candidateToAddProfiles: temporarySet
    });
  }

  // Fetch to get the profiles from the database
  getAllProfilesFromDB(event) {
    event.preventDefault();
    const basicString =
      this.props.userCredentials.email +
      ":" +
      this.props.userCredentials.password;
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
        //console.log(" * [ViewCandidates.jsx] Success my brother, got all profiles");
        //console.log(result);
        this.setState({
          profiles: result
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // handler for when there's some sort of HTTP error I guess
  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }

  // Handler for when the text in the text boxes on the 'add new candidate' view is altered
  handleText(event) {
    switch (event.target.id) {
      case "firstName":
        this.setState({ candidateToAddFirstName: event.target.value });
        break;
      case "lastName":
        this.setState({ candidateToAddLastName: event.target.value });
        break;
      case "email":
        this.setState({ candidateToAddEmail: event.target.value });
        break;
      default:
        console.log("Uh oh, you shouldn't see this console log...");
    }
  }

  // Handler for when the user clicks "Add New Candidate" (this is NOT for actualy adding them to the database, it just brings them to the view where they type in information about the candidate. THERE they can click the finalize button to actually add them to the database, calling function `handleAddNewCandidateToDatabase()`)
  handleAddNewCanddidateView(event) {
    event.preventDefault();
    this.getAllProfilesFromDB(event);
    this.setState({
      viewAddNewCandidate: true
    });
  }

  // Handler for when the user finalizes the adding of a new candidate
  handleAddNewCandidateToDatabase(event) {
    event.preventDefault();

    // creating an array from the state Set containing profiles
    let tempArray = Array.from(this.state.candidateToAddProfileIds);

    let timeSlots = this.state.candidateTimeslotsToAdd;

    const basicString =
      this.props.userCredentials.email +
      ":" +
      this.props.userCredentials.password;

    // testing
    console.log("candidate timeslots to add");
    console.log(this.state.candidateTimeslotsToAdd);

    fetch(`${process.env.API_URL}/addCandidate`, {
      // [candidates.js][addNewCandidate]
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      },
      body: JSON.stringify({
        created_by: this.state.candidateToAddCreatorId,
        first_name: this.state.candidateToAddFirstName,
        last_name: this.state.candidateToAddLastName,
        email: this.state.candidateToAddEmail,
        profiles: tempArray,
        timeSlots: timeSlots
      })
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        this.setState({
          viewAddNewCandidate: false,
          candidateToAddFirstName: "",
          candidateToAddLastName: "",
          candidateToAddProfileIds: new Set(),
          candidateToAddEmail: "",
          candidateTimeslotsToAdd: []
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  // When the user is adding a new candidate, or viewing a candidate in the DB, they can click 'go back' buttons to return to the default view (view all candidates)
  handleGoBackButton(event) {
    event.preventDefault();
    this.setState({
      viewSingleCandidate: false,
      viewAddNewCandidate: false,
      candidateTimeslotsToAdd: []
    });
    window.scrollTo(0, 0); // teleport the user to the top of the page
  }

  // Handling for what happens when the user just wants to view one candidate
  handleViewSingleCandidate(event) {
    event.preventDefault();

    // value value value
    let candIndex = event.target.value;
    let id = this.state.candidates[candIndex].candidate_id;

    const basicString =
    this.props.userCredentials.email +
    ":" +
    this.props.userCredentials.password;

  //fetch information on the candidate
  fetch(
    `${process.env.API_URL}/candidates/time/${
      id
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
      this.setState({
        chosenCandidateFirstName: this.state.candidates[candIndex].first_name,
        chosenCandidateLastName: this.state.candidates[candIndex].last_name,
        chosenCandidateEmail: this.state.candidates[candIndex].email,
        chosenCandidateProfiles: this.state.candidates[candIndex].profiles.split(
          ","
        ),

        chosenCandidateCreatedByFirstName: this.state.candidates[candIndex]
          .cb_first_name,
        chosenCandidateCreatedByLastName: this.state.candidates[candIndex]
          .cb_last_name,
        chosenCandidateCreatedbyEmail: this.state.candidates[candIndex].cb_email,
        candidateAvailability:result,
        viewSingleCandidate: true
    });
  }).catch(err => {
    if(err === 204){
      alert("No availability set for interviewers with this profile. Contact the interviewers below for to set their availability");
    }
    else{
    console.log(error);}
  });
  }

  // This function is automatically called when this component is rendered by main
  componentDidMount() {
    const basicString =
      this.props.userCredentials.email +
      ":" +
      this.props.userCredentials.password;
    this.loadAllTimeslotsFromDB();
    fetch(`${process.env.API_URL}/candidates`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(basicString)
      }
    })
      .then(result => result.json())
      .then(result => {
        this.setState({
          candidates: result
        });
        //console.log("Candidates state variable");
        //console.log(this.state.candidates);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let pageContents = <div />;

    //let arrayOfProfiles = this.state.candidates.profiles.split(",");
    //console.log("Array of profiles");
    //console.log(arrayOfProfiles);

    /***********************************/
    /****** Viewing ONE Candidate ******/
    /***********************************/
    if (this.state.viewSingleCandidate) {
      let chosenCandidateFullName =
        this.state.chosenCandidateFirstName +
        " " +
        this.state.chosenCandidateLastName;
      let chosenCandidateCreatorFullName =
        this.state.chosenCandidateCreatedByFirstName +
        " " +
        this.state.chosenCandidateCreatedByLastName;
      pageContents = (
        <div>
          <div className="row">
            <div className="col-sm-6">
              <br />
              <h2>
                <strong>{chosenCandidateFullName}</strong>
              </h2>
              <strong>{this.state.chosenCandidateEmail}</strong>
              <br />
              <br />
              <strong>Profiles:</strong>
              <br />
              <ul>
                {this.state.chosenCandidateProfiles.map((profile, index) => (
                  <li className="row" key={index}>
                    {profile}
                  </li>
                ))}
              </ul>
              <strong>Creator:</strong>
              <br />
              {chosenCandidateFullName} was inserted into Dai Hire by the
              administrator{" "}
              <strong>
                <i>{chosenCandidateCreatorFullName}</i>
              </strong>
              , whose company email is{" "}
              <strong>
                <i>{this.state.chosenCandidateCreatedbyEmail}</i>
              </strong>
              <br />
              <br />
              <div className="col-sm-6">
                <button
                  onClick={this.handleGoBackButton}
                  className="btn btn-danger btn-block"
                  value="Go back"
                >
                  Go back
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <ViewTimeslots userCredentials={this.props.userCredentials}
            PersonAvailability={this.state.candidateAvailability}/>
          </div>
        </div>
      );
    } else if (this.state.viewAddNewCandidate) {
      let profileListStyle = {
        borderRadius: "25px",
        background: "rgba(0, 0, 0, 0.5)",
        backgroundColor: "#229ef7",
        padding: "20px"
      }
    /************************************/
    /****** Adding a NEW Candidate ******/
    /************************************/
      let selectTimeslots = (
        <div className="col-sm-12">
          <div style={profileListStyle}>
            <div className="row">
              <div className="col-sm-2">
                <b>Monday</b>
              </div>
              <div className="col-sm-2">
                <b>Tuesday</b>
              </div>
              <div className="col-sm-2">
                <b>Wednesday</b>
              </div>
              <div className="col-sm-2">
                <b>Thursday</b>
              </div>
              <div className="col-sm-2">
                <b>Friday</b>
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
                  addOneTimeslotCallback={this.addOneTimeslotToArray}
                  deleteOneTimeslotCallback={this.deleteOneTimeslotFromArray}
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
                  addOneTimeslotCallback={this.addOneTimeslotToArray}
                  deleteOneTimeslotCallback={this.deleteOneTimeslotFromArray}
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
                  addOneTimeslotCallback={this.addOneTimeslotToArray}
                  deleteOneTimeslotCallback={this.deleteOneTimeslotFromArray}
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
                  addOneTimeslotCallback={this.addOneTimeslotToArray}
                  deleteOneTimeslotCallback={this.deleteOneTimeslotFromArray}
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
                  addOneTimeslotCallback={this.addOneTimeslotToArray}
                  deleteOneTimeslotCallback={this.deleteOneTimeslotFromArray}
                />
              </div>
            ))}
          </div>
          <br />
        </div>
      );
      pageContents = (
        <div>
          <br />
          <h3>
            Add new Candidate{" "}
            <i>
              {this.state.candidateToAddFirstName}{" "}
              {this.state.candidateToAddLastName}
            </i>
          </h3>
          Please review the information before adding the candidate to Dai Hire.
          <br />
          <br />
          <div className="col-sm-11">
            <form onSubmit={this.handleAddNewCandidateToDatabase}>
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
                  onChange={this.handleText}
                />
              </div>

              {/* ********************************************************************* */}
              {/* A map function of the profiles we can add or not add to the candidate */}
              {/* ********************************************************************* */}
              <div className="row">
                <strong>Please apply at least one profile</strong>
                <br />
                <br />
              </div>
              <div className="row" style={profileListStyle}>
                {this.state.profiles.map((profile, index) => (
                  <Profile
                    profilesToAddSet={this.state.candidateToAddProfiles}
                    profileName={profile.profile_name}
                    profileId={profile.profile_id}
                    key={profile.profile_id}
                    alterProfilesToAddCallback={
                      this.alterCandidateToAddProfiles
                    }
                  />
                ))}
              </div>
              <br/>
              {/* ************************************************************************** */}
              {/* A map function with a calendar of the timeslots the candidate is available */}
              {/* ************************************************************************** */}
              <div className="row">
                Please select the 30-minute timeslots this candidate is available for.
                {/* <TimeslotCalendar addOneTimeslotCallback={this.addOneTimeslotToArray} deleteOneTimeslotCallback={this.deleteOneTimeslotFromArray} userCredentials={this.props.userCredentials} candidateTimeslotsToAdd={this.state.candidateTimeslotsToAdd}/> */}
                {selectTimeslots}
                <br />
                <br />
              </div>

              {/* *************************************************************** */}
              {/* 'Go back' and 'Add candidate to Dai Hire' buttons go below here */}
              {/* *************************************************************** */}
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
                    <input
                      type="Submit"
                      className="btn btn-lg btn-warning btn-block"
                      defaultValue="Add candidate to Dai Hire"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    } else {

    /********************************************************************/
    /****** (default) viewing ALL Candidates currently in Dai Hire ******/
    /********************************************************************/
      pageContents = (
        <div>
          <div className="row">
            <div className="col-sm-4">
              <button
                className="btn btn-warning btn-block btn-lg"
                value="Add New Candidate"
                onClick={this.handleAddNewCanddidateView}
              >
                <strong>Add New Candidate</strong>
              </button>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            {this.state.candidates.map((candidate, index) => (
              <Candidate
                value={index}
                key={index}
                index={index}
                id={candidate.candidate_id}
                firstName={candidate.first_name}
                lastName={candidate.last_name}
                email={candidate.email}
                singleCandidateCallback={this.handleViewSingleCandidate}
              />
            ))}
          </div>
        </div>
      );
    }

    // Return statement
    return (
      <div>
        <h2>View Candidates</h2>
        View all candidates in Dai Hire, or add a new candidate.
        {pageContents}
      </div>
    );
  }
}

module.exports = ViewCandidates;
