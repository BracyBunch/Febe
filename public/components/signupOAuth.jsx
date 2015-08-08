var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

// need form validation
module.exports = React.createClass({
	render: function() {
    return (
	    <div className="signupForm">
	      <form className="form-inline">
		      Developer Signup <br />
		      <Link to="#">
		        <img className="oauthPic img-rounded" src="assets/img/linkedinAuth.png" />
		      </Link>
		      <Link to="#">
		        <img className="oauthPic img-rounded" src="assets/img/githubAuth.png" />
		      </Link>
		      <Link to="#">
		        <img className="oauthPic img-rounded" src="assets/img/facebookAuth.png" />
		      </Link> <br />
		      Or <br />
		      <input type="text" value="" placeholder="First Name" className="form-control formbox" />
		      <input type="text" value="" placeholder="Last Name" className="form-control formbox" /> <br />
		      <input type="text" value="" placeholder="Email Address" className="form-control formbox" /> <br />
		      <input type="text" value="" placeholder="Password" className="form-control formbox" />
		      <input type="text" value="" placeholder="Confirm Password" className="form-control formbox" /> <br />
		      Password must be more than 8 characters
		    </form>  
	    </div>
	  )
	}
});