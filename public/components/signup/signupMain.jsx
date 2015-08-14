var React = require('react/addons');
var Dev = require('./signupDev');
var Org = require('./signupOrg');
var Fetch = require('whatwg-fetch');
// var ValidationMixin = require('./../../../assets/lib/react-validation-mixin');
// var Joi = require('./../../../assets/lib/joi');

module.exports = React.createClass({
	// see http://facebook.github.io/react/docs/two-way-binding-helpers.html
	// mixins: [ValidationMixin, React.addons.LinkedStateMixin],
 //  validatorTypes:  {
 //  firstName: Joi.string().required().label('First Name'),
 //  lastName: Joi.string().required().label('Last Name'),
 //  email: Joi.string().email().label('Email'),
 //  password: Joi.string().regex(/^[\s\S]{8,30}$/).label('password'),
 //  confirmedPassword: Joi.any().valid(Joi.ref('password')).required().label('Confirmed password must match')
	// },
	getInitialState: function() {
		return {
			first_name: '',
	    last_name: '',
	    email: '',
	    password: '',
	    confirmedPassword: '',
	    can_message: false, 
	    user_kind: this.props.type,
	    terms: false
		}
	},
	renderHelpText: function(message) {
	  return (
	    <span className="help-block">{message}</span>
	  );
	},
	getClasses: function(field) {
	  return React.addons.classSet({
	    'form-group': true,
	    'has-error': !this.isValid(field)
	  });
	},
	handleReset: function(event) {
	  event.preventDefault();
	  this.clearValidations();
	  this.setState(this.getInitialState());
	},
	render: function() {
		return (
			<div>
				<div>{name}</div>
		    <form className="form-inline names">
		    	<div className="form-group">
	  				<input type="text" ref="firstName" className="form-control firstName" valueLink={this.linkState('first_name')} placeholder="First Name"/>
	  				<input type="text" ref="lastName" className="form-control lastName" valueLink={this.linkState('last_name')} placeholder="Last Name"/>
		    	</div>
		    </form>
		    <div className={this.getClasses('email')}>
	      	<input type="email" ref="emailAddress" className="form-control emailFill" valueLink={this.linkState('email')} onBlur={this.handleValidation('email')} placeholder="Email Address"/>
	      	<div className='names'>
	      	{this.getValidationMessages('email').map(this.renderHelpText)}
	      	</div>
	      </div>
	      <form className="form-inline passwords">
		    	<div className={this.getClasses('password')}>
	  				<input type="password" ref="password" className="form-control password" onBlur={this.handleValidation('password')} valueLink={this.linkState('password')} placeholder="Password"/>
	  				<input type="password" ref="confirmedPassword" className="form-control" onBlur={this.handleValidation('confirmedPassword')}  valueLink={this.linkState('confirmedPassword')} placeholder="Confirm Password"/>
	  				{this.getValidationMessages('confirmedPassword').map(this.renderHelpText)}
		    	</div>
		    </form>
	      <h5 className="signupCentered">Password must be more than 8 characters</h5>
	      {this.handleView()}  
      </div>
		)
	},
	handleView: function(){
		// render Dev or Org signup
		// WHY IS NEWEMAIL BEING PASSED??
		return this.props.type === "dev" ? 
		       <Dev submitForm={this.handleSubmit} newEmail={this.settingEmail} terms={this.setTerms} message={this.canMessage} /> : 
		       <Org submitForm={this.handleSubmit} newEmail={this.settingEmail} terms={this.setTerms} /> ;
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
	doPasswordsMatch: function(){
		if(this.state.password !== this.state.confirmedPassword){
			console.log('true')
			return true;
		}
		console.log('false')
		return false;
	},
	handleSubmit: function(comment) {
		this.doPasswordsMatch()
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
			// This is necessary because of a problem with Chrome Dev Tools
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