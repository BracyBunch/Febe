var express = require('express');
var request = require('request');
var router = express.Router();
var path = require('path');
var keys = require('../keys');

router.post('/', function(req, res) {
  var options = {
    url: 'https://api.imgur.com/3/image',
    method: 'POST',
    headers: {
      Authorization: 'Client-ID ' + keys.IMGUR_API_ID
    },
    body: req.body.image
  }
  var callback = function(error, response, body){
    if (!error && response.statusCode === 200){
      var body = JSON.parse(body);
      res.send(body)
    } else if (!error && response.statusCode === 404){
      res.send(body)
    } else {
      console.log("error", error)
      res.send(body)
    }
  };

  request(options, callback);
})

module.exports = router;