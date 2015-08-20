var React = require('react');
var Reflux = require('reflux');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var ProfileHeader = require('../components/profile/profile-header');
var NPProfileBody = require('../components/profile/np-profile-body');
var Bio = require('../components/profile/profile-bio');
var Projects = require('../components/profile/profile-projects');
var ProfileStore = require('../stores/profile-store');
var Actions = require('../actions');
var Link = require('react-router').Link;
var ProfileHeaderEdit = require('../components/profile/edit-components/profile-header-edit');
var NPProfileBodyEdit = require('../components/profile/edit-components/np-profile-body-edit');
var BioEdit = require('../components/profile/edit-components/profile-bio-edit');
var OrgLink = require('../components/profile/org-link');
var ProfileMethods = require('../components/profile/sharedProfileMethods');

module.exports = React.createClass({
	mixins:[
		Reflux.listenTo(ProfileStore, 'onChange')
	],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){ 
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
	getInitialState: function(){
		return {
			title: 'Please enter your title & company',
			location: 'Please enter your location',
			bio: 'Tell us about yourself...',
			links: [],
			userData: [],
			swap: true,
			hasOrg: false
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
    console.log(this.state.bio)
    // ProfileMethods.updateProfile('/user', 'put', updateData);
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

	joinOrg: function() {
		// We need to ask to either join or create an org
		console.log("joined org")
	},

	createOrg: function() {
		// We need to ask to either join or create an org
		console.log("created org")
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
		    <OrgLink joinOrg={this.joinOrg} createOrg={this.createOrg} hasOrg={this.state.hasOrg} />
        <NPProfileBody />
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
        <NPProfileBodyEdit />
        <BioEdit updateBio={this.updateBio} />
      </div>
	},
  generateMenu: [
    { type: MenuItem.Types.LINK, payload: '/', text: 'Home'},
    { type: MenuItem.Types.LINK, payload: '#/dashboard', text: 'Dashboard'},
    { type: MenuItem.Types.LINK, payload: '#/browse', text: 'Browse'},
    { type: MenuItem.Types.LINK, payload: '#/devprofile', text: 'My Profile'},
    { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
    { route: '/', text: 'About'},
    { route: '/', text: 'Team'},
    { type: MenuItem.Types.LINK, payload: 'https://github.com/BracyBunch/Febe', text: 'GitHub' }
  ],
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
