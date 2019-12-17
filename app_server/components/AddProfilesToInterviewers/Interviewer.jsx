  /************************/
 /***** Manager Tool *****/
/************************/
// Child component of InterviewList
// This is a single Interviewer of many, all being displayed at once through a map() function, on the 'view all interviewers' view (which is default when the component is rendered by Main)
const React = require("react");

class Interviewer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }

  // This method is called immediately upon the component being rendered by InterviewList
  componentDidMount(){
  }

  render(){
    // checks to see if this interviewer is a leader or not
    let isLeader = "";
    if (this.props.roles.includes("Interview Leader")){
        isLeader = "(Leader)";
    }

    return(
        <div className="col-sm-4 well" key={this.props.index}>
            <button className="btn btn-dark btn-block" onClick={this.props.viewInterviewerCallback} value={this.props.posindex}>
            {this.props.firstName} {this.props.lastName} {isLeader}
            <br/>{this.props.email}</button>

            <br/>
        </div>
    )
  }
}

module.exports = Interviewer;