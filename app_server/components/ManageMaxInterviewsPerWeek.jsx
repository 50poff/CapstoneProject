const React = require('react');

class ManageMaxInterviewsPerWeek extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenMaxInterviews: 0,
            oldMaxInterviews: 0,
        };
        this.updateMaxInterviews = this.updateMaxInterviews.bind(this);
        this.handleText = this.handleText.bind(this);
        this.plusOrMinus = this.plusOrMinus.bind(this);
        this.resetToOldMax = this.resetToOldMax.bind(this);
    };


    // resets the number in the text box to the value currently stored in the database
    resetToOldMax(event) {
        event.preventDefault();
        let oldMax = this.state.oldMaxInterviews;
        this.setState({
            chosenMaxInterviews: oldMax
        })
    }

    // This method is called whenever the user clicks the "+1" or "-1" button above the Submit button
    // It doesn't actually change the number in the database; that only happens when the user presses "Submit" button
    plusOrMinus(event) {
        let temp = parseInt(this.state.chosenMaxInterviews);
        //console.log(' * this.state.chosenMaxInterviews: ' + this.state.chosenMaxInterviews);
        //console.log(' * temp: ' + temp);
        if (isNaN(temp)){ // checks to see if the value inside the box is Not a Number (NaN)
            temp = 1; // just sets it to 1 because thats the minimum value it can be
        } else if(event.target.id === 'plus') { // The user is increasing their max per week by 1
            temp += 1;
		} else if(event.target.id === 'minus') { // The user is reducing their max per week by 1
            if (temp-1 < 0){ // User is attempting to set their max per week to be zero or less
                alert(" You can't have a negative number of interviews per week!")
                return;
            } else {
                temp -= 1;
            }
		} else {
            console.log(" * Well we aint letting them multiply, divide, modulo or sqrt or whatever so you shouldn't be here!");
            return;
        }
        this.setState({ 
            chosenMaxInterviews: temp
        });
    }

    // Handles changes to the text in the editable box on this page
    handleText(event) {
        if(event.target.id === 'max_interviews') {
            let temp = parseInt(event.target.value);
			this.setState({ 
                chosenMaxInterviews: temp 
            });
		} else {
            // nothing my brother
        }
    }

    // This function is called as soon as the component is loaded
    // It gets the max_interviews (per week) for the currently logged in user
    componentDidMount() {
        const basicString = this.props.userCredentials.email + ':' + this.props.userCredentials.password;
        let user_id = this.props.user.people_id;
        fetch(`${process.env.API_URL}/people/maxinterviews/${user_id}`, { // This is the correct version
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(basicString)
            }
        })
        .then(response => this.handleHTTPErrors(response))
        .then(response => response.json())
        .then(result => {
                this.setState({
                    chosenMaxInterviews: result[0].max_interviews,
                    oldMaxInterviews: result[0].max_interviews
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Updates the Interviewer/Interview Leaders's max interviews per week in the database
    updateMaxInterviews(event) {
        event.preventDefault(); // Prevents the function from moving the user to the login page

        // check to see if the user even changed the value at all
        if (this.state.chosenMaxInterviews == this.state.oldMaxInterviews){
            return;
        }

        const basicString = this.props.userCredentials.email + ':' + this.props.userCredentials.password;
        let newMaxInterviews = this.state.chosenMaxInterviews;
        console.log(" * chosenMaxInterviews: " + this.state.chosenMaxInterviews);

        // check to see if the interviewer is attempting to submit a negative number of interviews per week
        if (this.state.chosenMaxInterviews < 0) {
            console.log("You cannot have a negative number of interviews per week");
            return;
        }
        fetch(`${process.env.API_URL}/people/maxinterviews`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(basicString)
            },
            body: JSON.stringify({
                "max_interviews": this.state.chosenMaxInterviews
            })
        })
        .then(response => this.handleHTTPErrors(response))
        .then(response => response.json())
        .then(result => {
            alert("Success! Your new maximum per week is " + this.state.chosenMaxInterviews);
            this.setState({
                oldMaxInterviews: newMaxInterviews
            })
        })
        .catch(error => {
            console.log(error);
        });
        // Done adding the new max of interviews
    }

    handleHTTPErrors(response) {
        if (!response.ok) throw Error(response.status + ': ' + response.statusText);
        return response;
    };

    render() {

        // When the user presses a button to reduce max interviews per week by 1
        let minusButton = (
            <div className="col-sm-3">
                <input id="minus" type="Button" className="btn btn-dark btn-block" defaultValue="-1" onClick={this.plusOrMinus}/>
            </div>
        )

        // When the user presses a button to increase max interviews per week by 1
        let plusButton = (
            <div className="col-sm-3">
                <input id="plus" type="Button" className="btn btn-dark btn-block" defaultValue="+1" onClick={this.plusOrMinus}/>
            </div>
        )

        let resetButton = (
            <div className="col-sm-6">
                <input id="reset" type="Button" className="btn btn-dark btn-block" defaultValue="Reset" onClick={this.resetToOldMax}/>
            </div>
        )

        let submitButton = (
            <div className="col-sm-6">
                <div className="form-group">
                    <input type="Submit" className="btn btn-dark btn-block disabled" value="No changes to submit"></input>
                </div>
            </div>
        )
        
        let fieldStyle = {"backgroundColor":"#fff"};

        // changes the background color of the text box to red if it different from the value currently in the database
        if (this.state.oldMaxInterviews != this.state.chosenMaxInterviews){
            fieldStyle={"backgroundColor":"#bfb"}; // change the bg color of the text box
            submitButton = (
                <div className="col-sm-6">
                    <div className="form-group">
                        <input type="Submit" className="btn btn-success btn-block" value="Submit"></input>
                    </div>
                </div>
            )
        } else if (isNaN(this.state.chosenMaxInterviews)) {
            fieldStyle={"backgroundColor":"#fbb"}; // change the bg color of the text box
            <div className="col-sm-6">
                    <div className="form-group">
                        <input type="Submit" className="btn btn-danger btn-block disabled" value="Invalid value"></input>
                    </div>
                </div>
        }

        // The editable field that holds the max interviews per week in the DB (by default), or the unsaved new max interviews per week
        let maxInterviewsIntegerField = (
            <div className="col-sm-6">
                <div className="input-group form-group">
                    {/* pattern="[0-9]*" ensures that it can only be an positive integer */}
                    <input style={fieldStyle} id="max_interviews" type="number" pattern="[0-9]*" min="0" className="form-control" placeholder="max interviews per week" value={this.state.chosenMaxInterviews} required="required" onClick={this.state.updateMaxInterviews} onChange={this.handleText} />
                    {/*<input type="number" name="Max Interviews per week" min="1" className="form-control" required="required" onChange={this.handleText}/>*/}
                </div>
            </div>
        )

        return (
            <div className="col-sm-9">
                <h1>Manage Max Interviews Per Week</h1>
                Set the maximum number of interviews that you, as an Interviewer or Interview Leader, are available for per week. You may either type in a number or use the -1 and +1 buttons. 
                <br/><br/>
                Make sure to press <strong>submit</strong> when you are happy with your changes.
                <br/><br/>
                <form onSubmit={this.updateMaxInterviews}>
                    <div className="row">
                        {maxInterviewsIntegerField}
                        {submitButton}
                    </div>
                    <div className="row">
                        {minusButton}
                        {plusButton}
                        {resetButton}
                    </div>
                </form>
            </div>
        )

    };
};

module.exports =
    ManageMaxInterviewsPerWeek
    ;
