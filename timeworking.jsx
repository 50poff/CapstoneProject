const React = require('react');

class ManageMyTimeslots extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ArrayTimeSlot: [],
			chosen_people_id: this.props.user.people_id,
			chosen_timeslot_week_day: [],
			chosen_timeslot_start_time: [],
			chose_timeslot_end_time: [],
			chosenAllTimeSlot: [],

			showSingleDay: false,
			chosenTimeslotToAdd: new Set() // A Set is like an Array but it can only have unique values

		}
		this.postAvailability = this.postAvailability.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.addTimeErrorChecking = this.addTimeErrorChecking.bind(this);




	};


	handleCheckboxChange(event) {
		let label = parseInt(event.target.value);
		//console.log(" label: " + label);
		let timeslot = this.state.chosenTimeslotToAdd;
		//console.log(" * chosenTimeslotToAdd");
		//console.log(this.state.chosenTimeslotToAdd);
		if (timeslot.has(label)) { //'has' is for sets, 'includes' is for arrays
			timeslot.delete(label);
		} else {
			timeslot.add(label); // This is for sets

			//this.chosenRolesToAdd.push(label); // This is for arrays
		}
		this.setState({
			chosenTimeslotToAdd: timeslot
		});


		//console.log(" * chosenTimeslotToAdd");
		//console.log(this.state.chosenTimeslotToAdd);

	}

	addTimeErrorChecking() {
		if (this.state.chosenTimeToAdd.size === 0) {
			alert(" You must select at least one time slot!"); return false;
		} else {
			console.log(" * Looks good mate"); return true;
		}
	}

	componentDidMount() {
		const basicString = this.props.userCredentials.email + ':' + this.props.userCredentials.password;
	
	

		fetch(`${process.env.API_URL}calendar`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(basicString)
			}
		})

			.then(response => this.handleHTTPErrors(response))
			.then(response => response.json())
			.then(result => {
				let user_id = this.props.user.people_id;
				let arrTimeSlot = result;
				fetch(`${process.env.API_URL}interviewers/time/${user_id}`, {
					method: "GET",
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Basic ' + btoa(basicString)
					}
				}
				).then(response => this.handleHTTPErrors(response))
					.then(response => response.json())
					.then(result => {
						this.setState({
						
							ArrayTimeSlot: arrTimeSlot,
							//timeSlots: result
							result
						});
						console.log(arrTimeSlot);
						console.log(result);


					})


					.catch(error => {
						console.log(error);
					});



				

			})
			.catch(error => {
				console.log(error);
			});


	};

	postAvailability(event) {
		event.preventDefault();


		let allTimeSlots = this.state.ArrayTimeSlot;
		const basicString = this.props.userCredentials.email + ':' + this.props.userCredentials.password;
		let arrayOfTimePosition = Array.from(this.state.chosenTimeslotToAdd);
		let spot = 0;
		let timeSlots = {
			timeslot_week_day: [],
			timeslot_start_time: [],
			timeslot_end_time: []
		}
		//console.log(arrayOfTimePosition);
		//console.log("^values to match");
		for (let i = 0; i < allTimeSlots.length; i++) {
			allTimeSlots[i].forEach(slot => {
				if (arrayOfTimePosition.includes(slot.position)) {
					//console.log("pushing at pos: "+slot.position);
					timeSlots.timeslot_week_day.push(slot.week_day);
					timeSlots.timeslot_start_time.push(slot.start_time);
					timeSlots.timeslot_end_time.push(slot.end_time);
				}
			});
		}


		//console.log(" * Array of Time");
		//console.log(timeSlots);

		fetch(`${process.env.API_URL}interviewers/createTime`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(basicString)
			},
			body: JSON.stringify(timeSlots)


		})
			.then(response => this.handleHTTPErrors(response))
			.then(response => response.json())
			.then(result => {
				console.log("success");
				alert("Success! Your new Time Slot is " + timeSlots);


			})
			.catch(error => {
				console.log(error);
			});
	};




	handleHTTPErrors(response) {
		if (!response.ok) throw Error(response.status + ': ' + response.statusText);
		return response;
	};

	render() {

	

		const timeStyle = {
			borderStyle: "solid",
			marginTop: "5 px",
			borderColor: "white",
			backgroundColor: "#D3D3D3",

			"borderWidth": "1 px"
		}
		return (

		
			<div>
				<h2>Calendar</h2>
				<form onSubmit={this.postAvailability}>

					<div className="row" >


						<div className="col-sm-2" style={timeStyle} >
							<b>Monday</b>
						</div>
						<div className="col-sm-2" style={timeStyle} >
							<b>Tuesday</b>
						</div>
						<div className="col-sm-2" style={timeStyle} >
							<b>Wednesday</b>
						</div>
						<div className="col-sm-2" style={timeStyle} >
							<b>Thursday</b>
						</div>
						<div className="col-sm-2" style={timeStyle} >
							<b>Friday</b>
						</div>

					</div>


					{this.state.ArrayTimeSlot.map((calendar, index) =>
					
				
						<div className="row" key={index} value={calendar.position}>

							<div className="col-sm-2 board" style={timeStyle} >
								<div className="form-check">
									<label><input onChange={this.handleCheckboxChange} type="checkbox" className="form-check-input" value={calendar[0].position} /> 	{calendar[0].start_time}</label><br />
								</div>
							</div>

							<div className="col-sm-2 board" style={timeStyle} >
								<div className="form-check">
									<label><input onChange={this.handleCheckboxChange} type="checkbox" className="form-check-input" value={calendar[1].position} /> 	{calendar[1].start_time}</label><br />
								</div>
							</div>

							<div className="col-sm-2 board" style={timeStyle} >
								<div className="form-check">
									<label><input onChange={this.handleCheckboxChange} type="checkbox" className="form-check-input" value={calendar[2].position} /> 	{calendar[2].start_time}</label><br />
								</div>
							</div>

							<div className="col-sm-2 board" style={timeStyle} >
								<div className="form-check">
									<label><input onChange={this.handleCheckboxChange} type="checkbox" className="form-check-input" value={calendar[3].position} /> 	{calendar[3].start_time}</label><br />
								</div>
							</div>

							<div className="col-sm-2 board" style={timeStyle} >
								<div className="form-check">
									<label><input onChange={this.handleCheckboxChange} type="checkbox" className="form-check-input" value={calendar[4].position} /> 	{calendar[4].start_time}</label><br />


								</div>

							</div>


						</div>

						
					)}


				
					<br />
					<div className="row">
						<div className="col-sm-10">
							<div className="form-group">
								<input type="Submit" className="btn btn-success btn-block" defaultValue="Submit" onClick={this.postAvailability} />
							</div>
						</div>
					</div>

				</form>

			</div>

		)
	};
};

module.exports = ManageMyTimeslots;