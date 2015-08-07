var user = require('../db/user')
var express = require('express');
var http = require('http');
var router = express.Router();

// home route
router.get('/', function(req, res){
  // access DB to retrieve all users
  res.send("Users");
});

router.post('/add', function(req, res){
  if (req.body.Test === 'test'){
    return res.send("Test done...");
  }
  // create test user
  user.create(req.body).then(function(user){
    console.log("User added")
  });
  // access DB to add a new user
  res.send('New User Added');
})

router.delete('/remove', function(req, res){
  // access DB to remove a user
  res.send('New User Added');
})

router.put('/update', function(req, res){
  // access DB to update a user
  res.send('New User Added');
})


module.exports = router;
