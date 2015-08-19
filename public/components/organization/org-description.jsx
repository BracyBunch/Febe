var React = require('react');
var Link = require('react-router').Link

module.exports = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  
  render: function() {
    return (
      <div>
        <span> 
          Organization: {this.props.name}
        </span>
        <br/>
        <span>
          Location: {this.props.location}
        </span>
      </div>
    )
  }
});