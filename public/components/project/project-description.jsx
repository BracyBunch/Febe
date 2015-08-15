var React = require('react');
var Link = require('react-router').Link


module.exports = React.createClass({
  getInitialState: function() {
    return {
      bio: ''
    };
  },

  updateBio: function(event) {
    this.props.updateBio(event.target.value);
  },
  
  render: function() {
    return (
      <div>
        description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description 
        <br/>
        description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description 
      </div>
    )
  }
});