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
  // access DB to retrieve all developers
  res.send(res);
});

router.post('/add', function(req, res){
  // access DB to add a new developer
  res.send('New Dev Added');
})

router.delete('/remove', function(req, res){
  // access DB to add a new developer
  res.send('New Dev Added');
})

router.put('/update', function(req, res){
  // access DB to add a new developer
  res.send('New Dev Added');
})


module.exports = router;
