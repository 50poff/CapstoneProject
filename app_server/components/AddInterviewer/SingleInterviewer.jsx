  /************************/
 /***** Manager Tool *****/
/************************/
// Child of AddInterviewer.jsx
// Managers can add users as 'Interviewers' or 'Interview Leaders'
// Managers can also add profiles to interviewers

const React = require("react");

class SingleUser extends React.Component {
  constructor(props) {
    super(props);

  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }

  render(){
    if (this.props.index % 3 == 0){
        return(
            <div className="col-sm-3" key={this.props.index}>
                <button className="btn btn-warning btn-sm btn-block" onClick={this.props.addUserCallback} value={this.props.index}>   {this.props.firstName} {this.props.lastName}<br/>{this.props.email}
                </button>
                <br/>
            </div>

        )
    } else {
        return(
            <div className="col-sm-3" key={this.props.index}>
                <button className="btn btn-warning btn-sm btn-block" onClick={this.props.addUserCallback} value={this.props.index}>
                {this.props.firstName} {this.props.lastName}<br/>{this.props.email}
                </button>
            </div>
        )
    }
  }
}

module.exports = SingleUser;