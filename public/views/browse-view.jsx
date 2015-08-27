var React = require('react/addons');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Footer = require('../components/shared/footer');
var BrowseProjects = require('../components/browse/browseProjects');

module.exports = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
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
