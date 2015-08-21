var React = require('react/addons');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var Navigation = require('react-router').Navigation;
var ValidationMixin = require('react-validation-mixin');
var DropdownButton = require('../components/project/dropdown');
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var Methods = require('../sharedMethods');
var DatePicker = require('../components/datepicker/datepicker');
var Autocomplete =require('../components/shared/autocomplete');
var ProjectView = require('./project-view');
var ajax = require('../utils/fetch');

module.exports = React.createClass({
  mixins: [ValidationMixin, React.addons.LinkedStateMixin, Navigation],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){ 
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  generateMenu: [
    { type: MenuItem.Types.LINK, payload: '/', text: 'Home'},
    { type: MenuItem.Types.LINK, payload: '#/dashboard', text: 'Dashboard'},
    { type: MenuItem.Types.LINK, payload: '#/browse', text: 'Browse'},
    { type: MenuItem.Types.LINK, payload: '#/devprofile', text: 'My Profile'},
    { type: MenuItem.Types.SUBHEADER, text: 'Resources'},
    { route: '/', text: 'About'},
    { route: '/', text: 'Team'},
    { type: MenuItem.Types.LINK, payload: 'https://github.com/BracyBunch/Febe', text: 'GitHub'}
  ],
  getInitialState: function() {
    return {
      projectName: '',
      representative: 'Point Person',
      projectManager: 'Bobby the PM',
      completionDate: '',
      description: '',
      tech: [],
      organization: {},
      links: [],
      terms: false
    };
  },

  newLink: '<input type="url" class="form-control" placeholder="Additional Link" />',

  setTerms: function(){
    this.setState({
      terms: !this.state.terms
    });
  },

  createProject: function() {
    if (this.state.terms) {
      ajax('/project', {'method': 'POST', 'body': JSON.stringify({
        'name': this.state.projectName,
        'description': this.state.description,
        'complete_by': this.state.completionDate,
        'tech': this.state.tech.map(function(tech) {return tech.id;}),
        'organization_id': this.state.organization.id
      })}).then(function(res) {
        return res.json();
      }).then(function(data) {
        // i need to pass this to /project/ view
        sessionStorage.setItem('projectId', data.id);
        this.transitionTo('/project/' + data.id);
      }.bind(this));
    }
  },

  select: function(item) {
    this.setState({
      representative: item
    });
  },
  setDate: function(date) {
    this.setState({completionDate: date});
  },
  on_autocomplete_change: function(field) {
    var values = {};
    values[field] = this.refs[field].get_selections_array();
    this.setState(values);
  },
  render: function() {
    return (
      <div className="fullscreen">
        <Header color={{"background-color":"#6E7FD5"}} generateMenu = {this.generateMenu}/>
        <div className="">
          <h3>Create a Project</h3>
          <form className="form-inline">
            <div className="form-group">
              <h5>Project Name</h5>
              <input type="text" ref="projectName" className="form-control projectName" valueLink={this.linkState('projectName')} />
            </div>
          </form>
          <div>
            <Autocomplete url='/organization/search?fragment=' placeholder='Search for an organization'
             min_chars={2} multi={false} ref='organization' on_change={this.on_autocomplete_change.bind(this, 'organization')}/>
          </div>
          <div>
            <h5>Preferred Completion Date</h5>
            <DatePicker onChange={this.setDate} />
          </div>
          <div>
            <h5>Project Description</h5>
            <textarea className="form-group" rows="4" cols="100" valueLink={this.linkState('description')}>
            </textarea>
          </div>
          <div>
            <h5>Technology Needs</h5>
            <Autocomplete url='/tag/search?fragment=' placeholder='Search for technology'
            ref='tech' on_change={this.on_autocomplete_change.bind(this, 'tech')}/>
          </div>
          <div id="addlLinks">
            <h5>Additional Links</h5>
            <input type="url" className="form-control" placeholder="YouTube" />
          </div>
          <div>
            <button
              className="btn signupBtn"
              onClick={Methods.addFields.bind(this, 'addlLinks', this.newLink)}>Add +</button> <br />
          </div>
          <div>
            <input type="checkbox" value="termsAgreed" onChange={this.setTerms} className="checkbox-inline"> I agree to the terms</input>
          </div>
          <div>
            <button type="submit"
              className="btn signupBtn text-center"
              onClick={this.createProject}>Create</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
});
