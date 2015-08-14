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

var ProfileMethods = require('../sharedMethods');

module.exports = React.createClass({
	mixins:[
		Reflux.listenTo(ProfileStore, 'onChange')
	],
	getInitialState: function(){
		return {
			title: '',
			location: '',
			bio: '',
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
    ProfileMethods.fetch('/auth/user', 'put', updateData);
	},

	profileEdit: function(edit) {
		return edit ? 
      <div>
        <button onClick={this.checking}>CLICK ME</button>
        <ProfileHeader 
            edit={this.edit}
		        props={this.state.userData}
		        firstName={this.state.userData.first_name}
		        lastName={this.state.userData.last_name}
		        avatar={this.state.userData.avatar}
		        title={this.state.userData.title} />
        <DevProfileBody />
        <Bio bio={this.state.userData.bio} />
        <Projects />
      </div> 
      :
      <div>
        <ProfileHeaderEdit 
            edit={this.save}
            updateTitle={this.updateTitle}
            updateLocation={this.updateLocation}
		        props={this.state.userData} />
        <DevProfileBodyEdit />
        <BioEdit updateBio={this.updateBio} />
      </div>
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

	updateBio: function(bio) {
		this.setState({
			bio: bio
		});
	},

	render: function() {
		return (
		<div>
      <Header link='/' title='Home' />
			{this.profileEdit(this.state.swap)}
      <Footer />	
		</div>
		)
	}
});