var Fetch = require('whatwg-fetch');

module.exports = {
  addFields: function(divId, newLink, count, max) {
  	console.log("adding")
  	count = count || 1;
  	max = max || 4;
	  if (count === max) {
	  	console.log("Maximum fields added");
	  } else {
	  	var newdiv = document.createElement('div');
			newdiv.innerHTML = newLink;
	  	document.getElementById(divId).appendChild(newdiv);
	  	count++;
	  }
	},

	fetch: function(url, type, data) {
		var that = this;
		console.log('were in here')
		fetch(url, {
			method: type,
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
			body: JSON.stringify(data)
		})
		.then(function(response) {
			// This is necessary because of a problem with Chrome Dev Tools
			// See https://code.google.com/p/chromium/issues/detail?id=457484
			return response.json();
		})
		.then(function(data) {
// THIS NEEDS EDITTING
			// call method with id returned from db
			that.settingEmail(data.id)
		})
		.catch(function(error) {
			console.log('request failed: ', error)
		})
	}
}