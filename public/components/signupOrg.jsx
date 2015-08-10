var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
	    <form className="col-md-6 col-md-offset-3">
		      <div className="form-group">
				    <label for="orgname">Organization Name</label> <br />
			      <input type="text" value="" id="orgname" placeholder="Humane Society (San Jose), Project Homeless Connect, etc." className="form-control formbox" />
			    </div>
					<div className="form-group">
				    <label for="linkss">Additional Links (optional)</label> <br />
			      <input type="text" value="" id="links" placeholder="LinkedIn, Website, etc." className="form-control formbox" />
			      <input type="text" value="" id="links" placeholder="LinkedIn, Website, etc." className="form-control formbox" />
			    </div>
			    <div className="signupCentered">
				    <button className="btn signupBtn">Add +</button> <br />
				    <div className="form-group">
					    <input type="checkbox" value="termsAgreed" className="checkbox-inline"> I agree to the terms</input>
					  </div>
				    <button type="submit" className="btn signupBtn text-center">Sign Up</button>
				  </div>
			</form> 
		)
	}
})