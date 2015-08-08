var React = require('react');
var Router = require('react-router');
//renderable component
var Link = Router.Link;

module.exports = React.createClass({
  render: function(){
    return (
      <div className="jumbotron landing-page">
        <div className="site-name">Good In This World</div>
        <div className="iamdev">I Am A</div>
        <div className="row signup-buttons">
          <div className="col-xs-6 col-sm-push-2">
            <Link to="/signup"><button className="btn btn-primary">Engineer</button></Link>
            <div className="under-buttons">Work with others to<br/>solve problems</div>
          </div>
          <div className="col-xs-6 col-sm-pull-2">
            <Link to="/signup"><button className="btn btn-primary">Nonprofit</button></Link> 
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