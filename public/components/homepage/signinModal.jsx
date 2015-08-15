var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Oauth = require('../signup/signupOAuth');
var LogButton = require('../shared/logInOutButton');

module.exports = React.createClass({
  getInitialState: function() {
    return { showModal: false };
  },
  close: function() {
    this.setState({ showModal: false });
  },
  open: function() {
    this.setState({ showModal: true });
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
            <Modal.Title className="site-name">Good In This World</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Oauth />

            <form className="form-group">
                <input type="email" className="form-control login-margin" placeholder="Email Address"/>
                <input type="password" className="form-control login-margin" placeholder="Password"/>
                <button type="submit" className="btn signupBtn signupCentered login-margin">Log In</button>
            </form>

          </Modal.Body>
        </Modal>
      </div>
    );
  }
});
