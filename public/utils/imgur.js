module.exports = {
  IMGUR_API_ID: 'a3550591bd9bd1b',
  imgurUpload: function(image) {
    $.ajax({
      url: 'https://api.imgur.com/3/image',
      type: 'POST',
      headers: {
        Authorization: 'Client-ID ' + IMGUR_API_ID,
        Accept: 'application/json'
      },
      data: {
        image: image,
        type: 'base64'
      }
    })
    .then(function(res) {
      return res.data.link
    });
  }
};