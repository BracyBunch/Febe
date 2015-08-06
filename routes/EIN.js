var express = require('express');
var http = require('http');
var request = require('request');
var router = express.Router();

// middleware usage
router.use(function timeLog(req, res, next){
  console.log('Time: ', Date.now());
  next();
});

// home route
router.get('/', function(req, res){
  res.send('Default page for: ', __dirname);
});

router.post('/____', function(req, res){
  res.send('Page for route');
})

// route for EIN verification
// Goodwill EIN: 530196517
router.get('/:ein', function(req, res) {
  var options = {
    url: 'https://projects.propublica.org/nonprofits/api/v1',
    params: '/organizations/' + req.params.ein + '.json',
    method: 'get'
  };

request(options, function(error, response, body){
    if (!error && response.statusCode === 200){
      console.log("body", body)
      res.send(body)
    } else if (!error && response.statusCode === 404){
      console.log('Not found')
      res.send(body)
    } else {
      console.log("error", error)
      res.send(body)
    }
  })
  // .on('data', function(chunk) {
  //       console.log("chunk", chunk)
  //     })
  // .on('response', function(response) {
  //       response.on('data', function(data){
  //         console.log("found data", data)
  //       })
  //     });
})

  // https.get(options, function(einInfo) {
  //   console.log(options);
  //   console.log('Querying EIN database with EIN: ', req.params.ein)
  //   var bodyChunks = [];
  //   einInfo.on('data', function(chunk) {
  //     bodyChunks.push(chunk);
  //   }).on('end', function() {
  //     var body = Buffer.concat(bodyChunks);
  //     console.log("total body", body)
  //     res.send(body);
  //   });
  // });

module.exports = router;
