var React = require('react');
var Oauth = require('./signupOAuth');
var Main = require('./signupMain');
var Org = require('./signupOrg');
var Header = require('./header');
var Footer = require('./footer');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="fullscreen">
        <Header link='/' title='Home'/>
	      <Oauth name="Nonprofit Representative Signup" />
	      <Main />
	      <Org />
        <Footer />
			</div>
		)
	}
})