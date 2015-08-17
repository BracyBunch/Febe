var keys = require('../../keys');
var Fetch; // require whatwg fetch?

module.exports = {
  imgurUpload: function(image) {
    $.ajax({
      url: 'https://api.imgur.com/3/image',
      type: 'POST',
      headers: {
        Authorization: 'Client-ID ' + keys.IMGUR_API_ID,
        Accept: 'application/json'
      },
      data: {
        image: image,
        type: 'base64'
      },
      success: function(result) {
        console.log(result.data.link)
        return result.data.link
      }
    });

    // fetch('https://api.imgur.com/3/upload', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': 'Client-ID ' + keys.IMGUR_API_ID,
    //     'Accept': 'application/json'
    //   },
    //   data: {
    //     image: image,
    //     type: 'base64'
    //   }
    // })
    // .then(function(response) {
    //   return response.json();
    // })
    // .then(function(data) {
    //   console.log(data);
    // })
    // .catch(function(error) {
    //   console.log("error: ", error)
    // })
  }
};