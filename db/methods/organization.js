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

module.exports = {
  'create': create
};
