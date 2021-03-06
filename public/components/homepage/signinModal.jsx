var React = require('react/addons');
var Modal = require('react-bootstrap').Modal;
var Oauth = require('../signup/signupOAuth');
var LogButton = require('../shared/logInOutButton');
var ajax = require('../../utils/fetch');
var Navigation = require('react-router').Navigation;
var mui = require('material-ui')
var ThemeManager = new mui.Styles.ThemeManager();
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

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
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
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
    this.transitionTo('profile');
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
            <Oauth snackbar={this.props.snackbar} closeModal={this.close} />
            <form className="form-group" onSubmit={this.createSigninData}>
              <div>
                <TextField
                  style={{"width":"80%"}}
                  type="email"
                  hintText="Email Address"
                  floatingLabelText="Email Address"
                  valueLink={this.linkState('email')} />
                <TextField
                  style={{"width":"80%"}}
                  type="password"
                  hintText="Password"
                  floatingLabelText="Password"
                  valueLink={this.linkState('password')} />
              </div>
              <div className="signupCentered">
                <RaisedButton
                  label="Sign In" onClick={this.handleSubmit} />
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  },
  handleSubmit: function(comment) {
    var that = this;
    ajax('auth/login', {method: 'POST', body: JSON.stringify(this.state)}).then(function(response) {
      return response.json();
    })
    .then(function(data) {
      that.props.snackbar();
      that.close();
      // call method with id returned from db
      that.settingID(data.id);
    })
    .catch(function(error) {
      console.error('request failed: ', error);
    });
  }
});
