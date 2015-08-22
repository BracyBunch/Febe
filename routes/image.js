var fs = require('fs');
var request = require('request');
var request = request.defaults({
  json: true
});
var keys = require('../keys');

module.exports = {
  upload: function(_file,_cb) {
    if(this._clientID && _file) {
      var options = {
        url: 'https://api.imgur.com/3/upload',
        headers: {
          'Authorization': 'Client-ID ' + keys.IMGUR_API_ID
        }
      };
      var post = request.post(options, function (err, req, body){
        if(err) {
          return _cb(err);
        }
        _cb(null, body);
      });

      var upload = post.form();
      if (_file.match(/^https?:\/\//i)) {
        upload.append('type','url');
        upload.append('image',_file);
      } else {
        upload.append('type', 'file');
        upload.append('image', fs.createReadStream(_file));
      }
    }
  }
}