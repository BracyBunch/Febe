var React = require('react');
var Router = require('react-router');
//renderable component
var Link = Router.Link;

module.exports = React.createClass({
  render: function(){
    return <div className="jumbotron landing-page">
      <div className="site-name">GoodInThisWorld.com</div>
      <div className="iamdev">I Am A</div>
      <Link to="/signup"><button className="btn btn-primary">Engineer</button></Link>
      <Link to="/signup"><button className="btn btn-primary">Nonprofit</button></Link>
      <div className="slogan">Collaborate, Learn and Make A Difference</div>
      <div className="scroll-down">
        <div className="scroll-text">Scroll Down to See More</div>
        <div className="glyphicon glyphicon-circle-arrow-down"></div>
      </div>
    </div>
  }
})