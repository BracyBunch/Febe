var React = require('react');
var Methods = require('./sharedSignupMethods');

module.exports = React.createClass({	
	render: function() {
		return (
	    <form onSubmit={this.props.submitForm}>
	      <div className="form-group techstrengths">
			    <label htmlFor="techstrengths">Tech Strengths (optional)</label> 
		      <input type="text" id="techstrengths" placeholder="Angular.js, Node.js, Python, Databases, etc." className="form-control" />
		    </div>
				<div className="form-group techstrengths" id="addlLinks">
			    <label htmlFor="links">Additional Links (optional)</label>
		      <input type="text" id="links" placeholder="LinkedIn, Github, Angel List, Website, etc." className="form-control" />
		    </div>
		    <div className="signupCentered">
			    <button className="btn signupBtn" onClick={Methods.addFields.bind(this, this.divId, this.newLinkHTML)}>Add +</button> <br />
			    <div className="form-group">
				    <input type="checkbox" ref="contacted" onChange={this.props.message} className="checkbox-inline"> Open to being contacted</input>
				    <input type="checkbox" ref="terms" onChange={this.props.terms} className="checkbox-inline"> I agree to the terms</input>
				  </div>
			      <button type="submit" className="btn signupBtn text-center">Sign Up</button>
			  </div>
			</form> 
		)
	},
	divId: 'addlLinks',
	newLinkHTML: '<input type="text" value="" id="links" placeholder="LinkedIn, Github, Angel List, Website, etc." class="form-control formBox form-margin" />',
	addlFieldCount: 2,
	addlFieldLimit: 4
})