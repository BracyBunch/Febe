var React = require('react');
var LandingPage = require('../views/homepage-view');
var Header = require('./shared/header');

var mui = require('material-ui');
// var ThemeManager = new mui.Styles.ThemeManager();
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var muiLightTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');

module.exports = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(muiLightTheme)
    };
  },
  render: function() {
    return (
      <div>
        <Header location={this.props.location.pathname}  signinMessage={"Signed in Successfully"} />
        {this.content()}
      </div>
    );
  },
  content: function() {
    if(this.props.children){
      return this.props.children;
    } else {
      return <LandingPage />;
    }
  }
});
