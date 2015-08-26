var ajax = require('../utils/fetch');
var Promise = require('bluebird');

module.exports = {
  verifyEIN: function(event) {
    return new Promise(function(resolve, reject) {
      var that = this;
      // FileReader is a native browser file reader
      // Assign file to img
      function readSuccess(upload) {
        imgBase64 = upload.target.result;
        // slice only base64 data
        imgToUpload = imgBase64.slice(23);
        ajax('/imgur', {
          method: 'POST',
          body: JSON.stringify({
            image: imgToUpload
          })
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          resolve(data.data.link);
        })
      }

      // readAsDataURL converts file to base64
      reader.readAsDataURL(img);
    })
  }
};