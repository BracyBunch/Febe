var Fetch = require('whatwg-fetch');

module.exports = {
  get: function(url){
    return fetch(url, {'credentials': 'same-origin'})
    .then(function(response){;
      return response.json();
    });
  }
};
