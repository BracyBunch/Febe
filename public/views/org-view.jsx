var React = require('react');
var Reflux = require('reflux');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var Router = require('react-router');
var Link = Router.Link;
var Actions = require('../actions');
var OrgStore = require('../stores/org-store');
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var Participant = require('../components/profile/participant')
var Description = require('../components/organization/org-description')
var OrgMedia = require('../components/organization/org-media')
var Projects = require('../components/organization/org-projects')


module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(OrgStore, 'onChange')
  ],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  generateMenu: [
    { type: MenuItem.Types.LINK, payload: '/', text: 'Home'},
    { type: MenuItem.Types.LINK, payload: '#/dashboard', text: 'Dashboard'},
    { type: MenuItem.Types.LINK, payload: '#/browse', text: 'Browse'},
    { type: MenuItem.Types.LINK, payload: '#/devprofile', text: 'My Profile'},
    { type: MenuItem.Types.SUBHEADER, text: 'Resources'},
    { route: '/', text: 'About'},
    { route: '/', text: 'Team'},
    { type: MenuItem.Types.LINK, payload: 'https://github.com/BracyBunch/Febe', text: 'GitHub' }
  ],
  getChildContext: function(){ 
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState: function(){
    return {
      orgData: [],
      ownerData: [],
      projectData: [],
      verified: null,
      swap: false,
      
    };
  },

  componentWillMount: function(){
    Actions.getOrg(sessionStorage.getItem('orgId'));
    // 411
  },

  onChange: function(event, data){
    console.log("Org Data:", data)
    this.setState({
      orgData: data,
      ownerData: data.owner,
      projectData: data.projects,
      verified: data.verified.toString().toUpperCase()
    });
  },
  

  render: function(){
    return (
      <div>
        <Header color={{"background-color":"#6E7FD5"}} generateMenu = {this.generateMenu}/>
        <div>
          <h3> {this.state.orgData.title} </h3> 
          <button className='btn btn-warning edit-follow'> Edit/Follow </button>
        </div>
          <Description 
          name={this.state.orgData.name}
          location={this.state.orgData.location}
          createDate={this.state.orgData.created}
          ein={this.state.orgData.ein}
          owner={this.state.ownerData}
          description={this.state.orgData.description}
          causes={this.state.orgData.causes}
          verified={this.state.verified}
          website={this.state.orgData.website_url} />
          <OrgMedia />
          <div className='org-projects'> Projects Belonging To {this.state.orgData.name}:
          <Projects projects={this.state.projectData}/>
          </div>
        <Footer />
      </div>
    )
  },
});