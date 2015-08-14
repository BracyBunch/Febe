var React = require('react/addons');
var ProfileMethods = require('../sharedProfileMethods')

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  render: function() {
  	return (
  		<div className="">
  		  <div id='addlStrengths'>
	  		  <h3>Tech Strengths</h3>
	        <input type="text" className="form-control" placeholder="Tech Strengths" />
	  		</div>
        <button 
          className="btn signupBtn" 
          onClick={ProfileMethods.addFields.bind(this, 'addlStrengths', this.newStrengths)}>Add +</button> <br />
	  		<div id='addlInterests'>
	  		  <h3>Interests</h3>
          <input type="text" className="form-control" placeholder="Interests" />
	  		</div>
        <button 
          className="btn signupBtn" 
          onClick={ProfileMethods.addFields.bind(this, 'addlInterests', this.newInterests)}>Add +</button> <br />
  		</div>
  	)
  },
  newStrengths: '<input type="text" class="form-control" placeholder="Tech Strengths" />',
  newInterests: '<input type="text" class="form-control" placeholder="Interests" />',
  addlFieldCount: 2,
  addlFieldLimit: 4
});