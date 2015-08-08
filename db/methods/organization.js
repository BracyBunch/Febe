var Promise = require('bluebird');
var db = require('../db');
var Organization = require('../models/organization');

var create = function(fields, owner) {
  return new Promise(function(resolve, reject) {
    if (owner === undefined && owner.id === undefined) {
      reject('Owner not given.');
      return;
    }

    Organization.save(fields, function(err, organization) {
      if (err) return reject(err);

      db.relate(owner, 'owns', organization, function(err, relationship) {
        resolve(organization);
      });
    });
  });
};

module.exports = {
  'create': create
};
