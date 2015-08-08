var Promise = require('bluebird');
var db = require('../db');
var Organization = require('../models/organization');

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
