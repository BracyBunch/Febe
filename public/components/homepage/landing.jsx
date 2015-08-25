var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
//renderable component
var Link = Router.Link;
var FlatButton = mui.FlatButton;

module.exports = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  render: function(){
    return (
      <div className="jumbotron landing-page">
        <div className="site-name"><img src='/assets/img/logo.png'/></div>
        <div className="iamdev">I &nbsp; Am &nbsp; A</div>
        <div className="row signup-buttons">
          <div className="col-xs-6 col-sm-push-1">
            <Link to="/signupdev">
              <FlatButton
                style={{"opacity": "0.9", "width": "120px", "margin": "8px auto"}}
              >Engineer</FlatButton>
            </Link>
            <div className="under-buttons">Work with others to<br/>solve problems</div>
          </div>
          <div className="col-xs-6 col-sm-pull-1">
            <Link to="/signupnp">
              <FlatButton
                style={{"opacity": "0.9", "width": "120px", "margin": "8px auto"}}
              >Nonprofit</FlatButton>
            </Link>
            <div className="under-buttons">Post technical projects<br/>you need help with</div>
          </div>
        </div>
        <div className="slogan">Collaborate, Learn and Make A Difference</div>
        <div className="scroll-down">
          <div className="scroll-text">Scroll Down to See More</div>
          <div className="glyphicon glyphicon-circle-arrow-down"></div>
        </div>
      </div>
    )
  }
})