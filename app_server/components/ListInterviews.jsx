const React = require('react');

class ListInterviews extends React.Component {
    
	constructor(props) {
        super(props);
        this.state ={
            Interviews:[]
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
        
        this.prettyDate = this.prettyDate.bind(this);
        this.prettyName = this.prettyName.bind(this);

    };

    prettyDate(meeting_datetime, position){
        console.log(meeting_datetime);
        meeting_datetime = meeting_datetime.replace('Z','');
        meeting_datetime = meeting_datetime.split("T");
        meeting_datetime[1] = meeting_datetime[1].slice(0, -4);
        if(position){
            return meeting_datetime[0];
        } else {
            return meeting_datetime[1];
        }
    }

    prettyName(first_name, last_name){
        let name = "";
        name = first_name + " " + last_name;
        return name;
    }

    render(){
        if(this.state.viewInterviews){
            return(<div>stuff</div>);
        }
        else{
            return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                    <div className="row" >
                    {/* 12 */}
                            <div className="col-sm-1">
                                <b>Meeting Date</b>
                            </div>
                            <div className="col-sm-1">
                                <b>Meeting Time</b>
                            </div>
                            <div className="col-sm-1">
                                <b>room name</b>
                            </div>
                            <div className="col-sm-1">
                                <b>room location</b>
                            </div> 
                            <div className="col-sm-4">
                                <b>Other Interviewers</b>
                            </div> 
                            <div className="col-sm-2">
                                <b>Canditate Name</b>
                            </div> 
                            <div className="col-sm-2">
                                <b>Position</b>
                            </div>
                    </div>
                    </li>
                    {this.state.Interviews.map((Interviews, index)=>
                        <li className="list-group-item" key={index}>
                        <div className="row" key={index}  value={Interviews.meeting_datetime}>
                            <div className="col-sm-1">
                                {this.prettyDate(Interviews.meeting_datetime, true)}
                            </div>
                            <div className="col-sm-1">
                                {this.prettyDate(Interviews.meeting_datetime, false)}                                
                            </div>
                            <div className="col-sm-1">
                                {Interviews.room_name}
                            </div>
                            <div className="col-sm-1">
                                {Interviews.room_location}
                            </div>
                            <div className="col-sm-4">
                            {
                                Interviews.person.map((person, index2)=>
                                    <div className="row" key={index2}>
                                        Name: {person[0] + " "} 
                                        Email: {person[1]}
                                    </div>)
                                
                            }<br />
                            </div>
                            <div className="col-sm-2">
                                {this.prettyName(Interviews.first_name, Interviews.last_name)}                                
                            </div>
                            <div className="col-sm-2">
                                {Interviews.profile_name}                                
                            </div>
                        </div>
                         </li>   
                       )}
                 </ul>
                 </div>);
        }
    }
}

module.exports = ListInterviews;