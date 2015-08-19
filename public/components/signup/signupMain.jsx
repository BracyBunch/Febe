var React = require('react/addons');
var ajax = require('../../utils/fetch');
var Navigation = require('react-router').Navigation;
var ValidationMixin = require('react-validation-mixin');
var Joi = require('joi');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Checkbox = mui.Checkbox;

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
  childContextTypes: {
    muiTheme: React.PropTypes.object
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
      terms: false, 
      errorText: "This does not appear to be a valid email"
    };
  },
// form verification methods
  renderHelpText: function(message) {
    return (
      <div>
        <span className="help-block">{message}</span>
      </div>
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
// form methods
  handleView: function() {
    // render Dev or NP signup
    return this.props.type === 'dev' ?
      <Checkbox name="contacted" onChange={this.message} label="Open to being contacted" />
      : '';
  },
  setTerms: function(){
    this.setState({
      terms: !this.state.terms
    });
  },
  canMessage: function(){
    this.setState({
      can_message: !this.state.can_message
    });
  },
  settingID: function(newID){
    {this.props.newID(newID)}
    this.transitionTo(this.props.type==="dev"?'devprofile':'npprofile');
  },
  passwordVerification: function(){
    if(this.state.password === this.state.confirmedPassword && this.state.password.length >= 8){
      return true;
    }
    return false;
  },
  handleSubmit: function(comment) {
    console.log(this.state.terms)
    if( this.passwordVerification() && this.state.terms ){
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
      console.log('Please verify that your passwords match and contain 8 or more characters');
    }
  },
  render: function() {
    return (
      <div className="row">
      <div className="col-md-6 col-md-offset-3 signupBorder">
      <div className="signupCentered">
        <div className="">
            <TextField
              style={{"width":"40%"}}
              hintText="First Name"
              floatingLabelText= "First Name"
              valueLink={this.linkState('first_name')} />
            <TextField
              style={{"width":"40%"}}
              hintText="Last Name"
              floatingLabelText= "Last Name"
              valueLink={this.linkState('last_name')} />
        </div>

        <div className={this.getClasses('email') + " signupCentered"}>
          <TextField
            type="email"
            style={{"width":"80%"}}
            hintText="Email Address"
            floatingLabelText="Email Address"
            valueLink={this.linkState('email')}
            onBlur={this.handleValidation('email')} />
          <div>
            {this.getValidationMessages('email').map(this.renderHelpText)}
          </div>
        </div>

        <div>
          <div className={this.getClasses('password')}>
            <TextField
              style={{"width":"40%"}}
              type="password"
              hintText="Password"
              floatingLabelText= "Password"
              valueLink={this.linkState('password')}
              onBlur={this.handleValidation('password')}
              valueLink={this.linkState('password')} />
            <TextField
              style={{"width":"40%"}}
              type="password"
              hintText="Password"
              floatingLabelText= "Password"
              onBlur={this.handleValidation('confirmedPassword')}  
              valueLink={this.linkState('confirmedPassword')} />
          </div>
        </div>

        <h5>Password must be more than 8 characters</h5>
          <div className="checkbox">
            <div>
              {this.handleView()}
            </div>

              <Checkbox
                name="terms"
                value="terms"
                onCheck={this.setTerms}
                label="I agree to the terms" />
          </div>
          <div className="signupCentered signupBtn">
              <RaisedButton
                style={{"opacity": "0.7"}}
                label="Sign Up"
                onClick={this.handleSubmit} />
          </div>
      </div>
      </div>
    </div>  
    );
  }
});