var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      bio: ''
    };
  },

  updateState: function(event) {
    this.props.updateBio(event.target.value);
  },
  
	render: function() {
	  return (
  		<div>
  		  <h3>Bio</h3>
  		  <textarea 
          defaultValue="Tell us about yourself..." 
          className="form-control" 
          rows="4" 
          cols="200"
          onChange={this.updateState}
          ></textarea>
  		</div>
	  )
	}
});