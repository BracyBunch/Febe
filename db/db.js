var Promise = require('bluebird');
var seraph = require('seraph');
var options = {};

if (process.env.GRAPHSTORY_URL) {
  var url = require('url').parse(process.env.GRAPHSTORY_URL);

  options = {
    server: url.protocol + '//' + url.host,
    user: url.auth.split(':')[0],
    pass: url.auth.split(':')[1]
  };
}

var db = seraph(options);
db.query = Promise.promisify(db.query);

module.exports = db;
