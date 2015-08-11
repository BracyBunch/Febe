var React = require('react');
var Header = require('./header');
var Footer = require('./footer');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <Header link='/dashboard' title='Home' link2="/" title2='Browse'/>
        <div>Dashboard</div>
        <Footer />
      </div>
    )
  },
});