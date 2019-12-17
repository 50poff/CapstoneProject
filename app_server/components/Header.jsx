const React = require('react');
//import '../../public/stylesheets/style.css';

// The banner image in here is defined in app_router.js
// Why do images have to be so difficult in React?!

const Header = (props) => {
    return (
        <div className="row">
            <div className="col-sm-2">
        </div>
        <div className="col-sm-10">
            <center>
            <h1><strong>DAI HIRE</strong></h1>
                <h6>Daitan Hiring Application</h6>
            </center>
            </div>
            </div>
            )
};
module.exports = Header;