var React = require('react');
var Navigation = require('react-router').Navigation;
var history = require('../../utils/history')
var ajax = require('../../utils/fetch');
var mui = require('material-ui');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var muiLightTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
// var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('../../material-ui/colors');
var FlatButton = mui.FlatButton;

module.exports = React.createClass({
  mixins: [Navigation],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(muiLightTheme)
    }
  },
  loginButton: function() {
    return window.localStorage.getItem('userId') ?
      <FlatButton className="navbar-btn" onClick={this.switchLog} label="Log Out" />
      : <FlatButton className="navbar-btn" onClick={this.props.open} label="Log In" />
  },
  switchLog: function() {
    window.localStorage.removeItem('userId');
    ajax('/auth/logout');
    // do a get request with get profile and that as URL /auth/logout
    history.pushState({}, '/');
    // this.transitionTo('/');
  },
  render: function(){
    return (
      <div>
        {this.loginButton()}
      </div>
    );
  }
});
