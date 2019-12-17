const React = require('react');
const NavButton = require('./NavButton.jsx');
class NavigationBar extends React.Component {
	constructor(props) {
        super(props);
        this.mainCallback = this.mainCallback.bind(this);
        this.state ={
            currentComponent:this.props.currentComponent
        }
    };

    // This function sends a value (of the button you just clicked) to Main.jsx so it knows what component to render next
    mainCallback(event){
        this.props.setCurrentPageCallback(event.target.value);
        this.setState({
            currentComponent:event.target.value        });
        window.scrollTo(0, 0); // teleports the user to the top of the page
    };

    render(){
        // These variables are all related to rendering buttons that are relevant to the currently logged in user's role[s]
        // These are all camelized for the value of the button when it's rendered
        let administratorTools = ["Add User", "Edit User"];
        let hiringTeamMemberTools = ["Schedule a Meeting","View Candidates", "View Scheduled Interviews", "View Timeslots", "View Availability", "View Meeting Rooms", "View Profiles"];
        let managerTools = ["Add Interviewer", "Your Staff's Meetings", "View Interviewers", "Add Profiles To Interviewers"];
        let interviewerTools = ["Manage My Timeslots", "Manage Max Interviews Per Week", "View My Invited Meetings"];

        let allUsersRender = (
            <div>
                <strong>Misc Tools</strong>
                <br/>
                <NavButton 
                     index={0}
                     tool={"Change my password"}
                     value={"ChangePassword"}
                     currentComponent ={this.state.currentComponent}
                     setCurrentPageCallback={this.mainCallback}
                     />
                <button className="btn btn-danger btn-block btn-sm" onClick={this.props.logout}>Log out</button> 
                <br/>
            </div>
        )

        // If the user has the respective role, then these are filled with the respective JSX in one of the IF statements below
        // Otherwise, they're left empty so it won't render anything there.
        let adminRender = (<div></div>);
        let htmRender = (<div></div>);
        let managerRender = (<div></div>);
        let interviewerRender = (<div></div>);

        /* === Checks to see if the user is an Administrator === */
        if (this.props.user.role_name.includes("Administrator")) {
            adminRender = (
            <div>
                <strong>Administrator Tools</strong>
                {administratorTools.map((tool, index) => 
                <div key={index}>
                     <NavButton 
                     index={index}
                     tool={tool}
                     value={tool.replace(/\s/g,'')}
                     currentComponent ={this.state.currentComponent}
                     setCurrentPageCallback={this.mainCallback}
                     />
                </div>
                )}
                <br/>
                
            </div>);
        }

        /* === Checks to see if the user is a Hiring Team Meber === */
        if (this.props.user.role_name.includes("Hiring Team Member")) {
            htmRender = (
            <div>
                <strong>Hiring Team Member Tools</strong>
                {hiringTeamMemberTools.map((tool, index) => 
                    <div key={index}>
                    <NavButton 
                    index={index}
                    tool={tool}
                    value={tool.replace(/\s/g,'')}
                    currentComponent ={this.state.currentComponent}
                    setCurrentPageCallback={this.mainCallback}
                    />
               </div>
                )}
                <br/>
            </div>);
        }

        /* === Checks to see if the user is a Manager === */
        if (this.props.user.role_name.includes("Manager")) {
            managerRender = (
            <div>
                <strong>Manager Tools</strong>
                {managerTools.map((tool, index) => 
                     <div key={index}>
                     <NavButton 
                     index={index}
                     tool={tool}
                     value={tool.replace(/\s/g,'')}
                     currentComponent ={this.state.currentComponent}
                     setCurrentPageCallback={this.mainCallback}
                     />
                </div>
                )}
                <br/>
            </div>);
        }

        /* === Checks to see if the user is an Interviewer or Interview Leader === */
        if ((this.props.user.role_name.includes("Interviewer"))||(this.props.user.role_name.includes("Interview Leader"))) {
            interviewerRender = (
            <div>
                <strong>Interviewer Tools</strong>
                {interviewerTools.map((tool, index) => 
                    <div key={index}>
                    <NavButton 
                    index={index}
                    tool={tool}
                    value={tool.replace(/\s/g,'')}
                    currentComponent ={this.state.currentComponent}
                    setCurrentPageCallback={this.mainCallback}
                    />
               </div>
                )}
                <br/>
            </div>);
        }

        return(
            <div>
                <center>
                    <br/>
                    {adminRender}
                    {htmRender}
                    {managerRender}
                    {interviewerRender}
                    {allUsersRender}
                </center>
            </div>
        );
    }
}

module.exports = NavigationBar;