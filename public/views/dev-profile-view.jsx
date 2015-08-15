var React = require('react');
var Reflux = require('reflux');
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var ProfileHeader = require('../components/profile/profile-header');
var Bio = require('../components/profile/profile-bio');
var Projects = require('../components/profile/profile-projects');
var ProfileStore = require('../stores/profile-store');
var Actions = require('../actions');

var ProfileHeaderEdit = require('../components/profile/edit-components/profile-header-edit');
var BioEdit = require('../components/profile/edit-components/profile-bio-edit');

var ProfileMethods = require('../components/profile/sharedProfileMethods');
var Autocomplete =require('../components/shared/autocomplete');

module.exports = React.createClass({
	mixins: [
		Reflux.listenTo(ProfileStore, 'onChange')
	],
	getInitialState: function(){
		return {
			title: '',
			location: '',
			bio: '',
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
    this.setState({
      title: userData.title,
      location: userData.location,
      bio: userData.bio,
      links: userData.links,
      strengths: userData.strengths,
      interests: userData.interests
    });
	},

	edit: function() {
    this.setState({
    	swap: !this.state.swap
    });
	},

	save: function() {
    var updateData = {
      title: this.state.title,
      location: this.state.location,
      bio: this.state.bio,
      strengths: Object.keys(this.refs.strengths.get_selections()),
      interests: Object.keys(this.refs.interests.get_selections())
    };
    this.setState({'strengths': this.refs.strengths.get_selections_array(), 'interests': this.refs.interests.get_selections_array()}, this.edit);
    ProfileMethods.updateProfile('/user', updateData);
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

  strengthsList: function() {
    return this.state.strengths.map(function(strength) {
      return <span className="label label-primary">{strength.name}</span>;
    });
  },

  interestsList: function() {
    return this.state.interests.map(function(interest) {
      return <span className="label label-primary">{interest.name}</span>;
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
        <div className="">
          <div>
            <h3>Tech Strengths</h3>
            {this.strengthsList()}
          </div>
          <div>
            <h3>Interests</h3>
            {this.interestsList()}
          </div>
        </div>
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
        <div className="">
          <div id='addlStrengths'>
            <h3>Tech Strengths</h3>
            <Autocomplete url='/tag/search?fragment=' placeholder='Search for strengths' values={this.state.strengths} ref='strengths'/>
          </div>
          <div id='addlInterests'>
            <h3>Interests</h3>
            <Autocomplete url='/tag/search?kind=cause&fragment=' placeholder='Search for causes' values={this.state.interests} ref='interests'/>
          </div>
        </div>
        <BioEdit updateBio={this.updateBio} />
      </div>
	},

	render: function() {
		return (
		<div>
      <Header link='/dashboard' title='Dashboard' />
			{this.profileEdit(this.state.swap)}
			<button type="submit" onClick={this.checking} className="btn signupBtn text-center">Create Project</button>
      <Footer />	
		</div>
		)
	}
});
