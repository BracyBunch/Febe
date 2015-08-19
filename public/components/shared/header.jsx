var React = require('react');
var mui = require('material-ui');
var AppBar = mui.AppBar;
var Checkbox = mui.Checkbox;
var FlatButton = mui.FlatButton;
var IconButton = mui.IconButton;
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var Router = require('react-router');
var SigninModal = require('../homepage/signinModal');
var Link = Router.Link;
var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

module.exports = React.createClass({ 
  getInitialState: function() {
    return { 
      menuItems: [
        {
           type: MenuItem.Types.LINK, 
           payload: '/', 
           text: 'Home'
        },
        {
           type: MenuItem.Types.LINK, 
           payload: '/', 
           text: 'Browse'
        },
        {
           type: MenuItem.Types.LINK, 
           payload: 'devprofile', 
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
      ]
    };
  },
  showMenu: function(){
    console.log("testing");
    this.refs.leftNav.toggle()
  },
  render: function() {
    return (
      <div>
        <LeftNav ref='leftNav' menuItems={this.state.menuItems} docked={false} />
        <AppBar
          showMenuIconButton={true}
          onLeftIconButtonTouchTap={this.showMenu}
          style={{"background-color": "rgba(0,0,255,0.2)"}}
          title="Good In This World"
          iconElementRight={<SigninModal />}  
        />
      </div>
    );
  }
});
