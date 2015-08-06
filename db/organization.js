// var Promise = require('bluebird');
var seraph = require('seraph');
var model = require('seraph-model');
var db = seraph();

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
