var React = require('react');
var LandingPage = require('../views/homepage-view');
var Header = require('./shared/header');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();

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
