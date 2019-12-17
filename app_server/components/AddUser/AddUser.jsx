/**************************************/
/***** Administrator/Manager Tool *****/
/**************************************/
// Administrators can add users as 'Hiring Team Members' or 'Managers'
// Managers can add users as 'Interviewers' or 'Interview Leaders'

const React = require("react");
const SingleUser = require("./AddUser_SingleUser.jsx");
class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      chosenEmployeeFirstName: "",
      chosenEmployeeLastName: "",
      chosenEmployeeEmail: "",
      chosenEmployeeLocation: "",
      chosenEmployeePassword: "",
      chosenEmployeePasswordMatch: "",
      showSingleEmployee: false,
      chosenRolesToAdd: new Set() // A Set is like an Array but it can only have unique values
    };
    this.loadSingleEmployee = this.loadSingleEmployee.bind(this);
    this.addEmployeeToDB = this.addEmployeeToDB.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.addEmployeeErrorChecking = this.addEmployeeErrorChecking.bind(this);
    this.goBackButton = this.goBackButton.bind(this);
    this.loadEmptyEmployee = this.loadEmptyEmployee.bind(this);
  } // ends constructor

  // When the user is adding a new user, they have the option to go back to the default view (view all employees from csv)
  goBackButton(event) {
    event.preventDefault();
    this.setState({
      showSingleEmployee: false,
      chosenRolesToAdd: new Set() // incase the user had already selected one or more roles on the `add new user` view
    });
  }

  handleCheckboxChange(event) {
    let label = event.target.value;
    if (this.state.chosenRolesToAdd.has(label)) {
      //'has' is for sets, 'includes' is for arrays
      this.state.chosenRolesToAdd.delete(label);
    } else {
      this.state.chosenRolesToAdd.add(label); // This is for sets
      //this.chosenRolesToAdd.push(label); // This is for arrays
    }
    console.log(" * chosenRolesToAdd");
    console.log(this.state.chosenRolesToAdd);
  }

  // Updates the values in textboxes based on the id passed in
  handleText(event) {
    switch (event.target.id) {
      case "firstName":
        this.setState({ chosenEmployeeFirstName: event.target.value });
        break;
      case "lastName":
        this.setState({ chosenEmployeeLastName: event.target.value });
        break;
      case "email":
        this.setState({ chosenEmployeeEmail: event.target.value });
        break;
      case "location":
        this.setState({ chosenEmployeeLocation: event.target.value });
        break;
      case "password":
        this.setState({ chosenEmployeePassword: event.target.value });
        break;
      case "password2":
        this.setState({ chosenEmployeePasswordMatch: event.target.value });
        break;
      default:
        console.log("Uh oh, you shouldn't see this console log...");
    }
  }

  // Checks to ensure the set of roles to add isn't empty
  // (email handling is done in the form) (empty box handling is done in the form also)
  // TODO: Add checking to ensure passwords are strong (?)
  addEmployeeErrorChecking() {
    if (this.state.chosenRolesToAdd.size == 0) {
      alert(" You must select at least one role!");
      return false;
    } else {
      //console.log(" * Looks good mate");
      return true;
    }
  }

  // Adds the chosen employee to Dai Hire's Database
  addEmployeeToDB(event) {
    event.preventDefault(); // Prevents the function from moving the user to the login page
    if (!this.addEmployeeErrorChecking()) {
      console.log(" Some kinda error");
      return;
    }

    if (
      this.state.chosenEmployeePassword !=
      this.state.chosenEmployeePasswordMatch
    ) {
      alert("The two password fields do not match!");
      return;
    }

    const basicString =
      this.props.userCredentials.email +
      ":" +
      this.props.userCredentials.password;
    let ArrayOfRoles = Array.from(this.state.chosenRolesToAdd);
  
    // perform a POST request to add the new user to the db
    // the code for this is in loadCSV.js (addNewEmployee)
    //fetch(`https://localhost:80/api/v1/user`, {
    fetch(`${process.env.API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      },
      body: JSON.stringify({
        first_name: this.state.chosenEmployeeFirstName,
        last_name: this.state.chosenEmployeeLastName,
        email: this.state.chosenEmployeeEmail,
        p_password: this.state.chosenEmployeePassword,
        p_location: this.state.chosenEmployeeLocation,
        role_name: ArrayOfRoles
      })
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        console.log("success my brother");
        this.setState({ showSingleEmployee: false }); // Done adding this user; show all users from CSV again
      })
      .catch(error => {
        console.log(error);
      });
  }

  // This function is responsible for viewing the details of a single employee
  loadSingleEmployee(event) {
    event.preventDefault();
   // console.log(event.target.value);
    let currentFirstName = this.state.employees[event.target.value].first_name;
    let currentLastName = this.state.employees[event.target.value].last_name;
    let currentEmail = this.state.employees[event.target.value].email;
    let currentLocation = this.state.employees[event.target.value].location;
    this.setState({
      //chosenEmployee: [currentFirstName, currentLastName, currentEmail],
      chosenEmployeeFirstName: currentFirstName,
      chosenEmployeeLastName: currentLastName,
      chosenEmployeeEmail: currentEmail,
      chosenEmployeeLocation: currentLocation,
      showSingleEmployee: true
    });
    window.scrollTo(0, 0); // teleports the user to the top of the page
  }
  loadEmptyEmployee() {
    this.setState({
      //chosenEmployee: [currentFirstName, currentLastName, currentEmail],
      chosenEmployeeFirstName: "",
      chosenEmployeeLastName: "",
      chosenEmployeeEmail: "",
      chosenEmployeeLocation: "",
      showSingleEmployee: true
    });
    window.scrollTo(0, 0); // teleports the user to the top of the page
  }
  componentDidMount() {
    //console.log(" * [AddUser.jsx] reached componentWillMount()");
    this.setState({
      showSingleEmployee: false
    });
  }
  componentWillUnmount() {
   // console.log(" * [AddUser.jsx] reached componentWillUnmount() ");
  }

  // HTTP GET Request to retrieve the list of employees from the CSV file
  componentWillMount() {
    const basicString =
      this.props.userCredentials.email +
      ":" +
      this.props.userCredentials.password;
    fetch(`${process.env.API_URL}/user`, {
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
          employees: result
        });
       // console.log("  * this.state.employees");
        //console.log(this.state.employees);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }

  /*********************************/
  /*** R E N D E R   M E T H O D ***/
  /*********************************/
  render() {
    let whiteroundedbg = {
      backgroundColor: "#fff",
      borderRadius: "15px"
    }

    let pageContents = <div />; // changes whether the user is viewing all employees or just one

    // Will contain sentences letting the user know what roles they're allowed to apply to new users
    let adminNotice = <div />;
    let managerNotice = <div />;

    // Will contain checkboxes with those roles
    let rolesAdminCanAdd = <div />;
    let rolesManagerCanAdd = <div />;
    // If the user is an Administrator, then they can add a new user as a 'Hiring Team Member' or a 'Manager'
    if (this.props.user.role_name.includes("Administrator")) {
      adminNotice = (
        <div>
          As an administrator, you can add new users as{" "}
          <strong>
            <i>hiring team members</i>
          </strong>{" "}
          or{" "}
          <strong>
            <i>managers</i>
          </strong>
          .{" "}
        </div>
      );
      rolesAdminCanAdd = (
        <div>
          <label>
            <input
              onChange={this.handleCheckboxChange}
              type="checkbox"
              className="form-check-input"
              value="Hiring Team Member"
            />{" "}
            Hiring Team Member
          </label>
          <br />
          <label>
            <input
              onChange={this.handleCheckboxChange}
              type="checkbox"
              className="form-check-input"
              value="Manager"
            />{" "}
            Manager
          </label>
        </div>
      );
    }
		    /***************************************************************************/
     	 /***  This IF block is executed if the user is viewing ONE employee      ***/
    	/***************************************************************************/
		if (this.state.showSingleEmployee) {
      let passwordStyle = {"backgroundColor":"#fff"};

      // checks to see if the two passwords don't match
      if (this.state.chosenEmployeePassword != this.state.chosenEmployeePasswordMatch){
        passwordStyle = {"backgroundColor":"#faa"};
      }

			pageContents = (
				<div className="col-sm-8" style={whiteroundedbg}>
          <br/>
					Please review the information before adding the employee to Dai Hire.
					<br/><br/>
					<div className="col-sm-12">
						<form onSubmit={this.addEmployeeToDB}>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-user"/>
									</span>
								</div>
								<input id="firstName" type="text" className="form-control" placeholder="First Name" required="required" value={this.state.chosenEmployeeFirstName} onChange={this.handleText}/>
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-key"/>
									</span>
								</div>
								<input id="lastName" type="text" className="form-control" placeholder="Last Name" required="required" value={this.state.chosenEmployeeLastName} onChange={this.handleText}/>
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-key"/>
									</span>
								</div>
								<input id="email" type="email" className="form-control" placeholder="Email" required="required" value={this.state.chosenEmployeeEmail} onChange={this.handleText}/>
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-key"/>
									</span>
								</div>
								<input id="location" type="text" className="form-control" placeholder="Location" required="required" value={this.state.chosenEmployeeLocation} onChange={this.handleText}/>
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-key"/>
									</span>
								</div>
								<input id="password" style={passwordStyle} type="password" className="form-control" placeholder="Temporary password" required="required" onChange={this.handleText}/>
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-key"/>
									</span>
								</div>
								<input id="password2" style={passwordStyle} type="password" className="form-control" placeholder="Enter password again" required="required" onChange={this.handleText}/>
							</div>
							<strong>Grant this user one or more roles:</strong>
							<div>
								<div className="form-check">
									{rolesAdminCanAdd}
									{rolesManagerCanAdd}
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<button className="btn btn-dark btn-block" onClick={this.goBackButton} value="Go back">Go back</button>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										{/*<button className="btn btn-primary btn-block" value="Submit">Add employee to Dai Hire</button>*/}
										<input type="Submit" className="btn btn-warning btn-block" defaultValue="Add Employee to Dai Hire"/>
									</div>
								</div>
							</div>
						</form>
					</div>
          <br/>
				</div>
			);	
		} else{
      /****************************************************************************/
      /***  This ELSE block is executed if the user is viewing ALL employees    ***/
      /****************************************************************************/

      let addCustomEmployeeButton = (
        <div className="col-sm-6">
          <button className="btn btn-warning btn btn-block" onClick={this.loadEmptyEmployee}>Add Employee not in CSV file</button>
          <br />
        </div>
      )
      pageContents = (
        <div>
          {adminNotice}
          {managerNotice}
          You can also add an employee who is not in the CSV file.
          {addCustomEmployeeButton}
          <h3>Daitan Employees from CSV file</h3>
          Click on their name to add them.
          <br />
          <br />
          <div className="row">

            {this.state.employees.map((employee, index) => (
              <SingleUser
                index={index}
                key={index}
                firstName={employee.first_name}
                lastName={employee.last_name}
                email={employee.email}
                addUserCallback={this.loadSingleEmployee}
              />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div>
        <h2>Add User</h2>
        Add a Daitan employee to Dai Hire from a CSV file.
        <br/>
        {pageContents}
      </div>
    );
  }
}

module.exports = AddUser;