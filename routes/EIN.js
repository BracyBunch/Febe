var express = require('express');
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
