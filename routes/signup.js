var express = require('express');
var http = require('http');
var router = express.Router();

// middleware usage
router.use(function timeLog(req, res, next){
  console.log('Time: ', Date().toLocaleString());
  next();
});

// home route

router.get('/signup', function(req, res){
  // sign up 
  res.send();
});

router.post('/', function(req, res){
  res.send();
})

module.exports = router;
