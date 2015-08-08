var _ = require('lodash');
var Promise = require('bluebird');
var db = require('../db');
var Organization = require('../models/organization');

/**
 * Create and save a new Organization
 * @param  {Object}        fields    Fields to create Organization with
 * @param  {Integer|User}  owner     User object or id of the Organization owner
 * @return {Promise.<Organization>}  The newly created Organization
 */
var create = function(fields, owner) {
  if (owner === undefined) return Promise.reject('Owner not given.');

  return Organization.save(fields).then(function(organization) {
    return db.relate(owner, 'owns', organization).then(function() {
      return organization;
    });
  });
};

/**
 * Update an Organization
 * @param  {Integer} [id]     Id of the Organization to update, can be omitted if there is an id key in fields
 * @param  {Object} fields    Fields to update
 * @return {Promise.<Organization>}
 */
var update = function(id, fields) {
  if (typeof id === 'object') {
    fields = id;
    id = fields.id;
  }

  return Organization.read(id).then(function(organization) {
    return Organization.save(_.extend(organization, fields, {'id': id}));
  });
};

module.exports = {
  'create': create,
  'update': update
};
