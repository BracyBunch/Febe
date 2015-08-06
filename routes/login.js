var express = require('express');
var http = require('http');
var router = express.Router();

// middleware usage
router.use(function timeLog(req, res, next){
  console.log('Time: ', Date().toLocaleString());
  next();
});

// home route
router.get('/', function(req, res){
  var username = req.params.username;
  var password = req.params.password;
  res.send();
});

module.exports = router;
