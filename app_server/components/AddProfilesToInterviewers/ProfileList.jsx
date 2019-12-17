  /* ******************* */
 /* ** Manager Tool *** */
/* ******************* */
// Parent component of Profile
// Child component of InterviewerList
// Part of the 'Add Profiles to Interviewers' tool

const React = require('react');
const Profile = require("./Profile.jsx");

class ProfileList extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            interviewerProfiles: new Set()
        }
        this.grantProfileToInterviewer = this.grantProfileToInterviewer.bind(this);
        this.removeProfileFromInterviewer = this.removeProfileFromInterviewer.bind(this);
    };
    
    // This is a linking function that does the callback to the corresponding function 'grantProfileToInterviewer' in InterviewerList 
    grantProfileToInterviewer(event){
        event.preventDefault();
        this.props.grantProfileCallback(event);
    }

    // This is a linking function that does the callback to the corresponding function 'removeProfileFromInterviewer' in InterviewerList 
    removeProfileFromInterviewer(event){
        event.preventDefault();
        this.props.removeProfileCallback(event);
    }

	render() {
        // The two arrays that get passed in as props, 'profiles' and 'interviewerProfiles' are arrays of objects. 
        // Each object is a key-value pair.
        // For the purposes of this component's child, we need the values only.

        // Create two new empty arrays to hold just the values.
        let profilesArray = []
        //let interviewerProfilesArray = [];

        // Populate those arrays
        for (let i = 0; i < this.props.profiles.length; i++){
            profilesArray.push(this.props.profiles[i].profile_name);
        }
        //for (let i = 0; i < this.props.interviewerProfiles.length; i++){
        //    interviewerProfilesArray.push(this.props.interviewerProfiles[i].profile_name);
        //}

        let profileListStyle = {
            borderRadius: "25px",
            background: "rgba(0, 0, 0, 0.5)",
            backgroundColor: "#229ef7",
            padding: "20px"
        }

        // Make sure the map function maps out the array passed in via props, NOT the state variable
		return (
            <div className="col-sm-11" style={profileListStyle}>
                <div className="row" >
                    {this.props.profiles.map((profile, index)=>
                    <Profile interviewerProfiles={this.props.interviewerProfiles} index={index} key={index} profileName={profile.profile_name} grantProfileCallback={this.grantProfileToInterviewer} removeProfileCallback={this.removeProfileFromInterviewer}/>
                    )}
                </div>
            </div>
        )
    };
} 

module.exports = ProfileList;