const React = require('react');
const Login = require('./Login.jsx');

class AddCandidateComponent extends React.Component {
    constructor(props) {
        super(props)
        this.addCandidate = this.addCandidate.bind(this);
        this.login = this.login.bind(this);
        //this.register = this.register.bind(this);
        //this.addNewUser = this.addNewUser.bind(this);
        this.state = { 
            candidates: this.props.candidates,
            loginForm: true,
            loginAttempts: 3,
            loginFail: false,
            //registrationForm: false,
            //registrationFail: false,
            userCredentials: {
                email: '',
                password: ''
            }
         }
    }
    addCandidate(candidate) {
        const basicString = this.state.userCredentials.email + ':'   
        + this.state.userCredentials.password;
        
        fetch(`${process.env.API_URL}/candidates`, {   
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(basicString)

            },
            body: JSON.stringify(message)
        })
            .then(response => this.handleHTTPErrors(response))
            .then(result => result.json()) 
            .then(result => {
                this.setState({
                    candidates:       
                    [result].concat(this.state.candidates)
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleHTTPErrors(response) {
        if (!response.ok) throw Error(response.status + ': ' + response.statusText);
        return response;
    }
    componentDidMount() {

        const basicString = this.state.userCredentials.email + ':'   
        + this.state.userCredentials.password;
        fetch(`${process.env.API_URL}/candidates`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Basic " + btoa(basicString)

            },
            //body: JSON.stringify(messages)
        })
            .then(response => this.handleHTTPErrors(response))
            .then(response => response.json())
            .then(result => {
                this.setState({
                    messages: result
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {  
        /*
        if (this.state.registrationForm) {
            let failedRegistration;
            if (this.state.registrationFail) {     
                failedRegistration =
                    <p className = "text-danger"> User already Registered or Registration Error. </p>   
                }
                return (
                    <div>
                        <Registration registerNewUserCallback = {this.addNewUser}/>       
                        {failedRegistration}
                        </div>   
                        ) 
                    } else {  



                    let form;  
                    if (this.state.loginForm) {    
                        form = <Login registerCallback={this.register}
                        loginCallback={this.login}
                        loginFail={this.state.loginFail}
                        loginAttempts={this.state.loginAttempts}    
                        />  
                    } else {    
                        form = <NewMsg addMsgCallback = {this.addMessage} />  
                    }  return (
                    <div>      
                    {form}
                    <MsgList messages = {this.state.messages} />
                    </div>  
                    );
                    }*/
            }
        }


module.exports = AddCandidateComponent