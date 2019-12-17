const React = require('react');
const MeetingRoom = require('./ViewMeetingRooms/MeetingRoom.jsx')

class ListMeetingRooms extends React.Component {
    
	constructor(props) {
        super(props);
        this.state ={
            MeetingRooms:[]
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
                <ul className="list-group">
                    {this.state.MeetingRooms.map((room, index)=>
                        <li className="list-group-item" key={index}>
                        <div className="row" key={index}  value={room.meeting_room_id}>
                            <MeetingRoom roomName={room.room_name} roomLocation={room.room_location} roomId={room.meeting_room_id}/>
                        </div>
                         </li>   
                       )}
                 </ul>
                 </div>);
        }
    }
}

module.exports = ListMeetingRooms;