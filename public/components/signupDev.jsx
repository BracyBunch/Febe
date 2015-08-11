var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
	    <form>
	      <div className="form-group techstrengths">
			    <label htmlFor="techstrengths">Tech Strengths (optional)</label> 
		      <input type="text" id="techstrengths" placeholder="Angular.js, Node.js, Python, Databases, etc." className="form-control" />
		    </div>
				<div className="form-group techstrengths">
			    <label htmlFor="links">Additional Links (optional)</label>
		      <input type="text" id="links" placeholder="LinkedIn, Github, Angel List, Website, etc." className="form-control" />
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