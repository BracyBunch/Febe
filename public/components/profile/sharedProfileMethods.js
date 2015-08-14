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
	}
}