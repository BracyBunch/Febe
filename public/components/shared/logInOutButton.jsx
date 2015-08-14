var React = require('react');

module.exports = React.createClass({
  
  loginButton: function(ID){
    return window.localStorage.getItem('userId') ?
      <button className="btn navbar-btn btn-success" onClick={this.switchLog}>Logout</button> :
      <button className="btn navbar-btn btn-success" onClick={this.props.open}>Login</button>; 
  },
  switchLog: function(){
    window.localStorage.removeItem('userId');
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