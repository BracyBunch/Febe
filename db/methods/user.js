var _ = require('underscore');
var db = require('../db');
var User = require('../models/User');
var Project = require('../models/Project');

/**
 * Checks the database to see if a User with given email already exists
 * @param  {String} email
 * @return {Promise.<Boolean>}
 */
var check_if_exists = function(email) {
  return db.query('MATCH (user:User {email:{email}}) RETURN COUNT(user) > 0 AS exists', {'email': email}).then(function(row) {
    return row.exists;
  });
};

/**
 * Creates a new User
 * @param  {Object} fields              Fields to set on User
 * @param  {String} [fields.kind=dev]   Type of User to create; dev or rep
 * @param  {String} fields.first_name
 * @param  {String} fields.last_name
 * @param  {String} fields.email
 * @param  {String} [fields.github_id]
 * @param  {String} [fields.linkedin_id]
 * @return {Promise.<User>}
 */
var create = function(fields) {
  return User.save(fields);
};

/**
 * Update a User
 * @param  {Integer} [id]     Id of the User to update, can be omitted if there is an id key in fields
 * @param  {Object} fields    Fields to update
 * @return {Promise.<User>}
 */
var update = function(id, fields) {
  if (typeof id === 'object') {
    fields = id;
    id = fields.id;
  }

  return User.read(id).then(function(user) {
    return User.save(_.extend(user, fields, {'id': id}));
  });
};

/**
 * Fetch a User including all Projects they are a member of
 * @param  {Integer} user_id  Id of User
 * @return {Promise.<User>}
 */
var with_projects = function(user_id) {
  var include = {
    'projects': {'model': Project, 'rel': 'member_of'}
  };

  return User.query('MATCH (node:User) WHERE id(node)={id}', {'id': user_id}, {'include': include});
};

module.exports =  {
  'check_if_exists': check_if_exists,
  'create': create,
  'update': update,
  'with_projects': with_projects
};
