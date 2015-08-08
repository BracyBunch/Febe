var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

// need form validation
module.exports = React.createClass({
	render: function() {
    return (
	    <div className="col-md-8 col-md-offset-2">
	      <form className="">

	        <div className="">
			      <h3 className="center-text">Developer Signup</h3>
			      <div className="form-group center-block">
				      <Link to="#">
				        <img className="oauthPic img-rounded" src="assets/img/linkedinAuth.png" />
				      </Link>
				      <Link to="#">
				        <img className="oauthPic img-rounded" src="assets/img/githubAuth.png" />
				      </Link>
				      <Link to="#">
				        <img className="oauthPic img-rounded" src="assets/img/facebookAuth.png" />
				      </Link>
				    </div>
			      <h5 className="centerTxt">Or</h5>
			    </div>

		      <div className="form-group">
			      <input type="text" value="" placeholder="First Name" className="form-inline col-md-6" />
			      <input type="text" value="" placeholder="Last Name" className="form-inline col-md-6" />
			    </div>

		      <input type="text" value="" placeholder="Email Address" className="form-control" />

		      <div className="form-group">
			      <input type="text" value="" placeholder="Password" className="form-inline col-md-6" />
			      <input type="text" value="" placeholder="Confirm Password" className="form-inline col-md-6" />
			    </div>

		      <h5>Password must be more than 8 characters</h5>

		    </form>  
	    </div>
	  )
	}
});