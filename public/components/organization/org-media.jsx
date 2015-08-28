var React = require('react');
var Link = require('react-router').Link


module.exports = React.createClass({
  getInitialState: function() {
    return {
      media: 'None'
    };
  },
  
  render: function() {
    return (
      <div> 
        <span> Organization Media: {this.state.media} </span>
      </div>
    )
  }
});