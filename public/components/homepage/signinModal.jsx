var React = require('react/addons');
var Modal = require('react-bootstrap').Modal;
var Oauth = require('../signup/signupOAuth');
var LogButton = require('../shared/logInOutButton');
var ajax = require('../../utils/fetch');
var Navigation = require('react-router').Navigation;

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Navigation],
  getInitialState: function() {
    return { 
      showModal: false,
      email: '',
      password: '',
      signinData: '',
      id: ''
    };
  },
  close: function() {
    this.setState({ showModal: false });
  },
  open: function() {
    this.setState({ showModal: true });
  },
  settingID: function(newID){
    {this.newID(newID)}
  },
  createSigninData: function(){
    this.setState({
      signinData: {email: this.state.email, password: this.state.password}
    }, function(){
      this.handleSubmit()
    })
  },
  newID: function(newID) {
    this.setState({
      id: newID
    });
    window.localStorage.setItem('userId', newID);
    this.transitionTo('dashboard');
  },
  render: function() {
    return (
      <div>
        <LogButton open={this.open}/>
        <Modal
          dialogClassName="loginModal"
          show={this.state.showModal}
          onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title className="signupCentered">Good In This World</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Oauth />
            <form className="form-group" onSubmit={this.createSigninData}>
                <input type="email" className="form-control login-margin" ref="emailAddress" valueLink={this.linkState('email')} placeholder="Email Address"/>
                <input type="password" className="form-control login-margin" valueLink={this.linkState('password')} placeholder="Password"/>
                <button type="submit" className="btn signupBtn signupCentered login-margin">Login</button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  },
  handleSubmit: function(comment) {
    var that = this;
    console.log('this is the state', that.state.signinData);
    ajax('auth/login', {method: 'POST', body: JSON.stringify(this.state.signinData)}).then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // call method with id returned from db
      that.settingID(data.id);
    })
    .catch(function(error) {
      console.log('request failed: ', error);
    });
  },
});
