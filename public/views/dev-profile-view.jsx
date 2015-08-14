var React = require('react');
var Reflux = require('reflux');
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var ProfileHeader = require('../components/profile/profile-header');
var DevProfileBody = require('../components/profile/dev-profile-body');
var Bio = require('../components/profile/profile-bio');
var Projects = require('../components/profile/profile-projects');
var ProfileStore = require('../stores/profile-store');
var Actions = require('../actions');

var ProfileHeaderEdit = require('../components/profile/edit-components/profile-header-edit');
var DevProfileBodyEdit = require('../components/profile/edit-components/dev-profile-body-edit');
var BioEdit = require('../components/profile/edit-components/profile-bio-edit');

var ProfileMethods = require('../components/profile/sharedProfileMethods');

module.exports = React.createClass({
	mixins:[
		Reflux.listenTo(ProfileStore, 'onChange')
	],
	getInitialState: function(){
		return {
			title: 'Please enter your title & company',
			location: 'Please enter your location',
			bio: 'Tell us about yourself...',
			links: [],
			strengths: [],
			interests: [],
			userData: [],
			swap: true
		};
	},

	componentWillMount: function(){
		Actions.getProfile(window.localStorage.getItem('userId'));
	},

	onChange: function(event, userData){
		this.setState({userData: userData});
	},

	edit: function() {
    this.setState({
    	swap: !this.state.swap
    });
	},

	save: function() {
    this.edit();
    var updateData = {
      title: this.state.title,
      location: this.state.location,
      bio: this.state.bio
    };
    ProfileMethods.updateProfile('/user', 'put', updateData);
	},

	updateTitle: function(title) {
		this.setState({
      title: title
		});
	},

	updateLocation: function(location) {
    this.setState({
    	location: location
    });
	},

	updateLinks: function(link) {
		this.state.links.push(link);
    this.setState({
      links: links
    });
	},

	updateBio: function(bio) {
		this.setState({
			bio: bio
		});
	},

	profileEdit: function(edit) {
		return edit ? 
      <div>
        <ProfileHeader 
            edit={this.edit}
		        firstName={this.state.userData.first_name}
		        lastName={this.state.userData.last_name}
		        avatar={this.state.userData.avatar}
		        title={this.state.title}
		        location={this.state.location}
		        bio={this.state.bio}
		        links={this.state.links} />
        <DevProfileBody />
        <Bio bio={this.state.userData.bio} />
        <Projects />
      </div> 
      :
      <div>
        <ProfileHeaderEdit 
            edit={this.save}
		        firstName={this.state.userData.first_name}
		        lastName={this.state.userData.last_name}
            updateTitle={this.updateTitle}
            updateLocation={this.updateLocation} />
        <DevProfileBodyEdit />
        <BioEdit updateBio={this.updateBio} />
      </div>
	},

	render: function() {
		return (
		<div>
      <Header link='/dashboard' title='Dashboard' />
			{this.profileEdit(this.state.swap)}
			<button type="submit" onClick={this.checking} className="btn signupBtn text-center">checkstate</button>
      <Footer />	
		</div>
		)
	}
});
