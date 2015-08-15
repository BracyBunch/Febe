var React = require('react');
var Navigation = require('react-router').Navigation;
var ajax = require('../../utils/fetch');

module.exports = React.createClass({
  mixins: [Navigation],
  loginButton: function() {
    return window.localStorage.getItem('userId') ?
      <button className="btn navbar-btn btn-success" onClick={this.switchLog}>Logout</button> :
      <button className="btn navbar-btn btn-success" onClick={this.props.open}>Login</button>;
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
