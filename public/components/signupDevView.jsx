var React = require('react');
var Oauth = require('./signupOAuth');
var Main = require('./signupMain');
var Dev = require('./signupDev');
var Header = require('./header');
var Footer = require('./footer');

module.exports = React.createClass({
	render: function() {
		return (
			<div>
        <Header link='/' title='Home'/>
	      <Oauth name="Developer Signup" />
	      <Main />
	      <Dev />
        <Footer />
			</div>
		)
	}
})