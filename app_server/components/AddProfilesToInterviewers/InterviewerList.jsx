  /* ******************* */
 /* ** Manager Tool *** */
/* ******************* */
// Parent component
// Part of the 'Add Profiles to Interviewers' tool
// Please note: in this file, when I say 'Interviewer', I am referring to both Interviewers AND Interview Leaders

const React = require('react');
const Interviewer = require("./Interviewer.jsx");
const ProfileList = require("./ProfileList.jsx");

class InterviewerList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// Arrays 
			interviewers: [],
			profiles: [],
			interviewerProfiles: new Set(),

			// Boolean determining whether to display one interviewer, or all interviewers
			showSingleInterviewer: false,

			// Information pertaining to a single interviewer being displayed
			interviewerId: 0,
			interviewerFirstName: "",
			interviewerLastName: "",
			interviewerEmail: ""
		}
		// These functions are available when the user is on the default 'view all interviewers' view
		this.viewSingleInterviewer = this.viewSingleInterviewer.bind(this);
		this.getAllProfilesFromDB = this.getAllProfilesFromDB.bind(this);
		this.getAllInterviewersFromDB = this.getAllInterviewersFromDB.bind(this);
		this.getAllProfilesForCurrentInterviewer = this.getAllProfilesForCurrentInterviewer.bind(this);

		// These functions are available when they are on the 'view single interviewer' view
		this.goBackToDefaultView = this.goBackToDefaultView.bind(this);
		this.grantProfileToInterviewer = this.grantProfileToInterviewer.bind(this);
		this.removeProfileFromInterviewer = this.removeProfileFromInterviewer.bind(this);
	};

	// When the user is viewing one interviewer, they can click a 'Go back' button to return to the default view (viewing all interviewers)
	goBackToDefaultView(event){
		event.preventDefault();
		this.setState({
			showSingleInterviewer: false
		})
	}

	// Handling for adding a profile to an interviewer
	grantProfileToInterviewer(event){
		event.preventDefault();
		const basicString = this.props.userCredentials.email + ':' + this.props.userCredentials.password;
		let profileNameToQuery = event.target.value;
		let idToQuery = this.state.interviewerId;
		//console.log("profile_name: " + profileNameToQuery + " / people_id: " + idToQuery);

		// Perform the fetch
		fetch(`${process.env.API_URL}/grantProfile`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(basicString)
			},
			body: JSON.stringify({ // I always forget the JSON.stringify
				"profile_name": profileNameToQuery,
				"people_id": idToQuery
			})
		})
		.then(response => this.handleHTTPErrors(response))
		.then(response => response.json())
		.then(result => {
			// A temporary set which will be the current set of interviewerProfiles, PLUS the new one
			let temporarySet = this.state.interviewerProfiles;
			temporarySet.add(profileNameToQuery);
			this.setState({
				interviewerProfiles: temporarySet
			})
		})
		.catch(error => {
			console.log(error);
		});
	}

	// Handling for removing a profile from an interviewer
	removeProfileFromInterviewer(event){
		event.preventDefault();
		const basicString = this.props.userCredentials.email + ':' + this.props.userCredentials.password;
		let profileNameToQuery = event.target.value;
		let idToQuery = this.state.interviewerId;
		//console.log("profile_name: " + profileNameToQuery + " / people_id: " + idToQuery);

		// Perform the fetch
		fetch(`${process.env.API_URL}/removeProfile`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(basicString)
			},
			body: JSON.stringify({ // I always forget the JSON.stringify
				"profile_name": profileNameToQuery,
				"people_id": idToQuery
			})
		})
		.then(response => this.handleHTTPErrors(response))
		.then(response => response.json())
		.then(result => {
			// A temporary set which will be the current set of interviewerProfiles, MINUS the new one
			let temporarySet = this.state.interviewerProfiles;
			temporarySet.delete(profileNameToQuery);
			this.setState({
				interviewerProfiles: temporarySet
			})
		})
		.catch(error => {
			console.log(error);
		});
	}

	// Handling for when the user wants to see only one interviewer
	viewSingleInterviewer(event){
		event.preventDefault();
		this.getAllProfilesForCurrentInterviewer(event); // remember the this.
	}

	handleHTTPErrors(response) {
		if (!response.ok) throw Error(response.status + ': ' + response.statusText);
		return response;
		};
		
	// Called automatically once the component is rendered by Main
	componentDidMount(){
		const basicString = this.props.userCredentials.email + ':' + this.props.userCredentials.password;
		this.getAllProfilesFromDB(basicString);
		this.getAllInterviewersFromDB(basicString);
	}

	// This is called during componentDidMount() in order to get all the profiles from the database and put them into the state variable array 'profiles'
	getAllProfilesFromDB(basicString){
		fetch(`${process.env.API_URL}/profiles`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(basicString)
			}
		})
		.then(response => this.handleHTTPErrors(response))
		.then(response => response.json())
		.then(result => {
			//console.log(" ALL PROFILES");
			this.setState({
				profiles: result
			});
			//console.log(this.state.profiles);
		})
		.catch(error => {
			console.log(error);
		});
	}

	// This is called during componentDidMount() in order to get all the interviewers/interview leaders from the database and put them into state variable array 'interviewers'
	getAllInterviewersFromDB(basicString){
		fetch(`${process.env.API_URL}/seeInterviewers`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(basicString)
			}
		})
		.then(response => this.handleHTTPErrors(response))
		.then(response => response.json())
		.then(result => {
			this.setState({
				interviewers: result
			});
			//console.log(" ALL INTERVIEWERS");
			//console.log(this.state.interviewers);
		})
		.catch(error => {
			console.log(error);
		});
	}

	// Used in the 'single interviewer' view to determine what profiles the loaded interviewer has
	getAllProfilesForCurrentInterviewer(event){
		event.preventDefault();
		const basicString = this.props.userCredentials.email + ':' + this.props.userCredentials.password;
		let arrayIndexToQuery = event.target.value;
		let databaseIdToQuery = this.state.interviewers[arrayIndexToQuery].people_id; // their people_id is gonna be different from their spot in the array (index)
		//let arrayIndexToQuery = event.target.value;
		//let oldEventTargetValue = idToQuery - 1; // because event.target.value becomes null after the fetch call
		//console.log(" here oldEventTargetValue is : " + oldEventTargetValue);
		console.log("wait please my dude");
		console.log(" * [InterviewerList.jsx] databaseIdToQuery: " + databaseIdToQuery);
		//fetch(`${process.env.API_URL}/oip/${this.state.interviewerId}`, {
		fetch(`${process.env.API_URL}/oip/${databaseIdToQuery}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(basicString)
			}
		})
		.then(response => this.handleHTTPErrors(response))
		.then(response => response.json())
		.then(result => {
			// We need to extract just the profile_names from this object array...
			let interviewerProfilesObjectArray = result;

			// ... into a set variable...
			let interviewerProfilesSet = new Set();
			for (let i = 0; i < interviewerProfilesObjectArray.length; i++){
				interviewerProfilesSet.add(interviewerProfilesObjectArray[i].profile_name);
			}

			this.setState({
				interviewerProfiles: interviewerProfilesSet,
				showSingleInterviewer: true,
				interviewerEmail: this.state.interviewers[arrayIndexToQuery].email,
				interviewerFirstName: this.state.interviewers[arrayIndexToQuery].first_name,
				interviewerLastName: this.state.interviewers[arrayIndexToQuery].last_name,
				interviewerId: this.state.interviewers[arrayIndexToQuery].people_id
			});
			//console.log("wait first: " + this.state.interviewerFirstName + " " + this.state.interviewerLastName + " " + this.state.interviewerEmail + " [" + this.state.interviewerId + "]");
		})
		.catch(error => {
			console.log(error);
		});
	}

	render() {

		// Check to see if the Manager logged in is viewing ONE interviewer or ALL interviewers
		let pageContents = (
			<div></div>
		);
		let goBackButton = (
			<button className="btn btn-dark btn-block btn-lg" value="Go back" onClick={this.goBackToDefaultView}>Go back</button>
		);

		  /***************************//***************************/
		 /*	Viewing ONE Interviewer	*//***************************/
		/***************************//***************************/
		if (this.state.showSingleInterviewer) {
			pageContents = (
				<div>
					<br/>
					
					<div className="row">
						<div className="col-sm-3">
							<h4><strong>{this.state.interviewerFirstName} {this.state.interviewerLastName}</strong></h4>
							<h5>{this.state.interviewerEmail}</h5>
						</div>
						<div className="col-sm-3">
							{goBackButton}
						</div>
					</div>
					<br/>
					<h3>Add or remove profiles:</h3>
					<ProfileList grantProfileCallback={this.grantProfileToInterviewer} removeProfileCallback={this.removeProfileFromInterviewer} interviewerProfiles={this.state.interviewerProfiles} profiles={this.state.profiles}/>
				</div>
			)
		}
		  /***************************************//***************/
		 /*	Viewing ALL Interviewers (default)	*//***************/
		/***************************************//***************/
		else {
			pageContents = (
				<div>
					Users who are "Interview Leaders" will have <strong>(Leader)</strong> next to their name denoting this.
					<br/><br/>
					<div className="row">
						{this.state.interviewers.map((interviewer, index)=>
							<Interviewer posindex={index} key={index}
								firstName={interviewer.first_name} 
								lastName={interviewer.last_name} 
								email={interviewer.email}
								roles={interviewer.role}
								viewInterviewerCallback={this.viewSingleInterviewer}
							/>
						)}
					</div>
				</div>
			)
		}

		return (
      		<div>
				<h2>Add Profiles To Interviewers</h2>
				Add profiles to Interviewers and Interview Leaders in Dai Hire so that they can be better matched with Candidates who have the same profiles.
				<br/>
				{pageContents}
			</div>
    	)
  	};
} 

module.exports = InterviewerList;