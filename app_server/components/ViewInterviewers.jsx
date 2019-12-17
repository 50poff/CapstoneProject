  /* ******************* */
 /* ** Manager Tool *** */
/* ******************* */

const React = require('react');
const ListManagersInterviewers = require('./ViewInterviews/ListManagersInterviewers.jsx');

class ViewInterviewers extends React.Component {
	constructor(props) {
        super(props);
        this.state ={
            Interviewers:[],
            viewInterviewer:false
        }
       const basicString = this.props.userCredentials.email + ':' +this.props.userCredentials.password;
        fetch(`${process.env.API_URL}/getInterviewers`,{
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
                <ListManagersInterviewers userCredentials={this.props.userCredentials}
                                buttonText="View More information"/>
                </div>
            );
        }
    }
}

module.exports = ViewInterviewers;