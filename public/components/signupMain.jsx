var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			firstName: '',
	    lastName: '',
	    email: '',
	    password: '',
	    confirmedPassword: ''
		}
	},
	render: function() {
		return (
			<div>
		    <form className="form-inline names">
		    	<div className="form-group">
	  				<input type="text" ref="firstName" className="form-control firstName" onChange={this.handleChange} placeholder="First Name"/>
	  				<input type="text" ref="lastName" className="form-control lastName" onChange={this.handleChange} placeholder="Last Name"/>
		    	</div>
		    </form>
		    <div className="form-group">
	      	<input type="email" ref="emailAddress" className="form-control emailFill" onChange={this.handleChange} placeholder="Email Address"/>
	      </div>
	      <form className="form-inline passwords">
		    	<div className="form-group">
	  				<input type="password" ref="password" className="form-control password" onChange={this.handleChange} placeholder="Password"/>
	  				<input type="password" ref="confirmedPassword" className="form-control" onChange={this.handleChange} placeholder="Confirm Password"/>
		    	</div>
		    </form>
	      <h5 className="signupCentered">Password must be more than 8 characters</h5>  
      </div>
		)
	},
	handleChange: function(){
		this.setState({
			firstName: this.refs.firstName.getDOMNode().value,
	    lastName: this.refs.lastName.getDOMNode().value,
	    email: this.refs.lastName.getDOMNode().value,
	    password: this.refs.lastName.getDOMNode().value,
	    confirmedPassword: this.refs.lastName.getDOMNode().value
		})
	}
})