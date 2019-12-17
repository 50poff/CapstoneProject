  /******************************/
 /***** Administrator Tool *****/
/******************************/
// TODO: currently, there is a bug where if a user updates their own password, they lose access to everything
// (they got 401 Unauthorized errors) and have to refresh the page and log in again. It's not a big deal but
// it is a little bit annoying for the user. I should fix that if I have time.

const React = require("react");
const SingleUser = require("./EditUser_SingleUser.jsx"); // A single user

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			users: [],
			chosenUserId: "",
      chosenUserFirstName: "",
      chosenUserLastName: "",
      chosenUserOldEmail: "", // This gets passed in the body of the PUT request so that we can still retrieve the user_id if we're changing their email
      chosenUserNewEmail: "",
      chosenUserLocation: "",
      chosenUserNewPassword: "",
      chosenUserNewPasswordMatch: "",
      chosenUserActiveStatus: true,
      showEmployeeToEdit: false
    };
    this.loadSingleUserToEdit = this.loadSingleUserToEdit.bind(this);
    this.handleText = this.handleText.bind(this);
    this.updateUserInfoInDatabase = this.updateUserInfoInDatabase.bind(this);
    this.deactivateSingleUserInDatabase = this.deactivateSingleUserInDatabase.bind(this);
    this.activateSingleUserInDatabase = this.activateSingleUserInDatabase.bind(this);
    this.handleGoBackButton = this.handleGoBackButton.bind(this);
    this.getAllUsersFromDatabase = this.getAllUsersFromDatabase.bind(this);
  } // ends constructor


  handleGoBackButton(event){
    event.preventDefault();
    console.log("going back to view all users");
    this.setState({
      showEmployeeToEdit: false
    })
  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }

    /***********************************************/
   /******* Update single using fetch call  *******/
  /***********************************************/

  // Upon pressing the button "Update User Information" (assuming all necessary fields are filled out), this will make the fetch call to update the info for that user in the database.
  updateUserInfoInDatabase(event) {
    event.preventDefault(); // "Should" prevent the function from moving the user to the login page
    
    // checks to ensure that the user has entered the password exactly the same in both password fields
    if(this.state.chosenUserNewPassword != this.state.chosenUserNewPasswordMatch){
      alert("The two password fields do not match!");
      return;
    }
    
		// Used for instant client-side rendering
		let spotInArray = this.state.chosenUserId;
		let FIRST_NAME = this.state.chosenUserFirstName;
		let LAST_NAME = this.state.chosenUserLastName;
		let NEW_EMAIL = this.state.chosenUserNewEmail;
		let LOCATION = this.state.chosenUserLocation;
    let people_id = this.state.users[spotInArray].people_id;

    const basicString = this.props.userCredentials.email + ":" + this.props.userCredentials.password;
    fetch(`${process.env.API_URL}/people/old_email`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      },
      body: JSON.stringify({
        people_id:people_id,
        first_name: this.state.chosenUserFirstName,
        last_name: this.state.chosenUserLastName,
        new_email: this.state.chosenUserNewEmail,
        old_email: this.state.chosenUserOldEmail,
        new_password: this.state.chosenUserNewPassword,
        //"old_password": this.state.chosenUserOldPassword,
        location: this.state.chosenUserLocation
      })
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
				//console.log("success my brother");
				


				// These next few lines allow for instant re-rending of your changes on the client-side
				// TODO: Make it so that the dynamic client-side rendering actually works like it does when activating/deactivating a user
				let updatedUsersArray = this.state.users;
				//console.log(" spotInArray : " + spotInArray);
				updatedUsersArray[spotInArray].first_name = FIRST_NAME;
				updatedUsersArray[spotInArray].last_name = LAST_NAME;
				updatedUsersArray[spotInArray].email = NEW_EMAIL;
				updatedUsersArray[spotInArray].location = LOCATION;

				//console.log(updatedUsersArray[spotInArray].first_name);
				//console.log(updatedUsersArray[spotInArray].last_name);
				//console.log(updatedUsersArray[spotInArray].email);
				//console.log(updatedUsersArray[spotInArray].location);

        this.setState({ 
          users: updatedUsersArray 
        });

        this.getAllUsersFromDatabase();

        				// Done adding this user; show all users from CSV again
				this.setState({
					showEmployeeToEdit: false
				});

				window.scrollTo(0, 0); // teleports the user to the top of the page
      })
      .catch(error => {
        console.log(error);
      });
  }

  /*****************************************************/
  /******* Activate single user using fetch call  *******/
  /*******************************************************/
  activateSingleUserInDatabase(event) {
		event.preventDefault();
		let spotInArray = event.target.value;
    let emailToActivate = this.state.users[spotInArray].email;
    const basicString = this.props.userCredentials.email + ":" + this.props.userCredentials.password;
    fetch(`${process.env.API_URL}/activate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      },
      body: JSON.stringify({
        email: emailToActivate
      })
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {

        // These next three lines allow for instant re-rending of your changes on the client-side
        let updatedUsersArray = this.state.users;
        updatedUsersArray[spotInArray].is_active = true;
        this.setState({ users: updatedUsersArray });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /*******************************************************/
  /******* Deactivate single user using fetch call  *******/
  /*********************************************************/
  deactivateSingleUserInDatabase(event) {
    console.log(" kill em all");
		event.preventDefault();
		let spotInArray = event.target.value;
    let emailToDeactivate = this.state.users[spotInArray].email;
    const basicString = this.props.userCredentials.email + ":" + this.props.userCredentials.password;
    fetch(`${process.env.API_URL}/deactivate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      },
      body: JSON.stringify({
        email: emailToDeactivate
      })
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {

				// These next three lines allow for instant re-rending of your changes on the client-side
        let updatedUsersArray = this.state.users;
        updatedUsersArray[spotInArray].is_active = false;
        this.setState({ users: updatedUsersArray });
				
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Loads a single user's information from the array of Users that is presented in the default view
  loadSingleUserToEdit(event) {
    event.preventDefault();
    let oldName = this.state.users[event.target.value].first_name + " " + this.state.users[event.target.value].last_name;
    this.setState({
			chosenUserId: event.target.value,
      chosenUserFirstName: this.state.users[event.target.value].first_name,
      chosenUserOldFirstName: this.state.users[event.target.value].first_name,

      chosenUserLastName: this.state.users[event.target.value].last_name,
      chosenUserOldLastName: this.state.users[event.target.value].last_name,

      chosenUserOldEmail: this.state.users[event.target.value].email,
      chosenUserNewEmail: this.state.users[event.target.value].email,
      chosenUserLocation: this.state.users[event.target.value].p_location,
      chosenUserOldLocation: this.state.users[event.target.value].p_location,

      chosenUserActiveStatus: this.state.users[event.target.value].is_active,

      showEmployeeToEdit: true,
      chosenUserOldName: oldName
    });
    window.scrollTo(0, 0); // teleports the user to the top of the page
  }

  // This function is called automatically upon the component being loaded
  // (Don't need to bind it in the constructor)
  // HTTP GET Request to retrieve the list of users from the database
  componentDidMount() {
    this.getAllUsersFromDatabase();
  }

  // fetch get to retrieve all users from the database
  getAllUsersFromDatabase() {
    const basicString = this.props.userCredentials.email + ":" + this.props.userCredentials.password;
    fetch(`${process.env.API_URL}/people`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      }
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        this.setState({
          users: result
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Handles changes to the editable text fields on the view single user view
  handleText(event) {
    switch (event.target.id) {
      case "firstName":
        this.setState({ chosenUserFirstName: event.target.value });
        break;
      case "lastName":
        this.setState({ chosenUserLastName: event.target.value });
        break;
      case "email":
        this.setState({ chosenUserNewEmail: event.target.value });
        break;
      case "location":
        this.setState({ chosenUserLocation: event.target.value });
        break;
      case "password":
        this.setState({ chosenUserNewPassword: event.target.value });
        break;
      case "password2":
        this.setState({ chosenUserNewPasswordMatch: event.target.value });
        break;
      default:
        console.log("How did you get here?");
    }
  }

  render() {
    let pageContents = <div />;

    /***********************************************************************/
    /***  This IF block is executed if the user is editing ONE User      ***/
    /***********************************************************************/
    if (this.state.showEmployeeToEdit) {

      
      // the style this page will use
      let whiteroundedbg = {
        backgroundColor: "#fff",
        borderRadius: "15px"
      }

      // if the user is deactivated; do some different css
      let activeStatusNotification = "";
      if (!this.state.chosenUserActiveStatus) {
        whiteroundedbg = {
          background: "rgba(255, 2555, 2555, 0.4)",
          borderRadius: "15px"
        }
        activeStatusNotification = "(deactivated)"
      }


      let firstNameStyle = {"backgroundColor":"#fff"};
      let lastNameStyle = {"backgroundColor":"#fff"};
      let emailStyle = {"backgroundColor":"#fff"};
      let locationStyle = {"backgroundColor":"#fff"};
      let passwordStyle = {"backgroundColor":"#fff"};

      let redStyle = {"backgroundColor":"#fbb"};
      let greenStyle = {"backgroundColor":"#bfb"};

      /* *** background color handling for the text fields (green if altered, red if empty or invalid) *** */
      // First name
      if (this.state.chosenUserFirstName === ""){ firstNameStyle = redStyle;
      } else if (this.state.chosenUserFirstName != this.state.chosenUserOldFirstName){ firstNameStyle = greenStyle; }

      // Last name
      if (this.state.chosenUserLastName === ""){ lastNameStyle = redStyle;
      } else if (this.state.chosenUserLastName != this.state.chosenUserOldLastName){ lastNameStyle = greenStyle; }

      // Email
      if (this.state.chosenUserNewEmail === ""){ emailStyle = redStyle;
      } else if (this.state.chosenUserNewEmail != this.state.chosenUserOldEmail){ emailStyle = greenStyle; }

      // Location
      if (this.state.chosenUserLocation === ""){ locationStyle = redStyle;
      } else if (this.state.chosenUserLocation != this.state.chosenUserOldLocation){ locationStyle = greenStyle; }

      // Password
      if (this.state.chosenUserNewPassword != this.state.chosenUserNewPasswordMatch){ passwordStyle = redStyle;
      } else if (this.state.chosenUserNewPassword !== ""){ passwordStyle = greenStyle; }

      pageContents = (
        <div className="col-sm-9" style={whiteroundedbg}>
          <h2>Edit {this.state.chosenUserOldName} {activeStatusNotification}</h2>
          <form onSubmit={this.updateUserInfoInDatabase}>
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-user" />
                </span>
              </div>
              <input style={firstNameStyle} id="firstName" type="text" className="form-control" placeholder="First Name" required="required" value={this.state.chosenUserFirstName}
                onChange={this.handleText}
              />
            </div>
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-key" />
                </span>
              </div>
              <input style={lastNameStyle} id="lastName" type="text" className="form-control" placeholder="Last Name" required="required" value={this.state.chosenUserLastName}
                onChange={this.handleText}
              />
            </div>
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-key" />
                </span>
              </div>
              <input style={emailStyle} 
                id="email"
                type="text"
                className="form-control"
                placeholder="Email"
                required="required"
                value={this.state.chosenUserNewEmail}
                onChange={this.handleText}
              />
            </div>
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-key" />
                </span>
              </div>
              <input style={locationStyle} id="location" type="text" className="form-control" placeholder="Location" required="required" value={this.state.chosenUserLocation}
                onChange={this.handleText}
              />
            </div>
            Leave these fields blank to leave the password unchanged.
            <br />
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-key" />
                </span>
              </div>
              <input style={passwordStyle} id="password" type="password" className="form-control" placeholder="New password (optional)" onChange={this.handleText}
              />
            </div>
            {/* "enter your password again" to ensure it matches the first one */}
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-key" />
                </span>
              </div>
              <input style={passwordStyle} id="password2" type="password" className="form-control" placeholder="Enter the new password again" onChange={this.handleText}
              />
            </div>
            <div className="row">
              <div className="col-sm-6">
                <button className="btn btn-dark btn-block" onClick={this.handleGoBackButton}>Go back</button>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <input type="Submit" className="btn btn-dark btn-block" defaultValue="Update User Information"/>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    } else {
    /************************************************************************/
    /***  This ELSE block is executed if the user is viewing ALL users    ***/
    /************************************************************************/
      pageContents = (
        <div>
          <div className="row">
            <div className="col-sm-11">
              <ul className="list-group">
                
                {this.state.users.map((user, index) => (
                  
                    <SingleUser index={index} key={index} firstName={user.first_name} lastName={user.last_name} email={user.email} roles={user.role_names} activeStatus={user.is_active} editUserCallback={this.loadSingleUserToEdit} deactivateUserCallback={this.deactivateSingleUserInDatabase} activateUserCallback={this.activateSingleUserInDatabase} loggedInEmail={this.props.userCredentials.email}/>

                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h2>Edit User</h2>
        Edit or deactivate an employee (user) in Dai Hire. From the Edit menu, you can change their password if you want.
        <br />
        <br />
        {pageContents}
      </div>
    );
  }
}

module.exports = EditUser;
