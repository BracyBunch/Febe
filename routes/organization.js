var Organization = require('../db').Organization;
var express = require('express');
var router = express.Router();

router.get('/:organization_id', function(req, res){
  var organization_id = Number(req.params.organization_id);
  if (Number.isNaN(organization_id)) return res.status(400).send();

  Organization.with_extras(organization_id, true).then(function(organization) {
    res.json(organization);
  });
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
