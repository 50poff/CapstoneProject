const React = require('react');
const ListInterviews = require('./ListInterviews.jsx');

class ViewInterviews extends React.Component {
    
	constructor(props) {
        super(props);
        this.state ={
            Interviews:[],
            viewInterviews:false
        }
       const basicString = this.props.userCredentials.email + ':' +this.props.userCredentials.password;
        fetch(`${process.env.API_URL}/getAllMeetingInterviewer`,{
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
                <h2>View Your Interviews</h2>
                <ListInterviews userCredentials={this.props.userCredentials}/>
                </div>
            );
        }
    }
}; 

module.exports = ViewInterviews;