var React = require('react');
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function(){
    return (
      <div>
      <Header link='/' title='Browse'/>
        I AM CREATE ORG
      <Footer />
      </div>
    )
  },
});