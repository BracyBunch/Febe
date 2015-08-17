var _ = require('lodash');
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

router.post('/', function(req, res){
  console.log(req.user)
  if (!req.isAuthenticated()) return res.status(403).send();
  if (req.user.kind !== 'rep') return res.status(400).send('Must be a rep to create an organization');

  var required_fields = [
    'ein', 'name', 'description', 'website_url', 'location'
  ];

  if (!_.all(required_fields, function(field) {return field in req.body;})) return res.status(400).send();

  Organization.create({
    'ein': req.body.ein,
    'name': req.body.name,
    'description': req.body.description,
    'website_url': req.body.website_url,
    'donation_url': req.body.donation_url,
    'logo_url': req.body.logo_url,
    'location': req.body.location
  }, req.user.id).then(function(organization) {
    res.json(organization);
  }, function(err) {
    console.error(err);
    res.status(500).send();
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
