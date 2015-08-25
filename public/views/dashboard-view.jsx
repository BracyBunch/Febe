var React = require('react');
var Reflux = require('reflux');
var Footer = require('../components/shared/footer');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <Link to="/profile"><button className="btn btn-primary">Profile</button></Link>
        <Link to="/createproject"><button className="btn btn-primary">Create Project</button></Link>
        <Link to="/createorg"><button className="btn btn-primary">Create Organization</button></Link>
        <Footer />
      </div>
    );
  }
});
