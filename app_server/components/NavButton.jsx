const React = require('react');
class NavButton extends React.Component {
	constructor(props) {
        super(props);
        this.mainCallback = this.mainCallback.bind(this);
        let value = this.props.value;
        if( value === undefined){
           value = this.props.tool.replace(/\s/g,'')
        }
        this.state={
            index:this.props.index,
            tool:this.props.tool,
            value:value,
            currentComponent:this.props.currentComponent
        }
    };

    // This function sends a value (of the button you just clicked) to Main.jsx so it knows what component to render next
    mainCallback(event){
        this.props.setCurrentPageCallback(event);
    };

    render(){
      if(this.props.currentComponent === this.state.value){
        return(
            <button key={this.state.index} className="btn btn-warning btn-block btn-sm" value={this.state.value} 
            onClick={this.mainCallback}>{this.state.tool}</button> 
        );


      }
      else{
        return(
            <button key={this.state.index} className="btn btn-dark btn-block btn-sm" value={this.state.value} 
            onClick={this.mainCallback}>{this.state.tool}</button> 
        );
      }
    }
}

module.exports = NavButton;