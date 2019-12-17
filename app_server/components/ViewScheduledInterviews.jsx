/* ******************************* */
/* *** Hiring Team Member Tool *** */
/* ******************************* */

const React = require('react');
const ListAllScheduledInterviews = require('./ListAllScheduledInterviews.jsx');

class ViewScheduledInterviews extends React.Component {
	constructor(props) {
        super(props);
        this.state ={
            Interviews:[],
            viewInterviews:false
        }
       const basicString = this.props.userCredentials.email + ':' +this.props.userCredentials.password;
        fetch(`${process.env.API_URL}/getAllMeetingPeople`,{
            method: "GET",
            headers: {
                Authorization: "Basic " + btoa(basicString)
            }
        }).then(result => result.json())
        .then(result =>{
            this.setState({
                Interviews: result
            });
           
        })
        .catch(error => {
            console.log(error);
        });
        
       
    };
    render(){
        if(this.state.viewInterviews){
            return(<div>stuff</div>);
        }
        else{
            return (
                <div>
                <h2>View All Meetings</h2>
                <ListAllScheduledInterviews userCredentials={this.props.userCredentials}/>
                </div>
            );
        }
    }
}; 

module.exports = ViewScheduledInterviews;