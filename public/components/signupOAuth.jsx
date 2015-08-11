var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

// need form validation
module.exports = React.createClass({
	render: function() {
    return (
	    <div>
        <div className="signupCentered">
		      <h3>{this.props.name} Signup</h3>
		      <div className="btn-group">
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
		    <form className="form-inline names">
		    	<div className="form-group">
    				<input type="text" className="form-control firstName" placeholder="First Name"/>
    				<input type="text" className="form-control lastName" placeholder="Last Name"/>
		    	</div>
		    </form>
		    <div className="form-group">
	      	<input type="email" className="form-control emailFill" placeholder="Email Address"/>
	      </div>
	      <form className="form-inline passwords">
		    	<div className="form-group">
    				<input type="password" className="form-control password" placeholder="Password"/>
    				<input type="password" className="form-control" placeholder="Confirm Password"/>
		    	</div>
		    </form>
	      <h5 className="signupCentered">Password must be more than 8 characters</h5>  
    	</div>
	  )
	}
});