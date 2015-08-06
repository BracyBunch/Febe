var express = require('express');
var http = require('http');
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


// route for retrieving external feed data such as facebook, instagram, linkedin
// used in dashboard
router.get('/_insertFEEDroute', function(req, res) {
  var options = {
    host: 'socialMediaHost(fb, insta, linkedin)',
    path: '/api/v2/json/etc/etc/etc' + req.query.etc.etc
  };

  http.get(options, function(book) {
    var bodyChunks = [];
    book.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      res.send(body);
    });
  });

});

module.exports = router;
