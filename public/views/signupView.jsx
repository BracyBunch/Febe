var React = require('react');
var Reflux = require('reflux');
var Oauth = require('../components/signup/signupOAuth');
var Main = require('../components/signup/signupMain');
var Dev = require('../components/signup/signupDev');
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var Actions = require('../actions');
var ProfileStore = require('../stores/profile-store');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ProfileStore, 'onChange')
  ],
  getInitialState: function() {
    return {
      userData: ['test'],
      id: 'empty',
      name: (this.props.route.kind === 'dev') ? 'Developer Signup' : 'Nonprofit Representative Signup'
    };
  },
  render: function() {
    return (
      <div className="fullscreen">
        <Header link='/' title='Home'/>
        <Oauth type={this.props.route.kind} signup="true" name={this.state.name} />
        <Main type={this.props.route.kind} url="/auth/signup" newID={this.getID} />
        <button type="submit" onClick={this.checking} className="btn signupBtn text-center">checkstate</button>
        <Footer />
      </div>
    );
  },
  onChange: function(event, userData) {
    this.setState({userData: userData});
  },
  getID: function(newID) {
    this.setState({
      id: newID
    });
    window.localStorage.setItem('userId', newID);
    this.setProfileStore();
  },
  checking: function() {
    console.log('this is from signup', this.state.userData);
  },
  setProfileStore: function(){
    Actions.getProfile(this.state.id);
  }
});
