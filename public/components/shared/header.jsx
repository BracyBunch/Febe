'use strict';
var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var AppBar = mui.AppBar;
var Router = require('react-router');
var SigninModal = require('../homepage/signinModal');
//renderable component
var Link = Router.Link;

module.exports = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    // 
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  render: function() {
    return (
      <div>
        <AppBar
          title="Good In This World"
          showMenuIconButton={false}
        >
          <Link to={this.props.link} className="navbar-brand">{this.props.title}</Link>
          <Link to={this.props.link2} className="navbar-brand">{this.props.title2}</Link>
          <Link to={this.props.link3} className="navbar-brand">{this.props.title3}</Link> 
          <SigninModal />     
        </AppBar>
      </div>
    );
  }
});
