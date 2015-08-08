var React = require('react');
var Router = require('react-router');
//renderable component
var Link = Router.Link;

module.exports = React.createClass({
  render: function(){
    return <div className="jumbotron">
      <div>GoodInThisWorld.com</div>
      <div>I Am A</div>
      <Link to="/signup"><button className="btn btn-primary">Engineer</button></Link>
      <Link to="/signup"><button className="btn btn-primary">Nonprofit</button></Link>
      <div>Collaborate, Learn and Make A Difference</div>
      <div className="scroll-down">
        <div>Scroll Down to See More</div>
        <div className="glyphicon glyphicon-circle-arrow-down"></div>
      </div>
    </div>
  }
})