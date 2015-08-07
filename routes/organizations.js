var orgs = require('../db/organization')
var express = require('express');
var http = require('http');
var router = express.Router();

// home route
router.get('/', function(req, res){
  // access DB to retrieve all organizations
  res.send(res);
});

router.post('/add', function(req, res){
  if (req.body.Test === 'test'){
    return res.send("Test done...");
  }
  // access DB to add a new organization
  res.send();
})

router.delete('/remove', function(req, res){
  // access DB to add a new organization
  res.send();
})

router.put('/update', function(req, res){
  // access DB to add a new organization
  res.send();
})

module.exports = router;
