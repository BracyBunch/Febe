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
      // <div className="roundedButton">Log Out</div> 
      // :<div className="roundedButton navbar-btn">Log In</div>  
      <RaisedButton className="navbar-btn" onClick={this.switchLog} label="Log Out" />
      : <RaisedButton className="navbar-btn" onClick={this.props.open} label="Log In" />
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
