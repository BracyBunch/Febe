var React = require('react');
var Oauth = require('./signupOAuth');
var Dev = require('./signupDev');

module.exports = React.createClass({
	render: function() {
		return (
			<div>
	      <Oauth />
	      <Dev />
			</div>
		)
	}
})