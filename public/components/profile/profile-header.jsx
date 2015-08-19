var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var mytheme = require('../../material-ui/material-ui-theme');
var RaisedButton = mui.RaisedButton;

module.exports = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      avatar: '/assets/img/avatar.png',
      title: 'Please enter a title/company',
      location: 'Please enter a location',
      links: 'Please enter your GitHub, LinkedIn, etc'
    };
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(mytheme)
    }
  },

  render: function() {
    return (
      <div className="container profileMargin">
        <div className="row">

          <div className="col-md-3">
            <div className="">
              <img src={this.props.avatar} /> <br />
            </div>
          </div>

          <div className="col-md-6">
            <p>{this.props.firstName} {this.props.lastName}</p>
            <div>
              <p>{this.props.title}</p>
            </div>
            <div>
              <p>{this.props.location}</p>
            </div>
            <div>
              <p>{this.props.links}</p>
            </div>
            <RaisedButton
              label="Contact" />
          </div>

          <div className="col-md-3">
            <RaisedButton
              label="Edit"
              onClick={this.props.edit} />
          </div>

        </div>
      </div>
    );
  }
});
