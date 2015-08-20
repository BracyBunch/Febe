var React = require('react');
var Reflux = require('reflux');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var Oauth = require('../components/signup/signupOAuth');
var Main = require('../components/signup/signupMain');
var Header = require('../components/shared/header');
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
  getChildContext: function(){ 
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  generateMenu: [
      { type: MenuItem.Types.LINK, payload: '/', text: 'Home'},
      { type: MenuItem.Types.LINK, payload: '/', text: 'Browse'},
      { type: MenuItem.Types.SUBHEADER, text: 'Resources'},
      { route: '/', text: 'About'},
      { route: '/', text: 'Team'},
      { type: MenuItem.Types.LINK, payload: 'https://github.com/BracyBunch/Febe', text: 'GitHub'}
  ],
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
        <Header generateMenu = {this.generateMenu} />
        <Oauth type={this.props.route.kind} signup="true" name={this.state.name} />
        <Main type={this.props.route.kind} url="/auth/signup" newID={this.getID} />
        <Footer />
      </div>
    );
  }
});
