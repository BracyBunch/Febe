var React = require('react');
var Header = require('./header');
var Landing = require('./landing');
var Footer = require('./footer');
var Team = require('./team');
var Stack = require('./stack');
var Help = require('./help');
var FeaturedProjects = require('./featuredProjects');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <Header link='/' title='About' link2="/" title2='Browse' link3='/' title3='Team'/>
        <Landing />
        <FeaturedProjects />
        <Team />
        <Stack />
        <Help />
        <Footer />
      </div>
    )
  },
});