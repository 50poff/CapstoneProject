const React = require('react');

class Candidate extends React.Component {
    
	constructor(props) {
        super(props);
        this.state ={
            candidates:[],
            buttonText:this.props.buttonText
        }
        this.loadSingleCandidate = this.loadSingleCandidate.bind(this);
       const basicString = this.props.userCredentials.email + ':' +this.props.userCredentials.password;
        fetch(`${process.env.API_URL}/candidates`,{
            method: "GET",
            headers: {
                Authorization: "Basic " + btoa(basicString)
            }
        }).then(result => result.json())
        .then(result =>{
            this.setState({
                candidates: result
            });
           
        })
        .catch(error => {
            console.log(error);
        });
        
       
    };
   loadSingleCandidate(event){
       var candidate = this.state.candidates[event.target.value];
       this.props.singleCandidateCallback(candidate);
   };
    render(){
        if(this.state.viewCandidate){
            return(<div>stuff</div>);
        }
        else{
            return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                    <div className="row" >
                            <div className="col-sm-3">
                                <b>First Name</b>
                            </div>
                            <div className="col-sm-3">
                                <b>Last Name</b>
                            </div>
                            <div className="col-sm-3">
                                <b>Email</b>
                            </div> 
                    </div>
                    </li>
                    {this.state.candidates.map((candidate, index)=>
                        <li className="list-group-item" key={index}>
                        <div className="row" key={index}  value={candidate.candidate_id}>
                            <div className="col-sm-3">
                                {candidate.first_name}
                            </div>
                            <div className="col-sm-3">
                                {candidate.last_name}
                            </div>
                            <div className="col-sm-3">
                                {candidate.email}
                            </div>
                            <div className="col-sm-3">
                                <button className="btn btn-primary" value={index} onClick={this.loadSingleCandidate}>{this.state.buttonText}</button>

                            </div>
                        </div>
                         </li>   
                       )}
                 </ul>
                 </div>);
        }
    }
}

module.exports = Candidate;