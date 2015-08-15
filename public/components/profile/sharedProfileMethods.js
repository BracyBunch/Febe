var ajax = require('../../utils/fetch');

module.exports = {
  addFields: function(divId, newLink, count, max) {
    count = count || 1;
    max = max || 4;
    if (count === max) {
      console.log('Maximum fields added');
    } else {
      var newdiv = document.createElement('div');
      newdiv.innerHTML = newLink;
      document.getElementById(divId).appendChild(newdiv);
      count++;
    }
  },
  updateProfile: function(url, data) {
    ajax(url, {method: 'PUT', body: JSON.stringify(data)})
    .then(function(data) {
      // call method with id returned from db
      console.log(data);
    })
    .catch(function(error) {
      console.log('request failed: ', error);
    });
  }
};
