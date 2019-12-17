/* ******************************* */
/* *** Hiring Team Member Tool *** */
/* ******************************* */

const React = require('react');
const DisplayTimeSlot = require('./DisplayTimeSlot.jsx');

class ViewTimeslots extends React.Component {
	constructor(props) {
		super(props);
		let PersonAvailability = [];
		if (this.props.PersonAvailability !== undefined) {
			PersonAvailability = this.props.PersonAvailability;
		}
		this.state = {
			Days: [],
			PersonAvailability: PersonAvailability

		}

	};

	componentDidMount() {
		const basicString = this.props.userCredentials.email + ':' + this.props.userCredentials.password;
		fetch(`${process.env.API_URL}/calendar`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(basicString)
			}
		})
			.then(response => this.handleHTTPErrors(response))
			.then(response => response.json())
			.then(result => {
				this.setState({
					Days: result
				});

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
			marginTop: "1 px",
			borderColor: "white",
		}

		return (
			<div>
				<h2>Calendar</h2>
				<div style={{ borderRadius: "25px", background: "rgba(0, 0, 0, 0.5)", backgroundColor: "#229ef7", padding: "20px" }}>
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
					{this.state.Days.map((calendar, index) =>
						<div className="row" key={index} value={calendar.week_day}>
							<DisplayTimeSlot
								start_time={calendar[0].start_time}
								end_time={calendar[0].end_time}
								week_day={calendar[0].week_day}
								position={index}
								personTimeslotsToAdd={this.state.PersonAvailability}
								allTimeslots={this.state.Days}
							/>
							<DisplayTimeSlot
								start_time={calendar[1].start_time}
								end_time={calendar[1].end_time}
								week_day={calendar[1].week_day}
								position={index}
								personTimeslotsToAdd={this.state.PersonAvailability}
								allTimeslots={this.state.Days}
							/>
							<DisplayTimeSlot
								start_time={calendar[2].start_time}
								end_time={calendar[2].end_time}
								week_day={calendar[2].week_day}
								position={index}
								personTimeslotsToAdd={this.state.PersonAvailability}
								allTimeslots={this.state.Days}
							/><DisplayTimeSlot
								start_time={calendar[3].start_time}
								end_time={calendar[3].end_time}
								week_day={calendar[3].week_day}
								position={index}
								personTimeslotsToAdd={this.state.PersonAvailability}
								allTimeslots={this.state.Days}
							/><DisplayTimeSlot
								start_time={calendar[4].start_time}
								end_time={calendar[4].end_time}
								week_day={calendar[4].week_day}
								position={index}
								personTimeslotsToAdd={this.state.PersonAvailability}
								allTimeslots={this.state.Days}
							/>
						</div>

					)}

				</div>
			</div>

		)
	};
};

module.exports = ViewTimeslots;


