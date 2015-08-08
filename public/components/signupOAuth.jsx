var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


module.export = React.createClass({
	render: function() {
    return <div>
      <form>
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
	      <input type="text" value="" />
	    </form>  
    </div>
	}
});