const React = require("react");

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordMatch: ""
    };
    this.changePassword = this.changePassword.bind(this);
    this.handleText = this.handleText.bind(this);
  }
  handleText(event) {
    switch (event.target.id) {
      case "password":
        this.setState({ password: event.target.value });
        break;
      case "password2":
        this.setState({ passwordMatch: event.target.value });
        break;
    }
  }

  changePassword() {
    // check to see if the values entered in the 2 password fields dont match
    if (this.state.password != this.state.passwordMatch){
      return;
    }
    this.props.changePasswordCallBack(this.state.password);
    this.setState({
        password:"",
        passwordMatch:""
    });
    alert("Success! Your password has been updated");
  }

  render() {

    let whiteroundedbg = {
      backgroundColor: "#fff",
      borderRadius: "15px"
    }

    // Handling to see if the password fields match and/or if they have anything in them, and update the css of the textboxes accordingly
    let passwordStyle = {"backgroundColor":"#fff"};
    if (this.state.password != this.state.passwordMatch){
      passwordStyle = {"backgroundColor":"#fbb"};
    } else if (this.state.password !== ""){
      passwordStyle = {"backgroundColor":"#bfb"};
    }

    // handling for the button depending on what is entered in the two password fields
    let submitButton = (<button className="btn btn-dark btn-block disabled">Nothing to submit</button>);
    if (this.state.password != this.state.passwordMatch){
      submitButton = (<button className="btn btn-danger btn-block disabled">The two passwords do not match</button>);
    } else if (this.state.password !== ""){
      submitButton = (<button className="btn btn-success btn-block" onClick={this.changePassword}>Update password</button>);
    }

    return (
      <div className="container">
        <div className="row" style={whiteroundedbg}>
          <div className="col-sm-9">
            <br />
            <div className="please-log-in">
              <h2>Change your password</h2>
              Please make sure to use a strong password!
            </div>
            <div>
              <div className="input-group form-group">
                <input style={passwordStyle} id="password" type="password" className="form-control" placeholder="New password" onChange={this.handleText}/>
              </div>
              <div className="input-group form-group">
                <input style={passwordStyle} id="password2" type="password" className="form-control" placeholder="Enter new password again" onChange={this.handleText}/>
              </div>
              {submitButton}
              <br/>
            </div>
            <div />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ChangePassword;
