const React = require('react');
//const event = require('event');

class Login extends React.Component {
	constructor(props) {
        super(props);
        this.state = { 
            email: "", 
            password: "" 
        };
        this.login = this.login.bind(this);
        this.handleText = this.handleText.bind(this);
       
	};

	handleHTTPErrors(response) {
		if (!response.ok) throw Error(response.status + ': ' + response.statusText);
		return response;
    };

    // copied from NewMsg.jsx. Replaced all state variable property names
    handleText(event) {
        if(event.target.id === 'email') {
            this.setState({ email: event.target.value });
        } else {
            this.setState({ password: event.target.value });
        }
    }

    login(event) {
        event.preventDefault();

        // passes the three properties back to Main.jsx
        this.props.loginCallback({
            email: this.state.email,
            password: this.state.password,
            username: this.state.username
        });
        
    }
    componentDidMount(){
        let storage = window.localStorage.getItem('login');
        if(storage !=null ){
            storage = JSON.parse(storage);
            let userCredentials = {
                email:storage.email,
                password:storage.password
            };
           this.props.loginCallback(userCredentials);
        }
    }
	render() {
        let loginFailText;
        if(this.props.loginFail){
            loginFailText = ( 
                <p className="card-text pt-1 text-danger">
                Failed Login Attempt. &nbsp;{this.props.loginAttempts} attempts
                remaining.
                </p>
            );
        }
       
		return (
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div> {/* className="card" */}
                        <br/>
                        <div className="please-log-in">
                            <h4>Please log in to access</h4>
                        </div>
                        <div> {/*  className="card-body" */}
                            {/* The form */}
                            <form onSubmit={this.login}> {/* it's "this." because it's a part of this class */}
                                <div className="input-group form-group">
                                    {/*
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-user"/>
                                        </span>
                                    </div>
                                    */}
                                    <input id="email" type="text" className="form-control" placeholder="email" onChange={this.handleText}/>
                                </div>
                                <div className="input-group form-group">
                                    {/*
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-key"/>
                                        </span>
                                    </div>
                                    */}
                                    <input id="password" type="password" className="form-control" placeholder="password" onChange={this.handleText}/>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-dark btn-block">Login</button>
                                </div>
                            </form>
                            {loginFailText}
                        </div>
                        <div> {/*  className="card-footer" */}
                            {/* 
                            <div className="d-flex justify-content-center">
                                <a href="#">Forgot your password?</a>
                            </div>
                            */} {/* not in scope, but we should implement it at some point */}
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}; 

module.exports = Login;
