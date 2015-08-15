var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
	render: function() {
		return (
			<form onSubmit={this.props.submitForm}>
		    <div className="signupCentered">
			    <div className="form-group">
				    <input type="checkbox" value="termsAgreed" onChange={this.props.terms} className="checkbox-inline"> I agree to the terms</input>
				  </div>
			    	<button type="submit" className="btn signupBtn text-center">Sign Up</button>
			  </div>
			</form> 
		)
	}
})
