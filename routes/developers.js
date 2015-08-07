var user = require('../db/user')
var express = require('express');
var http = require('http');
var router = express.Router();

router.get('/', function(req, res){
  // access DB to retrieve all developers
  res.send("devs");
});

router.post('/add', function(req, res){
  // generate random number to make unique email
  var randomEmail = function(){
    return Math.floor(Math.random(100000) * 100000).toString();
  };
  if (req.body === 'test'){
    return res.send("Test done...");
  }
  // create test user
  user.create({
    'kind': 'dev',
    'first_name': 'Test_first',
    'last_name': 'Test_last',
    'email': randomEmail().concat('@test.com')
  }).then(function(user){
    console.log("User added")
  });
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
