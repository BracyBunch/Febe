var React = require('react');
var mui = require('material-ui');
var injectTapEventPlugin = require("react-tap-event-plugin");
var AppBar = mui.AppBar;
var LeftNav = mui.LeftNav;
var Router = require('react-router');
var Link = Router.Link;
var SigninModal = require('../homepage/signinModal');

injectTapEventPlugin();

module.exports = React.createClass({ 
  getInitialState: function() {
    return { 
      menuItems: this.props.generateMenu
    };
  },
  showMenu: function(){
    this.refs.leftNav.toggle()
  },
  render: function() {
    return (
      <div>
        <LeftNav ref='leftNav' menuItems={this.state.menuItems} docked={false} />
        <AppBar
          showMenuIconButton={true}
          onLeftIconButtonTouchTap={this.showMenu}
          style={{"backgroundColor": "rgba(0,0,255,0.2)"}}
          title="Good In This World"
          iconElementRight={<SigninModal />} />
      </div>
    );
  }
});
