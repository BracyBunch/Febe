var React = require('react');

module.exports = React.createClass({
  render: function() {
  	return (
  		<div>
	      <div>
	        <h3>Current Projects</h3>
	        {this.getCurrentProjects()}
	      </div>
	      <div>
	        <h3>Completed Projects</h3>
	        {this.getCompletedProjects()}
	      </div>
	    </div>
  	)
  },
  getCurrentProjects: function(projects) {
  	// fetch projects
  },
  getCompletedProjects: function(projects) {
  	// fetch projects
  }
});