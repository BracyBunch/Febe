var React = require('react');
var Reflux = require('reflux');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Paper = mui.Paper;
var RaisedButton = mui.RaisedButton;
var Footer = require('../components/shared/footer');
var ProfileHeader = require('../components/profile/profile-header');
var Projects = require('../components/profile/profile-projects');
var ProfileStore = require('../stores/profile-store');
var Actions = require('../actions');
var ProfileHeaderEdit = require('../components/profile/edit-components/profile-header-edit');
var ProfileMethods = require('../components/profile/sharedProfileMethods');
var Autocomplete =require('../components/shared/autocomplete');
var TimelineEntry = require('../components/dashboard/timelineEntry');
var TimelineStore = require('../stores/timeline-store');

var ProfileView = React.createClass({
  mixins: [
    Reflux.listenTo(ProfileStore, 'onChange'),
    Reflux.listenTo(TimelineStore, 'onLoad')
  ],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState: function() {
    return {
      first_name: '',
      last_name: '',
      title: '',
      location: '',
      bio: null,
      links: [],
      strengths: [],
      interests: [],
      userData: {},
      editing: false,
      hasOrg: false,
      projects: [],
      organization: '',
      'timeline': []
    };
  },
  componentWillMount: function() {
    Actions.getProfile(window.localStorage.getItem('userId'));
    Actions.getTimeline();
  },
  onLoad: function(event, timeline) {
    this.setState({'timeline': timeline});
  },
  onChange: function(event, userData) {
    this.setState({
      kind: userData.kind,
      first_name: userData.first_name,
      last_name: userData.last_name,
      title: userData.title,
      location: userData.location,
      bio: userData.bio,
      links: userData.links,
      strengths: userData.strengths,
      interests: userData.interests,
      organization: userData.organization,
      projects: userData.projects
    });
  },

  edit_toggle: function() {
    this.setState({
      editing: !this.state.editing
    });
  },
  save: function() {
    var updateData = {
      title: this.state.title,
      location: this.state.location,
      bio: this.state.bio,
      links: this.state.links
    };
    if (this.state.kind === 'dev') {
      updateData.strengths = Object.keys(this.refs.strengths.get_selections());
      updateData.interests = Object.keys(this.refs.interests.get_selections());
      this.setState({
        'strengths': this.refs.strengths.get_selections_array(),
        'interests': this.refs.interests.get_selections_array()
      });
    }
    this.edit_toggle();
    ProfileMethods.updateProfile('/user', updateData);
  },

  updateHeader: function(state) {
    this.setState(state);
  },

  updateLinks: function(link) {
    var links = this.state.links.slice();
    links.push(link);
    this.setState({
      links: links
    });
  },

  updateBio: function(event) {
    this.setState({'bio': event.target.value});
  },

  strengthsList: function() {
    return this.state.strengths.map(function(strength) {
      return <h4 key={strength.id} className="label-inline"> <span className="label label-color">{strength.name}</span> </h4>;
    });
  },

  interestsList: function() {
    return this.state.interests.map(function(interest) {
      return <h4 key={interest.id} className="label-inline"> <span className="label label-color">{interest.name}</span> </h4>;
    });
  },

  devFields: function() {
    if (this.state.kind !== 'dev') return '';
    return (
      <div className="row">
        <div className="dev-fields">
          <div>
            <h3>Tech Strengths</h3>
            {(function() {
              if (this.state.editing) {
                return <Autocomplete url='/tag/search?fragment=' placeholder='Search for strengths' values={this.state.strengths} ref='strengths'/>;
              } else {
                return this.strengthsList();
              }
            }.bind(this))()}
          </div>
          <div>
            <h3>Interests</h3>
            {(function() {
              if (this.state.editing) {
                return <Autocomplete url='/tag/search?kind=cause&fragment=' placeholder='Search for causes' min_chars={0} values={this.state.interests} ref='interests'/>;
              } else {
                return this.interestsList();
              }
            }.bind(this))()}
          </div>
        </div>
      </div>
    );
  },
  setBio: function(){
    return this.state.bio ? this.state.bio : 'Tell us about yourself...just hit the edit button'
  },
  createOrgURL: function(){
    console.log(this.state.timeline)
    return '#/organization/:' + this.state.organization.id
  },
  repButtons: function(){
    if (this.state.kind !== 'rep') return '';
    return (
      this.state.organization.id ? 
        <RaisedButton linkButton={true} href={this.createOrgURL()} secondary={true} label={this.state.organization.name}/> :
        <div>
          <span className="createorg-button">
            <RaisedButton linkButton={true} href="#/createorg" secondary={true} label="Create Organization"/>
          </span>
          <span>
            <RaisedButton linkButton={true} href="#/createorg" secondary={true} label="Join an Organization"/>
          </span>
        </div>
    )
  },
  profile: function() {
    if (this.state.editing) {
      return (
        <div className="container profileMargin">
        <Paper zDepth={1}>
          <div className="row">
            <div className="col-md-8 col-md-offset-1 profileBox">
              <ProfileHeaderEdit
                  save={this.save}
                  onChange={this.updateHeader}
                  first_name={this.state.first_name}
                  last_name={this.state.last_name}
                  avatar={this.state.userData.avatar}
                  title={this.state.title}
                  location={this.state.location}
                  links={this.state.links} />
            </div>
          </div>
          {this.devFields()}
          <div className="row">
            <div className="col-md-8 col-md-offset-1">
              <div>
                <h3>Bio</h3>
                <textarea
                  value={this.state.bio}
                  onChange={this.updateBio}
                  placeholder="Tell us about yourself..."
                  className="form-control bio"
                  rows="4"
                  cols="200"
                  style={{'marginBottom': '20px'}}
                  ></textarea>
              </div>
            </div>
          </div>
        </Paper>
        </div>
      );
    } else {
      return (
        <div className="profileMargin">
          <Paper style={{'maxWidth': '100%'}} zDepth={1}>
            <div className="all-of-them">
              <div className="profile-info">
                <div className="profileBox">
                  <ProfileHeader
                      edit_toggle={this.edit_toggle}
                      first_name={this.state.first_name}
                      last_name={this.state.last_name}
                      avatar={this.state.userData.avatar}
                      title={this.state.title}
                      location={this.state.location}
                      links={this.state.links} />
                </div>
                <div className="rest-of-profile">
                {this.devFields()}
                </div>
                <div className="rest-of-profile">
                  <div className="">
                    <div>
                      {this.repButtons()}
                    </div>
                    <div>
                      <h3>Bio</h3>
                      <div>{this.setBio()}</div>
                    </div>
                  </div>
                </div>
                <div className="projects-in-profile">
                  <Projects />
                </div>  
              </div>  
              <div className="timeline-container">
                <h3>Timeline</h3>
                <div className="each-card">
                  {this.state.timeline.map(function(entry) {
                    return <TimelineEntry key={entry.entry.id} entry={entry}/>;
                  }.bind(this))}
                </div>
              </div>
            </div>
          </Paper>
        </div>
      );
    }
  },
  render: function() {
    return (
      <div>
        {this.profile()}
        <Footer />
      </div>
    );
  }
});

module.exports = ProfileView;
