var React = require('react');
var Reflux = require('reflux');
var mui = require('material-ui');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var muiLightTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
// var ThemeManager = new mui.Styles.ThemeManager();
var Paper = mui.Paper;
var Oauth = require('../components/signup/signupOAuth');
var Main = require('../components/signup/signupMain');
var Footer = require('../components/shared/footer');
var Actions = require('../actions');
var ProfileStore = require('../stores/profile-store');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ProfileStore, 'onChange')
  ],
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
      userData: [],
      id: '',
      name: (this.props.route.kind === 'dev') ? 'Developer Signup' : 'Nonprofit Representative Signup'
    };
  },
  onChange: function(event, userData) {
    this.setState({userData: userData});
  },
  getID: function(newID) {
    this.setState({
      id: newID
    });
    window.localStorage.setItem('userId', newID);
    this.setProfileStore();
  },
  setProfileStore: function(){
    Actions.getProfile(this.state.id);
  },
  render: function() {
    return (
      <div className="fullscreen">
        <Paper zDepth={1} style={{"margin": "20px auto auto auto", "padding": "20px", "width": "60%"}}>
          <Oauth type={this.props.route.kind} signup="true" name={this.state.name} />
          <Main type={this.props.route.kind} url="/auth/signup" newID={this.getID} />
        </Paper>
        <Footer />
      </div>
    );
  }
});
