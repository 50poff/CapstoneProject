const React = require("react");

class ManageMyTimeslots_chosen extends React.Component {
    constructor(props) {
        super(props);

        let chosen = false;
        let start_time = this.props.start_time;
        let week_day = this.props.week_day
        let interviewer = this.props.timeSlots;

        // checks for matching entries in the interviewer's list of timeslots to see if they have an entry where the starttime and weekday matches
        for(let i =0;i<interviewer.length;i++){
            if(start_time === interviewer[i].start_time &&
                week_day === interviewer[i].weekday){
                    chosen = true;
                    break;
            }
        }
        this.state = {
            week_day: this.props.week_day,
            start_time: this.props.start_time,
            end_time: this.props.end_time,
            position: this.props.position,
            timeSlotsInterviewerHas: this.props.timeSlots,
            ArrayTimeSlot: this.props.ArrayTimeSlot,
            chosen:chosen

        };
        this.delete=this.delete.bind(this);
        this.add=this.add.bind(this)
    }

    handleHTTPErrors(response) {
        if (!response.ok) throw Error(response.status + ": " + response.statusText);
        return response;
    }
    delete(event){
        this.props.deleteTimeslotCallback(event);
        this.setState({
          chosen:false
        })

    }
    add(event){
        this.props.addTimeslotCallback(event);
        this.setState({
          chosen:true
        })
    }

    render() {
        let thisTimeslotArray = [this.props.end_time, this.props.start_time, this.props.week_day];
       let chosen = this.state.chosen;
        if (chosen) {
            return (
                <div className="col-sm-2 board" key={this.props.index}>
                    <button className="btn btn-block btn-warning btn-sm" value={thisTimeslotArray} onClick={this.delete}>
                    {this.props.start_time}
                    </button>
                </div>
            );
        }
        else {
              return (
                <div className="col-sm-2 board" key={this.props.index}>
                    <button className="btn btn-block btn-outline-light btn-sm" value={thisTimeslotArray} onClick={this.add}>
                    {this.props.start_time}
                    </button>
                </div>
              );
          }
    }



}



module.exports = ManageMyTimeslots_chosen;