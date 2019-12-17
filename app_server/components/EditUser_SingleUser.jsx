/******************************************/
/***** (part of an) Administrator Tool *****/
/********************************************/
// This class is a child class of EditUser.jsx
// It represents a single user that is rendered in the map() function
// of EditUser's third return statement (the 'Else' block)
// I hope I dont run into problems with the filename being
// different than the class name.

const React = require("react");

class SingleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people_id: this.props.people_id,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      roles: this.props.roles,
      activeStatus: this.props.activeStatus
    };
    //this.handleDeactivateButton = this.handleDeactivateButton.bind(this);
    this.attemptDeactivateOwnAccountHandler = this.attemptDeactivateOwnAccountHandler.bind(this);
  }

  attemptDeactivateOwnAccountHandler(event) {
    event.preventDefault();
    alert("You cannot deactivate your own account!");
  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }

  /* handleDeactivateButton(event) {
    event.preventDefault();
    if (this.props.loggedInEmail == this.props.email) {
      // User is attempting to deactivate their own account! Prevent them from doing this
      alert("You cannot deactivate your own account!");
    } else {
      // User is NOT attempting to deactive their own account; let them proceed with deactivation
      this.props.deactivateUserCallback // This is where I was getting issues. It just wouldn't execute the callback function from here for some reason
    }
  } */

  render() {

    // checks to see if the currently logged in user is the user being rendered
    let editButton = (
      <div className="col-sm-2">
        <button className="btn btn-dark btn-block" onClick={this.props.editUserCallback} value={this.props.index}>
          Edit
        </button>
      </div>
    )

    let buttonToUse = (<div></div>);
    let activateButton = (
      <div className="col-sm-2">
        <button className="btn btn-dark btn-block" onClick={this.props.activateUserCallback} value={this.props.index}>
          Activate
        </button>
      </div>
    )
    let deactivateButton = (<div></div>);
    if (this.props.loggedInEmail == this.props.email) {
      // The user being rendered IS the logged in user; ensure that they cannot disable themselves
      deactivateButton = (
        <div className="col-sm-2">
          <button className="btn btn-dark btn-block" onClick={this.attemptDeactivateOwnAccountHandler} value={this.props.index}>
            Deactivate
            </button>
        </div>
      )
    } else {
      // The user being rendered IS NOT the logged in user; allow them to disable the user
      deactivateButton = (
        <div className="col-sm-2">
          <button className="btn btn-dark btn-block" onClick={this.props.deactivateUserCallback} value={this.props.index}>
            Deactivate
            </button>
        </div>
      )
    }
    let deactivedNotice = "";

    let styleToUse = {};

    let activeStyle = {
      borderRadius: "3px",
      borderColor: "black",
      borderWidth: 1,
      background: "rgba(255, 2555, 2555, 0.9)",
      padding: "3px"
    }

    let deactivatedStyle = {
      borderRadius: "3px",
      borderColor: "black",
      borderWidth: 1,
      background: "rgba(255, 2555, 2555, 0.4)",
      padding: "3px"
    }

    // Checks to see if the user is active or not
    if (this.props.activeStatus) {
      // The user IS active
      styleToUse = activeStyle;
      buttonToUse = deactivateButton;
    } else {
      // The user is NOT active (they are DEACTIVATED)
      styleToUse = deactivatedStyle;
      buttonToUse = activateButton;
      deactivedNotice = "(deactivated)";
    }
    return (
      <li className="list-group-item" key={this.props.index} style={styleToUse}>
        <div className="row" >
          <div className="col-sm-12">
            <center>
              <div className="row">
                <div className="col-sm-4">
                  <strong>{this.state.firstName} {this.state.lastName} {deactivedNotice}</strong><br />
                  {this.state.email}
                </div>
                <div className="col-sm-4">
                  <i>{this.state.roles}</i>
                </div>

                  {editButton}
                  {buttonToUse}

              </div>
            </center>
          </div>
          <br /><br />
        </div>
      </li>
    )
  }
}

module.exports = SingleUser;