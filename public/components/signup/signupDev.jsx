var React = require('react');
var Methods = require('./sharedSignupMethods');

module.exports = React.createClass({
  render: function() {
    return (
      <form onSubmit={this.props.submitForm}>
        <div className="signupCentered">
          <div className="form-group">
            <input type="checkbox" ref="contacted" onChange={this.props.message} className="checkbox-inline"> Open to being contacted</input>
            <input type="checkbox" ref="terms" onChange={this.props.setTerms} className="checkbox-inline"> I agree to the terms</input>
          </div>
            <button type="submit" className="btn signupBtn text-center">Sign Up</button>
        </div>
      </form>
    );
  }
});
