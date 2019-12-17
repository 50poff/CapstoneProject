const React = require("react");
class PickProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCredentials: this.props.userCredentials,
      interviewers: this.props.interviewers,
      chosenCandidate: this.props.chosenCandidate,
      chosenProfile: this.props.chosenProfile
    };
    this.selectSkill = this.selectSkill.bind(this);
    this.chooseProfile = this.chooseProfile.bind(this);
  }
  chooseProfile(event) {
    let qualifiedInterviewers = [];
    let pickedProfile = this.state.chosenCandidate.profile_name[
      this.state.chosenProfile
    ];
    this.state.interviewers.forEach(person => {
      if (person.profile_name.includes(pickedProfile)) {
        qualifiedInterviewers.push(person);
      }
    });
    let interviewersForProfile = {
      chosenProfile: event.target.value,
      interviewList: qualifiedInterviewers
    };
    this.props.profileCallback(interviewersForProfile);
  }

  selectSkill(event) {
    this.setState({
      chosenProfile: event.target.value
    });
  }

  render() {
    //render list of candidates

    //Have all interviewers with the same profile put into the qualifiedInterveiwers
    let qualifiedInterviewers = [];
    let pickedProfile = this.state.chosenCandidate.profile_name[
      this.state.chosenProfile
    ];
    this.state.interviewers.forEach(person => {
      if (person.profile_name.includes(pickedProfile)) {
        qualifiedInterviewers.push(person);
      } 
    });

    let confirmButton = (
      <button className="btn btn-danger" value={this.state.chosenProfile}>
        No interviewers Availabile for this profile
      </button>
    );
    if (qualifiedInterviewers.length > 0) {
      confirmButton = (
        <button
          className="btn btn-info"
          value={this.state.chosenProfile}
          onClick={this.chooseProfile}
        >
          Confirm Profile
        </button>
      );
    }
    return (
      <div>
        <br />
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-sm-4">The Chosen Candidate</div>
              <div className="col-sm-4">
                Candidate has applied for these Positions
              </div>
              <div className="col-sm-4">
                Choose the position the Candidate is applying for
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-4">
                Name: {this.state.chosenCandidate.first_name}{" "}
                {this.state.chosenCandidate.last_name}
                <br />
                Email: {this.state.chosenCandidate.email}
              </div>
              <div className="col-sm-4">
                <div className="btn-group-vertical">
                  {this.state.chosenCandidate.profile_name.map((p, index) => (
                    <button
                      type="button"
                      value={index}
                      className={
                        index == this.state.chosenProfile
                          ? "btn btn-info"
                          : "btn btn-primary"
                      }
                      key={index}
                      onClick={this.selectSkill}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-sm-4">{confirmButton}</div>
            </div>
          </div>
        </div>

        <br />
        <ul className="list-group">
          <li className="list-group-item" style={{ bgcolor: "#D8D8D8" }}>
            <div className="row">
              <div className="col-md-12">
                <i>Employees Available for Interview:</i>
                {qualifiedInterviewers.length}
              </div>
            </div>

            <div className="row">
              <div className="col-sm-3">
                <b>First Name</b>
              </div>
              <div className="col-sm-3">
                <b>Last Name</b>
              </div>
              <div className="col-sm-3">
                <b>Profile:</b>
                {pickedProfile}
              </div>
            </div>
          </li>
          {qualifiedInterviewers.map((person, index) => (
            <li className="list-group-item" key={index}>
              <div className="row" key={index} value={person.people_id}>
                <div className="col-sm-3">{person.first_name}</div>
                <div className="col-sm-3">{person.last_name}</div>
                <div className="col-sm-3">{person.profile_name.toString()}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

module.exports = PickProfile;
