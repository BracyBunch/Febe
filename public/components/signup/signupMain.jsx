var React = require('react/addons');
var Dev = require('./signupDev');
var NP = require('./signupNp');
var ajax = require('../../utils/fetch');
var Navigation = require('react-router').Navigation;
var ValidationMixin = require('react-validation-mixin');
var Joi = require('joi');

module.exports = React.createClass({
  // see http://facebook.github.io/react/docs/two-way-binding-helpers.html
  mixins: [ValidationMixin, React.addons.LinkedStateMixin, Navigation],
  validatorTypes: {
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().email().label('Email'),
    password: Joi.string().regex(/^[\s\S]{8,30}$/).label('password'),
    confirmedPassword: Joi.any().valid(Joi.ref('password')).required().label('Confirmed password must match')
  },
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
    };
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
          </div>
        </form>
        <h5 className="signupCentered">Password must be more than 8 characters</h5>
        {this.handleView()}
      </div>
		)
	},
	handleView: function(){
		// render Dev or NP signup
		return this.props.type === "dev" ? 
		       <Dev submitForm={this.handleSubmit} terms={this.setTerms} message={this.canMessage} /> : 
		       <NP submitForm={this.handleSubmit} terms={this.setTerms} /> ;
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
	settingID: function(newID){
		{this.props.newID(newID)}
		this.transitionTo(this.props.type==="dev"?'devprofile':'npprofile')
	},
	passwordVerification: function(){
		if(this.state.password === this.state.confirmedPassword && this.state.password.length >= 8){
			return true;
		}
		return false;
	},
	handleSubmit: function(comment) {
    if( this.passwordVerification() ){
      var that = this;
      ajax(this.props.url, {method: 'POST', body: JSON.stringify(this.state)}).then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // call method with id returned from db
        that.settingID(data.id);
      })
      .catch(function(error) {
        console.log('request failed: ', error);
      });
    } else {
      alert('Please verify that your passwords match and contain 8 or more characters');
    }
  }
});
