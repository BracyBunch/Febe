var React = require('react');
var Reflux = require('reflux');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var Router = require('react-router');
var Actions = require('../actions');
var Link = Router.Link;
var Participant = require('../components/profile/participant')
var Timeline = require('../components/project/project-timeline')
var Description = require('../components/project/project-description')
var ProjectTags = require('../components/project/project-tags')
var Contributors = require('../components/project/project-contrib')
var ProjectMedia = require('../components/project/project-media')
var ProjectMethods = require('../components/project/sharedProjectMethods/')
var ProjectEdit = require('../components/project/edit-components/project-body-edit')
var ProjectStore = require('../stores/project-store');
var Organization = require('../components/organization/org-description');


module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ProjectStore, 'onChange')
  ],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  generateMenu: [
    { 
      type: MenuItem.Types.LINK, 
      payload: '/', 
      text: 'Home'
    },
    {
      type: MenuItem.Types.LINK, 
      payload: '#/dashboard', 
      text: 'Dashboard'
    },
    {
      type: MenuItem.Types.LINK, 
      payload: '#/browse', 
      text: 'Browse'
    },
    {
      type: MenuItem.Types.LINK, 
      payload: '#/devprofile', 
      text: 'My Profile'
    },
    { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
    { route: '/', text: 'About' },
    { route: '/', text: 'Team' },
    { 
      type: MenuItem.Types.LINK, 
      payload: 'https://github.com/BracyBunch/Febe', 
      text: 'GitHub' 
    }
  ],
  getChildContext: function(){ 
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState: function(){
    return {
      title: 'Project Title',
      location: 'Project Location',
      description: 'Project info',
      technology: ['javascript', 'angular', 'bootstrap', 'html'],
      contributors: ['john', 'bob', 'joe', 'sally'],
      startDate: 'START DATE',
      endDate: 'END DATE',
      managerData: [],
      orgData: [],
      orgName: '',
      repData: [],
      devData: [],
      swap: false,
    };
  },

  componentWillMount: function(){
    Actions.getProject(sessionStorage.getItem('projectId'));
  },

  onChange: function(event, data){
    console.log("data: ", data)
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
      orgName: data.organization.name
    });
  },

  edit: function() {
    console.log('rep', this.state.repData, 'org', this.state.orgData)
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

  updateContributors: function(contributors) {
    this.setState({
      contributors: contributors
    });
  },

  updateMedia: function(media) {
    this.setState({
      media: media
    });
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

  render: function(){
    return (
      <div>
        <Header generateMenu = {this.generateMenu}/>
        <div>
          <h3> {this.state.title} </h3> 
          <button className='btn btn-warning edit-follow' onClick={this.edit}> Edit/Follow </button>
        </div>
          <Participant 
            firstName={this.state.repData.first_name}
            lastName={this.state.repData.last_name}
            title={this.state.orgData.name} 
            location={this.state.repData.location} 
            type={'Non-Profit Representative'}/>
          <Participant 
            firstName={this.state.ownerFirst}
            lastName={this.state.ownerLast}
            title={this.state.orgName} 
            location={this.state.location} 
            type={'Project Manager'}/>
        <div className='org-desc'>
          <Organization 
          name={this.state.orgData.name} 
          location={this.state.orgData.location}
          website={this.state.orgData.website_url}
          ein={this.state.orgData.ein} />
        </div>
          <button className='btn btn-warning' onClick={this.goToOrg}> Organization Link </button>
          <Timeline 
            start={this.state.startDate}
            end={this.state.endDate} />
          <Description desc={this.state.description} />
          <ProjectTags tags={this.state.technology} />
          <ProjectMedia />
        <Footer />
      </div>
    )
  },
});