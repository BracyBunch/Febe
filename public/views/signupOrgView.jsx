var React = require('react');
var Oauth = require('../components/signup/signupOAuth');
var Main = require('../components/signup/signupMain');
var Dev = require('../components/signup/signupDev');
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="fullscreen">
        <Header link='/' title='Home'/>
        <Oauth type="rep" name="Nonprofit Representative Signup" />
        <Main type="rep" url="/auth/signup" newID={this.getID} />
        <Footer />
      </div>
    );
  },
  getID: function() {
    // temp function
  }
});
