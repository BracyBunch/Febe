var React = require('react');
var Reflux = require('reflux');
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var ProfileHeader = require('../components/profile/profile-header');
var OrgProfileBody = require('../components/profile/org-profile-body');
var Bio = require('../components/profile/profile-bio');
var Projects = require('../components/profile/profile-projects');
var ProfileStore = require('../stores/profile-store');
var Actions = require('../actions');

module.exports = React.createClass({
	mixins:[
		Reflux.listenTo(ProfileStore, 'onChange')
	],
	getInitialState: function(){
		return {
			userData: []
		}
	},
	componentWillMount: function(){
		Actions.getProfile(window.localStorage.getItem('userId'));
	},
	render: function() {
		return (
			<div className="fullscreen">
        <Header link='/dashboard' title='Home'/>
        <div className="profile centered">
		      <ProfileHeader />
		      <OrgProfileBody />
		      <Bio />
		      <Projects />
		      <button type="submit" onClick={this.checking} className="btn signupBtn text-center">checkstate</button>
		      <Footer />
		    </div>
	    </div>
		)
	},
	onChange: function(event, userData){
		this.setState({userData: userData})
	},
	checking:function(){
		console.log("this is on dev page", this.state.userData)
	}
})
