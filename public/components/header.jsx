var React = require('react');
var Router = require('react-router');
//renderable component
var Link = Router.Link;

module.exports = React.createClass({
  render: function(){
    return <nav className="navbar navbar-default header">
      <div className= "container-fluid">
        <Link to="/" className="navbar-brand">About</Link>
        <Link to="/" className="navbar-brand">Browse</Link>
        <Link to="/" className="navbar-brand">Team</Link>
        <ul className="nav navbar-nav navbar-right">
          <button className="btn navbar-btn btn-success">Login</button>
        </ul>
      </div>
    </nav>
  }
})