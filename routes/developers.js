var user = require('../db/user')
var express = require('express');
var http = require('http');
var router = express.Router();

// middleware usage
router.use(function timeLog(req, res, next){
  console.log('Time: ', Date().toLocaleString());
  next();
});

// home route
 // * @param  {String} [fields.kind=dev] Type of User to create; dev or rep
 // * @param  {String} fields.first_name
 // * @param  {String} fields.last_name
 // * @param  {String} fields.email
 // * @param  {String} [fields.github_id]
 // * @param  {String} [fields.linkedin_id]
router.get('/', function(req, res){
  console.log("devs")
  // access DB to retrieve all developers
  res.send("devs");
});

router.get('/add', function(req, res){
  // generate random number to make unique email
  var randomEmail = function(){
    return Math.floor(Math.random(100000) * 100000).toString();
  };
  // create test user
  user.create({
    'kind': 'dev',
    'first_name': 'Test_first',
    'last_name': 'Test_last',
    'email': randomEmail().concat('@test.com')
  }).then(function(user){
    console.log("User created: ", user)
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
