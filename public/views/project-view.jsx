var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions');
var ProjectStore = require('../stores/project-store');
// material ui
var mui = require('material-ui');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var muiLightTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
// var ThemeManager = new mui.Styles.ThemeManager();
var Paper = mui.Paper;
var RaisedButton = mui.RaisedButton;
var Snackbar = mui.Snackbar;

var Router = require('react-router');
var Navigation = require('react-router').Navigation;
var history = require('../utils/history');
var Link = Router.Link;
// shared components
var Footer = require('../components/shared/footer');
var Participant = require('../components/profile/participant')
var Timeline = require('../components/project/project-timeline')
var Description = require('../components/project/project-description')
var MemberThumbnails = require('../components/shared/member-thumbnails');
var Contributors = require('../components/project/project-contrib')
var ProjectMethods = require('../components/project/sharedProjectMethods/')
var ProjectEdit = require('../components/project/edit-components/project-body-edit')
var ProjectTags = require('../components/project/project-tags')


module.exports = React.createClass({
  mixins: [Reflux.listenTo(ProjectStore, 'onChange'), Navigation],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(muiLightTheme)
    };
  },

  getInitialState: function(){
    return {
      title: 'Project Title',
      location: 'Project Location',
      description: 'Project info',
      tags: [],
      members: [],
      startDate: 'START DATE',
      endDate: 'END DATE',
      managerData: [],
      orgData: [],
      orgName: '',
      repData: [],
      devData: [],
      orgID: null,
      swap: false,
    };
  },

  componentWillMount: function(){
    Actions.getProject(this.props.params.id);
  },

  onChange: function(event, data){
    this.setState({
      title: data.name,
      location: data.organization.location,
      description: data.description,
      startDate: data.created,
      endDate: data.complete_by,
      ownerFirst: data.owner.first_name,
      ownerLast: data.owner.last_name,
      repData: data.owner,
      orgData: data.organization,
      orgName: data.organization.name,
      orgID: data.organization.id,
      tags: data.skills,
      members: data.members
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
      description: this.state.description,
    };
    ProjectMethods.updateProject('/project', updateData);
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

  updateDescription: function(description) {
    this.setState({
      description: description
    });
  },

  updateTechnology: function(technology) {
    this.setState({
      technology: technology
    });
  },

  updateMedia: function(media) {
    this.setState({
      media: media
    });
  },

  goToOrg: function(orgID){
    // history.pushState('/organization/' + orgID)
    this.transitionTo('/organization/' + orgID);
  },

  projectEdit: function(edit) {
    return edit ? 
      <div>
        <Timeline time={this.state.endDate} />
        <Description desc={this.state.description} />
        <ProjectTags tags={this.state.technology} />
        <ProjectMedia />
      </div>
      :
      <div>
        <ProfileHeaderEdit 
            edit={this.save}
            firstName={this.state.userData.first_name}
            lastName={this.state.userData.last_name}
            updateTitle={this.updateTitle}
            updateLocation={this.updateLocation} />
        <BioEdit updateBio={this.updateBio} />
      </div>
  },

  snackbarShow: function() {
    this.refs.snackbar.show();
  },

  render: function(){
    return (
      <div>
        <div className="container profileMargin containerWidth">
          <Paper zDepth={1} style={{"width":"100%"}}>
            <div className="center-form">
              <h3>{this.state.title}</h3>

              <div>
                <Participant 
                  firstName={this.state.ownerFirst}
                  lastName={this.state.ownerLast}
                  title={this.state.orgName} 
                  location={this.state.location} 
                  avatar={this.state.repData.avatar}
                  type={'Project Manager'} 
                  interested={this.snackbarShow}
                  projectid={this.props.params.id} />
              </div>
              <div className="projectOrgBtn">
                <RaisedButton
                  label={this.state.orgData.name}
                  onClick={this.goToOrg.bind(this, this.state.orgID)}/>
              </div>
            </div>

            <div className='timeline-proj'>
              <Timeline 
                start={this.state.startDate}
                end={this.state.endDate} />
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className='proj-desc'>
                  <Description desc={this.state.description} />
                </div>    
              </div>
            </div>

            <div className="row technologies">
              <div className="col-md-12 proj-desc">
                <ProjectTags 
                  title="Technologies Needed"
                  tags={this.state.tags} />
              </div>
            </div>

            <div className="row contributors">
              <div className="col-md-10">
                <h4>Contributors</h4>
                <MemberThumbnails members={this.state.members} />
              </div>
            </div>
          </Paper>

          <Snackbar 
            ref="snackbar"
            message="Message Sent to Project Manager!"
            autoHideDuration={1500}
            style={{"backgroundColor": "#6E7FD5", "textAlign": "center", "color":"white", "opacity": "0.9"}} />
          <Footer />
        </div>
      </div>
    )
  },
});