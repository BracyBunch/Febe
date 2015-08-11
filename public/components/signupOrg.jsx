var React = require('react');

module.exports = React.createClass({
	log: function() {
    console.log(this.state)
	},
	render: function() {
		return (
			<form>
	      <div className="form-group techstrengths">
			    <label htmlFor="orgname">Organization Name</label> 
		      <input type="text" id="orgname" placeholder="Humane Society (San Jose), Project Homeless Connect, etc." className="form-control" />
		    </div>
				<div className="form-group techstrengths" id="addlLinks">
			    <label htmlFor="links">Additional Links (optional)</label>
		      <input type="text" id="links" placeholder="LinkedIn, Website, etc." className="form-control" />
		    </div>
		    <div className="signupCentered">
			    <button className="btn signupBtn" onClick={this.addLinks.bind(this, this.divId, this.newLinkHTML)}>Add +</button> <br />
			    <div className="form-group">
				    <input type="checkbox" value="termsAgreed" className="checkbox-inline"> I agree to the terms</input>
				  </div>
			    <button type="submit" className="btn signupBtn text-center">Sign Up</button>
			  </div>
			</form> 
		)
	},
	divId: 'addlLinks',
	newLinkHTML: '<input type="text" value="" id="links" placeholder="LinkedIn, Website, etc." class="form-control form-margin" />',

	addlFieldCount: 2,
	addlFieldLimit: 4,
	addLinks: function(divId, newLink) {
    if (this.addlFieldCount === this.addlFieldLimit) {
    	console.log("Maximum fields added");
    } else {
    	var newdiv = document.createElement('div');
			newdiv.innerHTML = this.newLinkHTML;
    	document.getElementById(divId).appendChild(newdiv);
    	this.addlFieldCount++;
    }
	}
})
