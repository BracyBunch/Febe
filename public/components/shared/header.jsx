var React = require('react');
var Reflux = require('reflux');
var Actions = require('../../actions');
var jimSquats = require('lodash');
//material ui
var mui = require('material-ui');
var AppBar = mui.AppBar;
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var Snackbar = mui.Snackbar;
// shared components
var ProfileStore = require('../../stores/profile-store');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Router = require('react-router');
var history = require('../../utils/history')
var Link = Router.Link;
var State = Router.State;
var SigninModal = require('../homepage/signinModal');

injectTapEventPlugin();

var Header = React.createClass({
  mixins: [State, Reflux.listenTo(ProfileStore, 'onLoad')],

  getInitialState: function(){
    return {
      profile: {},
    }
  },

  showMenu: function(){
    this.refs.leftNav.toggle();
  },

  onLoad: function(event, profile) {
    this.setState({
      profile: profile,
      orgName: profile.organization.name,
      orgID: profile.organization.id
    });
  },

  componentWillMount: function(){
    Actions.getProfile(window.localStorage.getItem('userId'));
  },

  onChange: function(event, index, item) {
    history.pushState({}, item.route)
  },
  generateMenu: function(){
    var menu = [
        { route: '/', text: 'Home'},
        { route: 'browse', text: 'Browse'},
        { type: MenuItem.Types.SUBHEADER, text: 'Resources'},
        { route: '/', text: 'About'},
        { route: '/', text: 'Team'},
        { type: MenuItem.Types.LINK, payload: 'https://github.com/BracyBunch/Febe', text: 'GitHub'}
      ];
    if (window.localStorage.getItem('userId')){
      if (this.state.profile.kind === 'dev'){
        menu = [
        { route: '/', text: 'Home'},
        { route: '/browse', text: 'Browse'},
        { route: '/profile', text: 'My Profile'},
        { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
        { route: '/', text: 'About'},
        { route: '/', text: 'Team'},
        { type: MenuItem.Types.LINK, payload: 'https://github.com/BracyBunch/Febe', text: 'GitHub' }
       ]} else if (this.state.profile.kind === 'rep'){
            if (!jimSquats.isEmpty(this.state.profile.organization)){
        menu = [
        { route: '/', text: 'Home'},
        { route: '/browse', text: 'Browse'},
        { route: '/profile', text: 'My Profile'},
        { route: '/organization/' + this.state.orgID, text: this.state.orgName},
        { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
        { route: '/', text: 'About'},
        { route: '/', text: 'Team'},
        { type: MenuItem.Types.LINK, payload: 'https://github.com/BracyBunch/Febe', text: 'GitHub' }
       ]
          } else {
        menu = [
        { route: '/', text: 'Home'},
        { route: '/browse', text: 'Browse'},
        { route: '/profile', text: 'My Profile'},
        { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
        { route: '/', text: 'About'},
        { route: '/', text: 'Team'},
        { type: MenuItem.Types.LINK, payload: 'https://github.com/BracyBunch/Febe', text: 'GitHub' }
       ]
          }
        }
       } return menu
  },
  snackbarShow: function() {
    this.refs.snackbar.show();
  },
  render: function() {
    var background = (this.props.location === '/') ? {'backgroundColor': 'rgba(0,0,255,0.2)'} : {'backgroundColor': '#6E7FD5'};
    return (
      <div>
        <LeftNav ref='leftNav' menuItems={this.generateMenu()} docked={false} onChange={this.onChange} />
        <AppBar
          showMenuIconButton={true}
          onLeftIconButtonTouchTap={this.showMenu}
          style={background}
          title="Good In This World"
          iconElementRight={<SigninModal snackbar={this.snackbarShow} />} />
        <Snackbar
          ref="snackbar"
          message={this.props.signinMessage}
          autoHideDuration={2500}
          style={{"backgroundColor": "#6E7FD5", "textAlign": "center", "color":"white", "opacity": "0.9"}}/>
      </div>
    );
  }
});

module.exports = Header;
