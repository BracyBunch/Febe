var db = require('../db');
var model = require('seraph-model');
var validator = require('validator');

/*
  [:cause]-(:Tag {kind: 'cause'})
 */
var Organization = model(db, 'Organization');
Organization.schema = {
  'ein': {'type': String, 'required': true},
  'verified': {'type': Boolean, 'default': false},
  'name': {'type': String, 'required': true},
  'description': {'type': String, 'required': true},
  'website_url': {'type': String, 'required': true},
  'donation_url': {'type': String, 'default': null},
  'logo_url': {'type': String, 'default': null},
  'location': {'type': String, 'required': true}
};
Organization.setUniqueKey('ein');
Organization.useTimestamps();

Organization.on('validate', function(organization, cb) {
  var valid = true;
  valid = valid && validator.isURL(organization.website_url, {'protocol': ['http', 'https']});
  valid = valid && organization.donation_url === null || validator.isURL(organization.donation_url, {'protocol': ['http', 'https']});
  valid = valid && organization.logo_url === null || validator.isURL(organization.logo_url, {'protocol': ['http', 'https']});

  if (valid) {
    cb();
  } else{
    cb('Model is invalid');
  }
});

module.exports = Organization;
