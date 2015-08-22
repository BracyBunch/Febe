var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var AppBar = mui.AppBar;
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var injectTapEventPlugin = require('react-tap-event-plugin');
var Router = require('react-router');
var Link = Router.Link;
var State = Router.State;
var SigninModal = require('../homepage/signinModal');

injectTapEventPlugin();

var Header = React.createClass({
  mixins: [State],
  showMenu: function(){
    this.refs.leftNav.toggle();
  },
  onChange: function(event, index, item) {
    this.context.router.transitionTo(item.route);
  },
  generateMenu: function(){
    return window.localStorage.getItem('userId') ? [
        { route: '/', text: 'Home'},
        { route: '/dashboard', text: 'Dashboard'},
        { route: '/browse', text: 'Browse'},
        { route: '/profile', text: 'My Profile'},
        { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
        { route: '/', text: 'About'},
        { route: '/', text: 'Team'},
        { type: MenuItem.Types.LINK, payload: 'https://github.com/BracyBunch/Febe', text: 'GitHub' }
       ]
      : [
        { route: '/', text: 'Home'},
        { route: 'browse', text: 'Browse'},
        { type: MenuItem.Types.SUBHEADER, text: 'Resources'},
        { route: '/', text: 'About'},
        { route: '/', text: 'Team'},
        { type: MenuItem.Types.LINK, payload: 'https://github.com/BracyBunch/Febe', text: 'GitHub'}
      ];
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
          iconElementRight={<SigninModal />} />
      </div>
    );
  }
});

module.exports = Header;
