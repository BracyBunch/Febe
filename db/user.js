var Promise = require('bluebird');
var db = require('./db');
var model = require('seraph-model');
var validator = require('validator');

var Project = require('./project');


/*
  [:member_of]-(:Project)
  [:follows]-(:Project)
  [:follows]-(:Organization)
  {kind: 'rep'}-[:owns]-(:Project)
  {kind: 'dev'}-[:skill]-(:Tag {kind: 'skill'})
  {kind: 'dev'}-[:interest]-(:Tag {kind: 'cause'})
 */
var User = model(db, 'User');
User.schema = {
  'kind': {'type': String, 'default': 'dev', 'enum': ['dev', 'rep']},
  'first_name': {'type': String, 'required': true},
  'last_name': {'type': String, 'required': true},
  'email': {'type': String, 'required': true},
  'github_id': {'type': String},
  'linkedin_id': {'type': String}
};
User.setUniqueKey('email');
User.useTimestamps();

User.on('validate', function(user, cb) {
  if (validator.isEmail(user.email)) {
    cb();
  } else {
    cb('Model is invalid');
  }
});

/**
 * Checks the database to see if a user with given email already exists
 * @param  {String} email
 * @return {Promise.<Boolean>}
 */
User.check_if_exists = function(email) {
  return new Promise(function(resolve, reject) {
    db.query('MATCH (user:User {email:{email}}) RETURN COUNT(user) > 0 AS exists', {'email': email}, function(err, row) {
      if (err) {
        reject(err);
        return;
      }

      resolve(row.exists);
    });
  });
};

/**
 * Creates a new user
 * @param  {Object} fields Fields to set on User
 * @param  {String} [fields.kind=dev] Type of User to create; dev or rep
 * @param  {String} fields.first_name
 * @param  {String} fields.last_name
 * @param  {String} fields.email
 * @param  {String} [fields.github_id]
 * @param  {String} [fields.linkedin_id]
 * @return {Promise.<User>}
 */
User.create = function(fields) {
  return new Promise(function(resolve, reject) {
    User.save(fields, function(err, user) {
      if (err) {
        reject(err);
        return;
      }

      resolve(user);
    });
  });
};

/**
 * Fetch a User including all Projects they are a member of
 * @param  {Integer} user_id Id of User
 * @return {Promise.<User>}
 */
User.with_projects = function(user_id) {
  return new Promise(function(resolve, reject) {
    var include = {
      'projects': {'model': Project, 'rel': 'member_of'}
    };
    User.query('MATCH (node:User) WHERE id(node)={id}', {'id': user_id}, {'include': include}, function(e, r) {
      if (e) {
        reject(e);
        return;
      }
      resolve(r[0]);
    });
  });
};

module.exports = User;
