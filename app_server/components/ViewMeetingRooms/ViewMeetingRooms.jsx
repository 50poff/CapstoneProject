/* ******************************* */
/* *** Hiring Team Member Tool *** */
/* ******************************* */

const React = require('react');
//const OneMeetingRoom = require('./OneMeetingRoom.jsx');
const ListMeetingRoom = require('../ListMeetingRooms.jsx');

class ViewMeetingRooms extends React.Component {
    
	constructor(props) {
        super(props);
        this.state ={
            MeetingRooms:[],
            viewMeetingRooms:false
        }
       const basicString = this.props.userCredentials.email + ':' +this.props.userCredentials.password;
        fetch(`${process.env.API_URL}/room`,{
            method: "GET",
            headers: {
                Authorization: "Basic " + btoa(basicString)
            }
        }).then(result => result.json())
        .then(result =>{
            this.setState({
                MeetingRooms: result
            });
           
        })
        .catch(error => {
            console.log(error);
        });
        
       
    };
    render(){
        if(this.state.viewMeetingRooms){
            return(<div>stuff</div>);
        }
        else{
            return (
                <div>
                <h2>View Meeting Rooms</h2>
                View a list of all meeting rooms that are registered in Dai Hire.
                <ListMeetingRoom userCredentials={this.props.userCredentials}/>
                </div>
            );
        }
    }
}; 

module.exports = ViewMeetingRooms;