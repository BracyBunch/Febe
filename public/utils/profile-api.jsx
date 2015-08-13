var Fetch = require('whatwg-fetch');

module.exports = {
  get: function(url){
    return fetch(url)
    .then(function(response){
      return response.json()
    })
  }
};