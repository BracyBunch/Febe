var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


module.exports = React.createClass({
	render: function() {
    return (
	    <div className="signupForm">
	      <form>
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
		      <input type="text" value="" placeholder="First Name"/>
		      <input type="text" value="" placeholder="Last Name"/> <br />
		      <input type="text" value="" placeholder="Email Address" className="form-control"/> <br />
		      <input type="text" value="" placeholder="Password"/>
		      <input type="text" value="" placeholder="Confirm Password"/>
		    </form>  
	    </div>
	  )
	}
});