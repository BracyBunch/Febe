var React = require('react');
var Header = require('../header');
var Footer = require('../footer');
var ProfHeader = require('./profile-header');
var DevProfBody = require('./dev-profile-body');
var Bio = require('./profile-bio');
var Projects = require('./profile-projects');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="fullscreen">
        <Header link='/' title='Home'/>
        <div className="profile">
		      <ProfHeader className="centered"/>
		      <DevProfBody />
		      <Bio />
		      <Projects />
		      <Footer />
		    </div>
	    </div>
		)
	}
})