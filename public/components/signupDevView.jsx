var React = require('react');
var Oauth = require('./signupOAuth');
var Dev = require('./signupDev');
var Org = require('./signupOrg')

module.exports = React.createClass({
	render: function() {
		return (
			<div>
	      <Oauth name="Developer" />
	      <Dev />
			</div>
		)
	}
})