var React = require('react');
var Header = require('./header');
var Landing = require('./landing');

module.exports = React.createClass({
  render: function(){
    return <div>
      <Header />
      <Landing />
    </div>
  }
});