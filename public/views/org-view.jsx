var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Link = Router.Link;
// material ui
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Paper = mui.Paper;
var RaisedButton = mui.RaisedButton;
// shared components
var Actions = require('../actions');
var OrgStore = require('../stores/org-store');
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var MemberThumbnails = require('../components/shared/member-thumbnails');
var Tags = require('../components/project/project-tags');

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
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialState: function(){
    return {
      orgData: {causes: []},
      ownerData: [],
      projectData: [],
      verified: null,
      editting: false,
      logo: 'assets/img/defaultlogo.jpg'
    };
  },

  componentWillMount: function(){
    Actions.getOrg(this.props.params.id);
  },

  onChange: function(event, data){
    this.setState({
      orgData: data,
      ownerData: data.owner,
      projectData: data.projects,
      verified: data.verified.toString().toUpperCase()
    });
  },

  edit: function() {
    this.setState({
      editting: !this.state.editting
    });
  },

  render: function(){
    return (
      <div>
        <div className="container profileMargin containerWidth">
          <Paper zDepth={1} style={{"width": "100%"}}>
            <div className="center-form">
              <div className="row">
                <div className="col-md-4">
                  <img id="avatar" className="orgPic" src={this.state.orgData.logo_url} />
                </div>
                <div className="col-md-8">
                  <div className="headerProj">
                    <h3>{this.state.orgData.name}</h3>
                    <a href={this.state.orgData.website_url} className="headerIndent">{this.state.orgData.website_url}</a>
                    <div>
                      <p className="headerIndent">{this.state.orgData.location}</p>
                    </div>
                    <div>
                      <MemberThumbnails />
                    </div>
                    <div className="projectBtn">
                      <span className="projectBtn">
                        <RaisedButton label="Edit" onClick={this.edit} />
                      </span>
                      <span className="projectBtn">
                        <Link to="/createproject">
                          <RaisedButton label="Create Project"/>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-10 projectBio">
                  <h3>About Us</h3>
                  <p className="projectBioBorder">{this.state.orgData.description}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-10 projectCauses">
                  <Tags tags={this.state.orgData.causes} title="Causes" />
                </div>
              </div>

              <div className='org-projects'> Projects Belonging To {this.state.orgData.name}:
                <Projects projects={this.state.projectData}/>
              </div>
            </div>
          </Paper>
        </div>
        <Footer />
      </div>
    )
  },
});