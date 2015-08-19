var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var mytheme = require('../../material-ui/material-ui-theme');
var Colors = require('../../material-ui/colors');
var AppBar = mui.AppBar;
var Checkbox = mui.Checkbox;
var FlatButton = mui.FlatButton;
var Router = require('react-router');
var SigninModal = require('../homepage/signinModal');
var Link = Router.Link;

module.exports = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      // muiTheme: ThemeManager.setTheme(mytheme)
      muiTheme: ThemeManager.getCurrentTheme(mytheme.getPalette())
    }
  },

  // temporarily setting color
  componentWillMount: function() { 
    ThemeManager.setPalette({ 
      primary1Color: Colors.indigo500, 
      // primary2Color: Colors.red700, 
      // primary3Color: Colors.green100, 
      // textColor: Colors.darkBlack,
      // accent1Color: "#000000", 
      // accent2Color: "#111111", 
      // accent3Color: "#999999" 
    }); 
  },

  render: function() {
    return (
      <div>
        <AppBar
          showMenuIconButton={false}
          style={{"opacity": "0.2"}}>
            
            {<FlatButton label={this.props.title} />}
            {<FlatButton label={this.props.title2} />}
            {<FlatButton label={this.props.title3} />}
            <Link to={this.props.link} className="navbar-brand headerText">{this.props.title}</Link>
            <Link to={this.props.link2} className="navbar-brand headerText">{this.props.title2}</Link>
            <Link to={this.props.link3} className="navbar-brand headerText">{this.props.title3}</Link> 
            <div className="headerMargin" />
            <SigninModal />  
        </AppBar>

      </div>
    );
  }
});
