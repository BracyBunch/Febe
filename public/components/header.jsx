var React = require('react');
var Router = require('react-router');
//renderable component
var Link = Router.Link;
var Modal = require('./signInModal');

module.exports = React.createClass({
  render: function(){
    return (
      <div className="header">
        <nav className="navbar navbar-default">
          <div className= "container-fluid">
            <Link to={this.props.link} className="navbar-brand">{this.props.title}</Link>
            <Link to={this.props.link2} className="navbar-brand">{this.props.title2}</Link>
            <Link to={this.props.link3} className="navbar-brand">{this.props.title3}</Link>
            <ul className="nav navbar-nav navbar-right">
              <button className="btn navbar-btn btn-success" id="login">Login</button>
            </ul>
          </div>
        </nav>
      </div>
    )
  },
})