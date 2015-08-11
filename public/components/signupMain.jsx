var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<div>
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
})