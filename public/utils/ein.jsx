var ajax = require('../utils/fetch');
var Promise = require('bluebird');

module.exports = {
  verifyEIN: function(event) {
    return new Promise(function(resolve, reject) {
      var that = this;
      // FileReader is a native browser file reader
      // Assign file to img
      function readSuccess(upload) {
        ajax('/ein', {
          method: 'POST',
          body: JSON.stringify({
            image: imgToUpload
          })
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          resolve(data);
        })
      }

      // readAsDataURL converts file to base64
    })
  }
};