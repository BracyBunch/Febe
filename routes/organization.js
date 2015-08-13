var Organization = require('../db').Organization;
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
  Organization.create({
    'ein': 123456,
    'verified': false,
    'name': "Bob's Redmill",
    'description': "Really fun place to hang out with the boys",
    'website_url': 'www.imhere.com',
    'location': "Scottsdale, AZ"
  }, "TEST_OWNER").then(function(org){
    console.log("Org added:", org)
    res.send(org);
  });
});

router.delete('/remove', function(req, res){
  // access DB to add a new organization
  res.send();
});

router.put('/update', function(req, res){
  // access DB to add a new organization
  res.send();
});

module.exports = router;
