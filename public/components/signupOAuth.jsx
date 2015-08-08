var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


module.export = React.createClass({
	render: function() {
    return <div>
      Developer Signup
      <Link to="#">
        <img src="assets/img/linkedinAuth.png" />
      </Link>
      <Link to="#">
        <img src="assets/img/githubAuth.png" />
      </Link>
      <Link to="#">
        <img src="assets/img/facebookAuth.png" />
      </Link>
      Or
      
    </div>
	}
});