  /***********************************/
 /***** Hiring Team Member Tool *****/
/***********************************/
// Child component of ViewCandidates

const React = require("react");

class ProfileToAddToCandidate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        profilesToAddSet: this.props.profilesToAddSet
      }
    }

    handleHTTPErrors(response) {
        if (!response.ok) throw Error(response.status + ": " + response.statusText);
        return response;
    }

    render(){
        //let id = this.props.profileId;
        if (this.props.profilesToAddSet.has(this.props.profileName)){ // 'has' is for sets,  'includes' is for arrays
            return(
                <div className="col-sm-4" key={this.props.profileId}>
                    <button className="btn btn-warning btn-block btn-sm" id={this.props.profileId} value={this.props.profileName} onClick={this.props.alterProfilesToAddCallback}>{this.props.profileName}</button>
                    <br/>
                </div>
            )
        } else {
            return(
                <div className="col-sm-4" key={this.props.profileId}>
                    <button className="btn  btn-outline-light btn-block btn-sm" id={this.props.profileId} value={this.props.profileName} onClick={this.props.alterProfilesToAddCallback}>{this.props.profileName}</button>
                    <br/>
                </div>
            )
        }
    }
}

module.exports = ProfileToAddToCandidate;