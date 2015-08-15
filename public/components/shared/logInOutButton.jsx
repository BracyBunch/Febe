var React = require('react');
var ajax = require('../../utils/fetch')

module.exports = React.createClass({
  loginButton: function(ID){
    return window.localStorage.getItem('userId') ?
      <button className="btn navbar-btn btn-success" onClick={this.switchLog}>Logout</button> :
      <button className="btn navbar-btn btn-success" onClick={this.props.open}>Login</button>; 
  },
  switchLog: function(){
    window.localStorage.removeItem('userId');
    ajax('/auth/logout')
    // do a get request with get profile and that as URL /auth/logout
    this.props.routing()
  },
  render: function(){
    return (
      <div>
        {this.loginButton()}
      </div>
    )
  }
})