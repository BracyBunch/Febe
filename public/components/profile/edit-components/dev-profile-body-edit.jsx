var React = require('react');
var Methods = require('../sharedProfileMethods')

module.exports = React.createClass({
  render: function() {
  	return (
  		<div className="">
  		  <div id='addlStrengths'>
	  		  <h3>Tech Strengths</h3>
	        <input type="text" className="form-control" placeholder="Tech Strengths" />
	  		</div>
        <button 
          className="btn signupBtn" 
          onClick={Methods.addFields.bind(this, 'addlStrengths', this.newStrengths)}>Add +</button> <br />
	  		<div id='addlInterests'>
	  		  <h3>Interests</h3>
          <input type="text" className="form-control" placeholder="Interests" />
	  		</div>
        <button 
          className="btn signupBtn" 
          onClick={Methods.addFields.bind(this, 'addlInterests', this.newInterests)}>Add +</button> <br />
  		</div>
  	)
  },
  divId: 'addlLinks',
  newStrengths: '<input type="text" class="form-control" placeholder="Tech Strengths" />',
  newInterests: '<input type="text" class="form-control" placeholder="Interests" />',
  addlFieldCount: 2,
  addlFieldLimit: 4,
  tagsList: function(tags) {
    // return tags.map(function(tag) {
    // 	return <li className="">some tags</li>
    // })
  },
  interestsList: function(interests) {
  	// return interests.map(function(interest) {
  	// 	return <li className="">interest</li>
  	// })
  }
});