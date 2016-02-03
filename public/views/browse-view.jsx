var React = require('react');
var mui = require('material-ui');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var muiLightTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
// var ThemeManager = new mui.Styles.ThemeManager();
var Footer = require('../components/shared/footer');
var BrowseProjects = require('../components/browse/browseProjects');

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
          <BrowseProjects />
      </div>
    );
  }
});
