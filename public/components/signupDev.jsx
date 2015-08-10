var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
	    <form className="col-md-8 col-md-offset-2">
		      <div className="form-group">
				    <label for="techstrengths">Tech Strengths (optional)</label> <br />
			      <input type="text" value="" id="techstrengths" placeholder="Angular.js, Node.js, Python, Databases, etc." className="form-control formbox" />
			    </div>
					<div className="form-group">
				    <label for="linkss">Additional Links (optional)</label> <br />
			      <input type="text" value="" id="links" placeholder="LinkedIn, Github, Angel List, Website, etc." className="form-control formbox" />
			    </div>
			    <div className="signupCentered">
				    <button className="btn signupBtn">Add +</button> <br />
				    <div className="form-group">
					    <input type="checkbox" value="contactedOK" className="checkbox-inline"> Open to being contacted</input>
					    <input type="checkbox" value="termsAgreed" className="checkbox-inline"> I agree to the terms</input>
					  </div>
				    <button type="submit" className="btn signupBtn text-center">Sign Up</button>
				  </div>
			</form> 
		)
	}
})