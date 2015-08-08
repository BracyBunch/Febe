var React = require('react');
var Router = require('react-router');
//renderable component
var Link = Router.Link;

module.exports = React.createClass({
  render: function(){
    return <nav className="navbar navbar-default header">
      <div className= "container-fluid">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <ul className="nav navbar-nav navbar-right">
          <button className="btn btn-success">
            Login
          </button>
        </ul>
      </div>
    </nav>
  },
})