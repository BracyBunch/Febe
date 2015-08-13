var React = require('react');
var Dev = require('./signupDev');
var Org = require('./signupOrg');
var Fetch = require('whatwg-fetch');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			first_name: '',
	    last_name: '',
	    email: '',
	    password: '',
	    confirmedPassword: '',
	    can_message: false, 
	    user_kind: '',
	    terms: false
		}
	},
	render: function() {
		return (
			<div>
				<div>{name}</div>
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
	      {this.handleView()}  
      </div>
		)
	},
	handleView: function(){
		return this.props.type === "dev" ? <Dev change={this.handleSubmit} newEmail={this.settingEmail} terms={this.setTerms} message={this.canMessage}/> : <Org />;
	},
	handleChange: function(){
		this.setState({
			first_name: this.refs.firstName.getDOMNode().value,
	    last_name: this.refs.lastName.getDOMNode().value,
	    email: this.refs.emailAddress.getDOMNode().value,
	    password: this.refs.password.getDOMNode().value,
	    confirmedPassword: this.refs.confirmedPassword.getDOMNode().value,
	    user_kind: this.props.type
		})
	},
	setTerms: function(){
		this.setState({
			terms: !this.state.terms
		})
	},
	canMessage: function(){
		this.setState({
			can_message: !this.state.can_message
		})
	},
	settingEmail: function(newID){
		{this.props.newID(newID)}
	},
	handleSubmit: function(comment) {
		var that = this;
		fetch(this.props.url, {
			method: 'post',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
			body: JSON.stringify(this.state)
		})
		.then(function(response) {
			// I think this is necessary, because of a problem with Chrome Dev Tools
			// See https://code.google.com/p/chromium/issues/detail?id=457484
			return response.json();
		})
		.then(function(data) {
			// call method with id returned from db
			that.settingEmail(data.id)
		})
		.catch(function(error) {
			console.log('request failed: ', error)
		})
  }
})