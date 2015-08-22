var React = require('react/addons');
var Navigation = require('react-router').Navigation;
var ValidationMixin = require('react-validation-mixin');
var ajax = require('../utils/fetch');
//react bootstrap
var DropdownButton = require('../components/project/dropdown');
// material ui
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Paper = mui.Paper;
//shared components
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var Methods = require('../sharedMethods');
var DatePicker = require('../components/datepicker/datepicker');
var Autocomplete =require('../components/shared/autocomplete');
var ProjectView = require('./project-view');

module.exports = React.createClass({
  mixins: [ValidationMixin, React.addons.LinkedStateMixin, Navigation],

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
      <div>
        <div className="container profileMargin containerWidth">
          <Paper zDepth={1} style={{"width": "100%"}}>
            <div className="center-form">
              <div>
                <span className="createTitle">
                  <h3>Create a Project</h3>
                </span>
                    <div className="form-group">
                      <input type="text" ref="projectName" className="form-control" placeholder="Project Name" valueLink={this.linkState('projectName')} />
                    </div>
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
                    <textarea className="form-control" rows="4" valueLink={this.linkState('description')}>
                    </textarea>
                  </div>
                  <div>
                    <h5>Technology Needs</h5>
                    <Autocomplete url='/tag/search?fragment=' placeholder='Search for technology'
                    ref='tech' on_change={this.on_autocomplete_change.bind(this, 'tech')}/>
                  </div>
                  <div id="addlLinks">
                    <h5>Additional Links</h5>
                    <input type="url" className="form-control" placeholder="Youtube, Facebook, Additional Media" />
                  </div>
                  <div className="orgButton">

                    <div>
                      <button
                        className="btn signupBtn profileMargin"
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
              </div>
            </div>
          </Paper>
        <Footer />
        </div>
      </div>
    );
  }
});
