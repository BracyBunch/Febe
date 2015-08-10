var React = require('react');
var Header = require('./header');
var Landing = require('./landing');
var Footer = require('./footer');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <Header link='/' title='About' link2="/" title2='Browse' link3='/' title3='Team'/>
        <Landing />
        <Footer />
      </div>
    )
  },
});