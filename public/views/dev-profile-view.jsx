var React = require('react');
var Reflux = require('reflux');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var Paper = mui.Paper;
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
		// this.setState({userData: userData});
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
    this.setState({
      'strengths': this.refs.strengths.get_selections_array(), 
      'interests': this.refs.interests.get_selections_array()});
    this.edit();
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
    var links = this.state.links.slice();
    links.push(link);
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
      return <span className="label label-color">{strength.name}</span>;
    });
  },

  interestsList: function() {
    return this.state.interests.map(function(interest) {
      return <span className="label label-color">{interest.name}</span>;
    });
  },

	profileEdit: function(edit) {
		return edit ? 
      <div className="container profileMargin">
      <Paper zDepth={4}>
        <div className="row">
          <div className="col-md-8 col-md-offset-1 profileBox">
            <ProfileHeader 
                edit={this.edit}
    		        firstName={this.state.userData.first_name}
    		        lastName={this.state.userData.last_name}
    		        avatar={this.state.userData.avatar}
    		        title={this.state.title}
    		        location={this.state.location}
    		        bio={this.state.bio}
    		        links={this.state.links} />
          </div>
          <div className="row">
            <div className="col-md-8 col-md-offset-1">
              <div>
                <h3>Tech Strengths</h3>
                {this.strengthsList()}
              </div>
              <div>
                <h3>Interests</h3>
                {this.interestsList()}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 col-md-offset-1">
              <Bio bio={this.state.userData.bio} />
              <Projects />
            </div>
          </div>
        </div>
      </Paper>
      </div>
      :
      <div>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <ProfileHeaderEdit 
                edit={this.save}
    		        firstName={this.state.userData.first_name}
    		        lastName={this.state.userData.last_name}
                updateTitle={this.updateTitle}
                updateLocation={this.updateLocation} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <div>
              <h3>Tech Strengths</h3>
              <Autocomplete url='/tag/search?fragment=' placeholder='Search for strengths' values={this.state.strengths} ref='strengths'/>
            </div>
            <div>
              <h3>Interests</h3>
              <Autocomplete url='/tag/search?kind=cause&fragment=' placeholder='Search for causes' values={this.state.interests} ref='interests'/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <BioEdit updateBio={this.updateBio} />
          </div>
        </div>
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
      <Header generateMenu = {this.generateMenu} />
			{this.profileEdit(this.state.swap)}
			<button type="submit" onClick={this.checking} className="btn signupBtn text-center">Create Project</button>
      <Footer />	
		</div>
		)
	}
});
