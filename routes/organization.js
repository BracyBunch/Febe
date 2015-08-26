var _ = require('lodash');
var Promise = require('bluebird');
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
    'logo_url': (req.body.logo_url.length) ? req.body.logo_url : null,
    'location': req.body.location
  }, req.user.id).then(function(organization) {
    TimelineEntry.create('create', req.user, 'Created organization', organization);

    if ('causes' in req.body && Array.isArray(req.body.causes) && req.body.causes.length) {
      Organization.add_causes(organization, req.body.causes.map(Number));
    }

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

router.put('/:organization_id', function(req, res) {
  // Check permissions here
  var organization_id = Number(req.params.organization_id);

  var async = {};

  var editable_fields = [
    'name', 'description', 'website_url', 'donation_url', 'logo_url', 'location'
  ];

  var fields = _.pick(req.body, editable_fields);

  var relations = _.pick(req.body, ['causes']);

  if ('causes' in relations) {
    async.causes = Organization.clear_causes(organization_id).then(function() {
      return Organization.add_causes(organization_id, relations.causes.map(Number));
    });
  }

  Promise.props(async).then(function() {
    Organization.update(organization_id, fields).then(function() {
      res.send();
    });
  });

});

router.put('/:organization_id/add_rep/:user_id', function(req, res) {
  var organization_id = Number(req.params.organization_id);
  var user_id = Number(req.params.user_id);

  Organization.add_rep(organization_id, user_id).then(function() {
    res.status(201).send();
  }, function(err) {
    res.status(400).json(err.message);
  });
});

module.exports = router;
