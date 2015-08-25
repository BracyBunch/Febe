var express = require('express');
var request = require('request');
var router = express.Router();
var imgur = require('imgur-node-api');
var path = require('path');
var keys = require('../keys');

imgur.setClientID(keys.IMGUR_API_ID);

router.post('/', function(req, res) {
  console.log(req.body.image)
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

// router.post('/', function(req, res) {
//   console.log('running')
//   console.log(req.body)
//   imgur.upload(req.body.image, function(err, res) {
//     if (err) {
//       console.log("Error: ", err)
//     }
//     console.log("response: ", res);
//     // res.send(res.data)
//   })
// });

module.exports = router;