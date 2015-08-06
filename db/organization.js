// var Promise = require('bluebird');
var db = require('./db');
var model = require('seraph-model');

/*
  [:cause]-(:Tag {kind: 'cause'})
 */
var Organization = model(db, 'Organization');
Organization.schema = {
  'ein': {'type': String, 'required': false},
  'verified': {'type': Boolean, 'default': false},
  'name': {'type': String, 'required': true},
  'description': {'type': String, 'required': true},
  'website_url': {'type': String, 'required': true},
  'donation_url': {'type': String, 'default': null}
};
Organization.useTimestamps();

module.exports = Organization;
