const React = require("react");

class MeetingRoom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let roomStyle = {
        borderRadius: "15px",
        background: "rgba(34,158,247,0.5)",
        padding: "5px"
    }
    return (
        <div style={roomStyle}>
            <strong>{this.props.roomLocation}</strong><br/>
            {this.props.roomName} 
        </div>
    );
  }
}

module.exports = MeetingRoom;
