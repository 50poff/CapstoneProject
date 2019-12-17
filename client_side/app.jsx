const React = require('react');
const ReactDOM = require('react-dom');

// Declare our three highest-level components that will be rendered at all times
const Header = require('../app_server/components/Header.jsx');
const Footer = require('../app_server/components/Footer.jsx');
const Main = require('../app_server/components/Main.jsx');

// Hydrate them so they, like, change or whatever when they have to
ReactDOM.hydrate(<Header/>, document.getElementById('header'));
ReactDOM.hydrate(<Footer/>, document.getElementById('footer'));
ReactDOM.hydrate(<Main/>, document.getElementById('main'));

console.log(" * [app.jsx] HYDRATED!");