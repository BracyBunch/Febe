var _ = require('lodash');
var models = require('../db');
var Organization = models.Organization;
var express = require('express');
var router = express.Router();

var TimelineEntry = require('../db/models/timelineentry');

router.get('/search', function(req, res) {
  var fragment = req.query.fragment;
  if (!fragment || fragment.length < 2) return res.status(400).send();

  Organization.find_by_fragment(fragment).then(res.json.bind(res));
});

router.get('/:organization_id', function(req, res) {
  console.log('get got it')
  var organization_id = Number(req.params.organization_id);
  if (Number.isNaN(organization_id)) return res.status(400).send();

  Organization.with_extras(organization_id, true).then(function(organization) {
    res.json(organization);
  });
});

router.post('/', function(req, res) {
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
    TimelineEntry.create('create', req.user, 'created organization', organization);
    res.json(organization);
  }, function(err) {
    console.error(err);
    if (err.code === 'Neo.ClientError.Schema.ConstraintViolation') {
      res.status(409).send('Organization with EIN ' + req.body.ein + ' already exists');
    } else {
      res.status(500).send();
    }
  });
});

module.exports = router;
