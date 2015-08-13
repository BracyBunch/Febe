var React = require('react/addons');
var Dev = require('./signupDev');
var Org = require('./signupOrg');
var Fetch = require('whatwg-fetch');

module.exports = React.createClass({
	// see http://facebook.github.io/react/docs/two-way-binding-helpers.html
	mixins: [React.addons.LinkedStateMixin],
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
		    <div className="form-group">
	      	<input type="email" ref="emailAddress" className="form-control emailFill" valueLink={this.linkState('email')} placeholder="Email Address"/>
	      </div>
	      <form className="form-inline passwords">
		    	<div className="form-group">
	  				<input type="password" ref="password" className="form-control password" valueLink={this.linkState('password')} placeholder="Password"/>
	  				<input type="password" ref="confirmedPassword" className="form-control" valueLink={this.linkState('confirmedPassword')} placeholder="Confirm Password"/>
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
	// handleChange: function(event){
	// 	this.setState({
	// 		first_name: event.target.value,
	//     last_name: this.refs.lastName.getDOMNode().value,
	//     email: this.refs.emailAddress.getDOMNode().value,
	//     password: this.refs.password.getDOMNode().value,
	//     confirmedPassword: this.refs.confirmedPassword.getDOMNode().value,
	//     user_kind: this.props.type
	// 	})
	// },
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