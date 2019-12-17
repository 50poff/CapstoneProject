  /**************************************/
 /***** Administrator/Manager Tool *****/
/**************************************/
// Child component of ProfileList
// This is a single profile that is rendered when viewing a single Interviewer on InterviewerList.jsx

const React = require("react");

class Profile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          interviewerProfiles: this.props.interviewerProfiles, // a set, NOT an array
        }
    }

    handleHTTPErrors(response) {
        if (!response.ok) throw Error(response.status + ": " + response.statusText);
        return response;
    }

    render(){
        //console.log("profiles");
        //console.log(this.state.profiles);
        if (this.state.interviewerProfiles.has(this.props.profileName)){ // 'has' is for sets,  'includes' is for arrays
            // Interviewer DOES have this profile; show option to take remove from them
            return(
                <div className="col-sm-3" key={this.props.index}>
                    <button className="btn btn-block btn-warning btn-sm" value={this.props.profileName} onClick={this.props.removeProfileCallback}>{this.props.profileName}</button>
                    <br/>
                </div>
            )
        } else {
            // Interview does NOT have this profile; show option to grant it to them
            return(
                <div className="col-sm-3" key={this.props.index}>
                    <button className="btn btn-block btn-outline-light btn-sm" value={this.props.profileName} onClick={this.props.grantProfileCallback}>{this.props.profileName}</button>
                    <br/>
                </div>
            )
        }
    }
}

module.exports = Profile;