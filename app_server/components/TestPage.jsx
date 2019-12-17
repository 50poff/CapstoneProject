// This isnt really a 'test' page anymore, it's kinda a part of our application.
// I'm using this as a "template" page for all the other components aswell

const React = require('react');

class TestPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Days: []
		}
	};

	handleHTTPErrors(response) {
		if (!response.ok) throw Error(response.status + ': ' + response.statusText);
		return response;
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

		return (
			<div>
				<h2>Welcome, <i>{this.props.user.first_name} {this.props.user.last_name}</i>!</h2>
				The tools that are available to you are displayed on the left.
			</div>	
		)
	};


	/*

	===========================================================================================

	render() {
		let currentUserFullName = this.props.user.first_name + " " + this.props.user.last_name;
		return (
            <div>
				<h2>Welcome, <i>{currentUserFullName}</i>!</h2>
				The activities that are available to you are displayed on the left.
			</div>
        )
	};
	*/
}; 

module.exports = TestPage;