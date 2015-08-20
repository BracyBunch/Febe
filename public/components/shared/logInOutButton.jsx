var React = require('react');
var Navigation = require('react-router').Navigation;
var ajax = require('../../utils/fetch');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('../../material-ui/colors');
var RaisedButton = mui.RaisedButton;

module.exports = React.createClass({
  mixins: [Navigation],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },
  loginButton: function() {
    return window.localStorage.getItem('userId') ?
      <RaisedButton className="navbar-btn" onClick={this.switchLog} label="Sign Out" />
      : <RaisedButton className="navbar-btn" onClick={this.props.open} label="Sign In" />
  },
  switchLog: function() {
    window.localStorage.removeItem('userId');
    ajax('/auth/logout');
    // do a get request with get profile and that as URL /auth/logout
    this.transitionTo('/');
  },
  render: function(){
    return (
      <div>
        {this.loginButton()}
      </div>
    );
  }
});
