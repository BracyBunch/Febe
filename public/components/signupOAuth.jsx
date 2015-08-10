var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

// need form validation
module.exports = React.createClass({
	render: function() {
    return (
	    <div className="col-md-6 col-md-offset-3">
	      <form className="">

	        <div className="signupCentered">
			      <h3 className="">Developer Signup</h3>
			      <div className="form-group">
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
			      <h5>Or</h5>
			    </div>
  				
		      <div className="form-group">
			      <input type="text" value="" placeholder="First Name" className="form-inline formbox" />
			      <input type="text" value="" placeholder="Last Name" className="form-inline formbox" />
			    </div>

			    <div>
			      <input type="text" value="" placeholder="Email Address" className="form-control" />
			    </div>

		      <div className="form-group">
			      <input type="text" value="" placeholder="Password" className="form-inline formbox" />
			      <input type="text" value="" placeholder="Confirm Password" className="form-inline <formbox></formbox>" />
			    </div>

		      <h5 className="signupCentered">Password must be more than 8 characters</h5>

		    </form>  
	    </div>
	  )
	}
});