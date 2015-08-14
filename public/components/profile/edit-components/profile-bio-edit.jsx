var React = require('react');

module.exports = React.createClass({
	render: function() {
	  return (
  		<div>
  		  <h3>Bio</h3>
  		  {this.getBio()}
  		  <textarea className="form-control" rows="4" cols="200">
        Tell us about yourself...
        </textarea>
  		</div>
	  )
	},
  getBio: function() {
  	// fetch bio from store
  }
});