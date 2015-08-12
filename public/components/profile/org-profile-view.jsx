var React = require('react');
var Header = require('../header');
var Footer = require('../footer');
var ProfHeader = require('./profile-header');
var OrgProfBody = require('./org-profile-body');
var Bio = require('./profile-bio');
var Projects = require('./profile-projects');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="fullscreen">
        <Header link='/' title='Home'/>
        <div className="profile centered">
		      <ProfHeader />
		      <OrgProfBody />
		      <Bio />
		      <Projects />
		      <Footer />
		    </div>
	    </div>
		)
	}
})