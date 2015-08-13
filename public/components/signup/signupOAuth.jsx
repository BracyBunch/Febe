var React = require('react');
var Router = require('react-router');
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;
var Link = Router.Link;


// need form validation
module.exports = React.createClass({
	render: function() {
    var liTooltip = <Tooltip>LinkedIn</Tooltip>;
    var ghTooltip = <Tooltip>GitHub</Tooltip>;
    var fbTooltip = <Tooltip>Facebook</Tooltip>;

    return (
      <div>
        <div className="signupCentered">
          <h3>{this.props.name}</h3>
          <div className="btn-group">
            <Link to="#">
              <OverlayTrigger placement="top" overlay={liTooltip}>
                <img className="oauthPic img-rounded" src="assets/img/linkedinAuth.png" onClick={this.open_popup.bind(this, 'linkedin')} />
              </OverlayTrigger>
            </Link>
            <Link to="#">
              <OverlayTrigger placement="top" overlay={ghTooltip}>
                <img className="oauthPic img-rounded" src="assets/img/githubAuth.png" onClick={this.open_popup.bind(this, 'github')} />
              </OverlayTrigger>
            </Link>
            <Link to="#">
              <OverlayTrigger placement="top" overlay={fbTooltip}>
                <img className="oauthPic img-rounded" src="assets/img/facebookAuth.png" onClick={this.open_popup.bind(this, 'facebook')}  />
              </OverlayTrigger>
            </Link>
          </div>
          <h5>Or</h5>
        </div>
      </div>
    );
	},

	popup: undefined,
  check_popup_open_interval: undefined,

  handle_flow_end: function() {
    window.clearInterval(this.check_popup_open_interval);
    window.removeEventListener('storage', this.watch_localStorage);
    this.popup.close();
    var oauth_status = window.localStorage.getItem('oauth_status');
    window.localStorage.removeItem('oauth_status');

    if (oauth_status === 'success') {
      // Logged in
    } else if (oauth_status === 'rejected') {
      // User either denied the authorization or closed the popup
    } else if (oauth_status === 'conflict') {
      // There is already a user with the email recieved from the provider
      // User should login to add new connection
    }
  },

  check_popup_open: function() {
    if (this.popup.closed && window.localStorage.getItem('oauth_status') === 'in_progress') {
      window.clearInterval(this.check_popup_open_interval);
      window.localStorage.setItem('oauth_status', 'rejected');
      this.handle_flow_end();
    }
  },

  watch_localStorage: function(e) {
    if (e.key === 'oauth_status') {
      this.handle_flow_end();
    }
  },

  open_popup: function(provider) {
    window.addEventListener('storage', this.watch_localStorage);
    window.localStorage.setItem('oauth_status', 'in_progress');

    var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

    var width = screen.width;
    var height = screen.height;

    var left = ((width / 2) - (900 / 2)) + dualScreenLeft;
    var top = ((height / 2) - ((550 + 55) / 2)) + dualScreenTop;

    this.popup = window.open('/auth/'+ provider + '/login', '_blank', 'resizable=1,scrollbars=1,width=900,height=550,left=' + left + ',top=' + top);
    this.check_popup_open_interval = window.setInterval(this.check_popup_open, 250);
    this.popup.focus();
  }
});
