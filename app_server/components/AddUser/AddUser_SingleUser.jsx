const React = require("react");

class SingleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email
    };
    this.add = this.add.bind(this);
  }
  add(event) {
    this.props.addUserCallback(event);
  }

  render(){
    if (this.props.index % 3 == 0){
        return(
            <div className="col-sm-3" key={this.props.index}>
                <button className="btn btn-block btn-warning btn-sm" onClick={this.props.addUserCallback} value={this.props.index}>{this.props.firstName} {this.props.lastName}
                <br/>{this.props.email}</button>
                <br/>
            </div>

        )
    } else {
        return(
            <div className="col-sm-3" key={this.props.index}>
                <button className="btn btn-block btn-warning btn-sm" onClick={this.props.addUserCallback} 
                    value={this.props.index}>{this.props.firstName} {this.props.lastName}
                    <br/>{this.props.email}</button>
            </div>
        )
    }
  }
}

module.exports = SingleUser;
