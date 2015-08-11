var React = require('react');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({

  getInitialState(){
    return { showModal: false };
  },

  close(){
    this.setState({ showModal: false });
  },

  open(){
    this.setState({ showModal: true });
  },

  render() {
    var liTooltip = <Tooltip>LinkedIn</Tooltip>;
    var ghTooltip = <Tooltip>GitHub</Tooltip>;
    var fbTooltip = <Tooltip>Facebook</Tooltip>;

    return (
      <div>
        <button className="btn navbar-btn btn-success" onClick={this.open}>Login</button>

        <Modal 
          dialogClassName="loginModal"
          show={this.state.showModal} 
          onHide={this.close}>

          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="btn-group signupCentered">
              <Link to="#">
                <OverlayTrigger placement="top" overlay={liTooltip}>
                  <img className="oauthPic img-rounded" src="assets/img/linkedinAuth.png" />
                </OverlayTrigger>
              </Link>
              <Link to="#">
                <OverlayTrigger placement="top" overlay={ghTooltip}>
                  <img className="oauthPic img-rounded" src="assets/img/githubAuth.png" />
                </OverlayTrigger>
              </Link>
              <Link to="#">
                <OverlayTrigger placement="top" overlay={fbTooltip}>
                  <img className="oauthPic img-rounded" src="assets/img/facebookAuth.png" />
                </OverlayTrigger>
              </Link>
            </div>

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