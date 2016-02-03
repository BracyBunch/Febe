var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Reflux = require('reflux');
var history = require('../utils/history');
// material ui
var mui = require('material-ui');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var muiLightTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
// var ThemeManager = new mui.Styles.ThemeManager();
var Paper = mui.Paper;
var RaisedButton = mui.RaisedButton;
// router / navigation
var Navigation = require('react-router').Navigation;
var ValidationMixin = require('react-validation-mixin');
// react bootstrap
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;
// shared components
var Footer = require('../components/shared/footer');
var Methods = require('../sharedMethods');
var ImgurUpload = require('../utils/imgur');
var Autocomplete =require('../components/shared/autocomplete');
var ajax = require('../utils/fetch');

module.exports = React.createClass({
  mixins: [ValidationMixin, LinkedStateMixin, Navigation],

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(muiLightTheme)
    };
  },

  getInitialState: function() {
    return {
      ein: '',
      name: '',
      website_url: '',
      logo_url: 'assets/img/defaultlogo.jpg',
      location: '',
      causes: [],
      representatives: [],
      description: ''
    };
  },

  newRepField: '<input type="email" class="form-control" placeholder="Representative\'s Email" />', 

  setTerms: function(){
    this.setState({
      terms: !this.state.terms
    });
  },

  handleImage: function(event) {
    var that = this;
    ImgurUpload.uploadImage(event)
    .then(function(link) {
      that.setState({
        logo_url: link
      })
    });
  },

  on_autocomplete_change: function(selections) {
    this.setState({'causes': Object.keys(selections)});
  },

  createOrg: function() {
    if (this.state.terms) {
      ajax('/organization', {
        method: 'POST',
        body: JSON.stringify(this.state)
      }).then(function(response) {
        return response.json();
      })
      .then(function(data) {
        sessionStorage.setItem('orgId', data.id);
        history.pushState({}, '/organization' + data.id);
        // this.transitionTo('/organization/' + data.id);
      }.bind(this));
    }
  },

  render: function(){
    var repTooltip = <Tooltip>Enter the email address of any additional users you would like to represent your organization.</Tooltip>;

    return (
      <div>
        <div className="container profileMargin containerWidth">
          <Paper zDepth={1} style={{"width": "100%"}}>
            <div className="center-form">
              <div className="row">
                <div className="col-md-8">
                  <h3>Create an Organization</h3>
                  <input
                    type="text"
                    ref="ein"
                    className="form-control form-margin"
                    placeholder="EIN"
                    valueLink={this.linkState('ein')} />
                  <input
                    type="text"
                    ref="name"
                    className="form-control form-margin"
                    placeholder="Organization Name"
                    valueLink={this.linkState('name')} />
                  <input
                    type="url"
                    ref="orgURL"
                    className="form-control form-margin"
                    placeholder="Organization Website"
                    valueLink={this.linkState('website_url')} />
                  <input
                    type="text"
                    ref="location"
                    className="form-control"
                    placeholder="Organization Location"
                    valueLink={this.linkState('location')} />
                </div>
                <span className="col-md-4">
                    <img id="avatar" className="orgPic" src={this.state.logo_url} />
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                      <input type="file" onChange={this.handleImage} />
                    </form>
                </span>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <Autocomplete 
                    className="long-form"
                    url='/tag/search?kind=cause&fragment=' 
                    placeholder='Search for causes'
                    min_chars={0} 
                    ref='causes' 
                    on_change={this.on_autocomplete_change.bind(this)} />
                  <div id="addlReps">
                    <h5 className="headerInline">Additional Representatives </h5>
                    <OverlayTrigger position="top" overlay={repTooltip}>
                      <img className="questionmark" src="assets/img/questionmark.png" />
                    </OverlayTrigger>
                    <input type="url" className="form-control" placeholder="Representative's Email" />
                  </div>
                  <div className="orgButton signupBtn">
                    <RaisedButton
                      label="Add +"
                      onClick={Methods.addFields.bind(this, 'addlReps', this.newRepField)} />
                  </div>
                  <h3>Mission / About</h3>
                  <textarea
                    defaultValue="Tell us about organization and it's mission..."
                    className="form-control"
                    rows="4"
                    cols="200"
                    valueLink={this.linkState('description')}
                    ></textarea>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-margin orgButton">
                    <div>
                      <input
                        type="checkbox"
                        value="termsAgreed"
                        onChange={this.setTerms}
                        className="checkbox-inline"> I agree to the terms</input>
                    </div>
                    <div className="signupBtn">
                      <RaisedButton 
                        label="Create"
                        onClick={this.createOrg} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        </div>
        <Footer />
      </div>
    );
  }
});
