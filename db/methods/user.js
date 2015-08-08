var _ = require('lodash');
var Promise = require('bluebird');
var db = require('../db');
var User = require('../models/user');
var Project = require('../models/project');
var Tag = require('../models/tag');

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
 * Adds Tag as a strength of User
 * @param {Integer|User}  user   User or id
 * @param {Integer|Tag}   skill  Tag or id
 */
var add_strength = function(user, skill) {
  return db.has_rel('User', user.id || user, 'strength', 'Tag', skill.id || skill).then(function(already_member) {
    if (already_member) throw new Error('User already has skill as a strength');

    return db.relate(user, 'strength', skill).then(function() {
      return true;
    });
  });
};

/**
 * Adds an array of Tags as strengths of User
 * @param {Integer|User}     user    User or id
 * @param {Integer[]|Tag[]}  skills  Array of Users or ids
 */
var add_strengths = function(user, skills) {
  var calls = [];

  skills.forEach(function(skill) {
    calls.push(add_strength(user, skill));
  });

  return Promise.all(calls);
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
  'add_strength': add_strength,
  'add_strengths': add_strengths,
  'with_projects': with_projects
};
