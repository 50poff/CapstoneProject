//'use strict';
require('es6-promise').polyfill();
require('isomorphic-fetch');
require("@babel/register") ({ presets: [ '@babel/preset-react' ]});

function handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ': ' + response.statusText);
    return response;
}

// 1. require() React and ReactDOMServer
const React = require('react');
const ReactDOMServer = require('react-dom/server');

// 2. You will need to transpile and require JSX components: Header, Footer, etc.
const Header = React.createFactory(require('../components/Header.jsx')); 
const Main = React.createFactory(require('../components/Main.jsx'));
const Footer = React.createFactory(require('../components/Footer.jsx'));
//const MsgBoard = React.createFactory(require('../components/MsgBoard.jsx')); // used in the ICS221 project

// 3. Below your React Component's createFactory() statements, add the following global array declaration:

// index handler
const renderIndex = (req, res) => {
    // generates the HTML and sends it to the Client Browser
    res.render('index', { // render is based off of index.pug
        title: 'Dai Hire',
        header: ReactDOMServer.renderToString(Header()),
        main: ReactDOMServer.renderToString(Main()), // this is defined in index.pug
        footer: ReactDOMServer.renderToString(Footer()),
    });
};

// 5. Export this function so that it can be called in app_router.js
module.exports = { renderIndex };