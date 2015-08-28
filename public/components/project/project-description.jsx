var React = require('react');
var Link = require('react-router').Link


module.exports = React.createClass({
  getInitialState: function() {
    return {
      description: ''
    };
  },

  updateBio: function(event) {
    this.props.updateDescription(event.target.value);
  },
  
  render: function() {
    return (
      <div>
      <span> Description: </span> 
        <div className='description'>{this.props.desc}</div>
      </div>
    )
  }
});