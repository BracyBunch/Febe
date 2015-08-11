var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
	    <form className="col-md-6 col-md-offset-3">
	      <div className="form-group">
			    <label htmlFor="techstrengths">Tech Strengths (optional)</label> <br />
		      <input type="text" value="" id="techstrengths" placeholder="Angular.js, Node.js, Python, Databases, etc." className="form-control formBox formMargin" />
		    </div>
				<div className="form-group" id='addlLinks'>
			    <label htmlFor="linkss">Additional Links (optional)</label> <br />
		      <input type="text" value="" id="links" placeholder="LinkedIn, Github, Angel List, Website, etc." className="form-control formBox formMargin" />
		    </div>
		    <div className="signupCentered">
			    <button className="btn signupBtn" onClick={this.addLinks.bind(this, this.divId, this.newLinkHTML)}>Add +</button> <br />
			    <div className="form-group">
				    <input type="checkbox" value="contactedOK" className="checkbox-inline"> Open to being contacted</input>
				    <input type="checkbox" value="termsAgreed" className="checkbox-inline"> I agree to the terms</input>
				  </div>
			    <button type="submit" className="btn signupBtn text-center">Sign Up</button>
			  </div>
			</form> 
		)
	},
	divId: 'addlLinks',
	newLinkHTML: '<input type="text" value="" id="links" placeholder="LinkedIn, Github, Angel List, Website, etc." class="form-control formBox formMargin" />',

	addlFieldCount: 0,
	addlFieldLimit: 3,
	addLinks: function(divId, newLink) {
    if (this.addlFieldCount === this.addlFieldLimit) {
    	console.log("Maximum fields added");
    } else {
    	var newdiv = document.createElement('div');
		  newdiv.innerHTML = newLink;
    	document.getElementById(divId).appendChild(newdiv);
    	this.addlFieldCount++;
    }
	}
})