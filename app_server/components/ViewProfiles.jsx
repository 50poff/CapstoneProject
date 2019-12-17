/* ******************************* */
/* *** Hiring Team Member Tool *** */
/* ******************************* */

const React = require('react');

class ViewProfiles extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Profiles: [],
			postingProfileName: "",
			viewProfiles: false
		}
		this.handleText = this.handleText.bind(this);
		this.insertProfile = this.insertProfile.bind(this);

	}
	insertProfile(event) {
		event.preventDefault(); 


		const basicString = this.props.userCredentials.email + ':' + this.props.userCredentials.password;

		fetch(`${process.env.API_URL}/interviewers/post_skills`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(basicString)
			},
			body: JSON.stringify({
				"profile_name": this.state.postingProfileName

			})
			
		})
			.then(response => this.handleHTTPErrors(response))
			.then(response => response.json())
			.then(result => {
				let newProfiles = this.state.Profiles;
				let newItem = {
					profile_id: newProfiles.length,
					profile_name: this.state.postingProfileName
				};
				newProfiles.push(newItem);
				
				//console.log(this.state.postingProfileName);
				//console.log("success my brother");
				this.setState({
					Profiles: newProfiles,
					postingProfileName:""
				})
			})
			.catch(error => {
				console.log(error);
			});
			

	};


	componentDidMount() {
		const basicString = this.props.userCredentials.email + ':' + this.props.userCredentials.password;
		fetch(`${process.env.API_URL}/profiles`, {
		//fetch(`${process.env.API_URL}interviewers/skills`, {
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
					Profiles: result
				});
				
			})
			.catch(error => {
				console.log(error);
			});


	};


	handleText(event) {
		if (event.target.id === 'profile_name') {
			this.setState({
				postingProfileName: event.target.value
			});
		} else {
			// no
		}
	}




	handleHTTPErrors(response) {
		if (!response.ok) throw Error(response.status + ': ' + response.statusText);
		return response;
	};

	render() {

		if (this.state.viewProfiles) {
			return (<div>stuff</div>);
		} else {
			return (
				<div>
					<h2>View Profiles</h2>
					View profiles in Dai Hire, or add a new profile.
					<br/><br/>
					<h4>Add a new profile</h4>
					Please review the information before adding a new profile.
					<div className="row">
						<div className="col-sm-6">
							<form onSubmit={this.insertProfile}>
								<div className="input-group form-group">
									<div className="input-group-prepend">
		
									</div>
									<div className="row">
										<div className="col-sm-6">
											<input id="profile_name" type="text" className="form-control" placeholder="Profile Name" value={this.state.postingProfileName} required="required" onChange={this.handleText} />
										</div>
										<div className="col-sm-6">
											<div className="form-group">
												<input type="Submit" className="btn btn-dark btn-block" defaultValue="Add Profile" />
											</div>
										</div>
									</div>
								</div>		
								<br/><br/>
							</form>
						</div>
					</div>

					<div className="row">
						<ul className="list-group">
							<li className="list-group-item">
								<div className="row" >

									<div className="col-sm-12">
										<b>Profile Name</b>
									</div>

								</div>
							</li>

							{this.state.Profiles.map((profile, index) =>
								<li className="list-group-item" key={index}>
									<div className="row" key={index} value={profile.profile_id}>

										<div className="col-sm-12">
											{profile.profile_name}
										</div>

									</div>
								</li>
							)}

						</ul>
					</div>
					<br /><br />
					<br /><br />
					
					
				</div>
							

				)
		}
	}
};

module.exports = ViewProfiles;


