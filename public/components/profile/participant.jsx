var React = require('react');
var ajax = require('../../utils/fetch');
// material ui
var mui = require('material-ui');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var muiLightTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
// var ThemeManager = new mui.Styles.ThemeManager();
var Paper = mui.Paper;
var RaisedButton = mui.RaisedButton;
var SnackBar = mui.SnackBar;


module.exports = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(muiLightTheme)
    };
  },

  getDefaultProps: function() {
    return {
      avatar: '/assets/img/avatar.png',
      title: 'Please enter a title/company',
      location: 'Please enter a location',
      type: "Project Manager or NP Representative"
    };
  },

  sendInterest: function() {
    this.props.interested();
    var route = '/project/' + this.props.projectid + '/add_member/' + localStorage.userId;
    ajax(route, {
      'method': 'put'
    }).then(function(res) {
      return res.json();
    }).then(function(data) {
      console.log(data);
    });
  },

  render: function() {
    return (
      <div className="profile">
        <div className="row row-centered">
          <div className="col-md-4">
            <div className="">
              <img className="profileAvatar" src={this.props.avatar} /> <br />
            </div>
          </div>
          <div className="col-md-4">
            <p>{this.props.firstName} {this.props.lastName}</p>
            <div>
              <p>{this.props.title}</p>
            </div>
            <div>
              <p>{this.props.location}</p>
            </div>
            <div>
              <p>{this.props.type}</p>
            </div>
          </div>
          <div className="col-md-4">
            <RaisedButton
              label="I'm Interested"
              onClick={this.sendInterest} />
          </div>
        </div>
      </div>
    );
  }
});
