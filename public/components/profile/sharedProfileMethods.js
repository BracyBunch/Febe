module.exports = {
  addFields: function(divId, newLink, count, max) {
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

	updateProfile: function(url, type, data) {
		fetch(url, {
			method: type,
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
			body: JSON.stringify(data),
			'credentials': 'same-origin'
		})
		.then(function(response) {
			// This is necessary because of a problem with Chrome Dev Tools
			// See https://code.google.com/p/chromium/issues/detail?id=457484
			console.log(response)
			return response.json();
		})
		.then(function(data) {
			console.log(data)
		})
		.catch(function(error) {
			console.log('request failed: ', error)
		})
	}
}