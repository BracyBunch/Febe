var React = require('react');
var Oauth = require('./signupOAuth');
var Org = require('./signupOrg');

module.exports = React.createClass({
	render: function() {
		return (
			<div>
	      <Oauth name="Organization" />
	      <Org />
			</div>
		)
	}
})