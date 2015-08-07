var express = require('express');
var request = require('request');
var router = express.Router();

// middleware usage
router.use(function timeLog(req, res, next){
  console.log('Getting EIN information...')
  // console.log('Time: ', Date().toLocaleString());
  next();
});

// route for EIN verification
// Goodwill EIN: 530196517
router.get('/:ein', function(req, res) {
  var options = {
    url: 'https://projects.propublica.org/nonprofits/api/v1/organizations/'
    + req.params.ein + '.json',
    method: 'GET'
  };

// custom callback
var callback = function(error, response, body){
    if (!error && response.statusCode === 200){
      var body = JSON.parse(body);
      res.send(body.organization)
    } else if (!error && response.statusCode === 404){
      res.send(body)
    } else {
      console.log("error", error)
      res.send(body)
    }
  };

// call to server to receive data
request(options, callback);

});


module.exports = router;
