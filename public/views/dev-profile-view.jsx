var React = require('react');
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var ProfHeader = require('../components/profile/profile-header');
var DevProfBody = require('../components/profile/dev-profile-body');
var Bio = require('../components/profile/profile-bio');
var Projects = require('../components/profile/profile-projects');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="fullscreen">
        <Header link='/' title='Home'/>
        <div className="">
		      <ProfHeader />
		      <DevProfBody />
		      <Bio />
		      <Projects />
		      <Footer />
		    </div>
	    </div>
		)
	}
})