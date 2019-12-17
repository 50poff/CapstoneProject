/* ******************************* */
/* *** Hiring Team Member Tool *** */
/* ******************************* */

const React = require('react');
const ListAllInterviewers = require('./ViewInterviews/ListAllInterviewers.jsx');

class ViewAvailability extends React.Component {
	constructor(props) {
        super(props);
        this.state ={
            Interviewers:[],
            viewInterviewer:false
        }
       const basicString = this.props.userCredentials.email + ':' +this.props.userCredentials.password;
        fetch(`${process.env.API_URL}/getAllInterviewers`,{
            method: "GET",
            headers: {
                Authorization: "Basic " + btoa(basicString)
            }
        }).then(result => result.json())
        .then(result =>{
            this.setState({
                Interviewers: result
            });
           
        })
        .catch(error => {
            console.log(error);
        });
        
       
    };
    render(){
        if(this.state.viewInterviewer){
            return(<div>stuff</div>);
        }
        else{
            return (
                <div>
                <ListAllInterviewers userCredentials={this.props.userCredentials}
                                buttonText="View More information"/>
                </div>
            );
        }
    }
}; 

module.exports = ViewAvailability;