  /***********************************/
 /***** Hiring Team Member Tool *****/
/***********************************/
// Child component

const React = require("react");

class Candidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }

  render(){

    if (this.props.index % 3 == 0){
        return(
            <div className="col-sm-4" key={this.props.index}>
                <button className="btn btn-dark btn-block btn-sm" onClick={this.props.singleCandidateCallback} index={this.props.index} value={this.props.value}>{this.props.firstName} {this.props.lastName}<br/>{this.props.email}</button>
                <br/>
            </div>
        )
    } else {
        return(
            <div className="col-sm-4" key={this.props.index}>
                <button className="btn btn-dark btn-block btn-sm" onClick={this.props.singleCandidateCallback} index={this.props.index} value={this.props.value}>{this.props.firstName} {this.props.lastName}<br/>{this.props.email}</button>
            </div>
        )
    }
  }
}

module.exports = Candidate;