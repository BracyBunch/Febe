var _ = require('lodash');
var Promise = require('bluebird');
var db = require('../db');

var common = require('./common');

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
 * Removes fields that shouldn't be public
 * @param {User}
 * @return {User} User with private fields removed
 */
var clean = common.clean_generator(User);

/**
 * Adds Tag as a strength of User
 * @param {Integer|User}  user   User or id
 * @param {Integer|Tag}   skill  Tag or id
 */
var add_strength = common.add_rel_generator('User', 'strength', 'Tag', true);

/**
 * Adds an array of Tags as strengths of User
 * @param {Integer|User}     user    User or id
 * @param {Integer[]|Tag[]}  skills  Array of Tags or ids
 */
var add_strengths = common.add_rels_generator(add_strength);

/**
 * Adds Tag as an interest of User
 * @param {Integer|User}  user   User or id
 * @param {Integer|Tag}   interest  Tag or id
 */
var add_interest = common.add_rel_generator('User', 'interest', 'Tag', true);

/**
 * Adds an array of Tags as interests of User
 * @param {Integer|User}     user    User or id
 * @param {Integer[]|Tag[]}  interest  Array of Tags or ids
 */
var add_interests = common.add_rels_generator(add_interest);


/**
 * Fetches one User including specifed extras
 * @param  {Integer}        user_id         Id of the User
 * @param  {Object|Boolean} [options=true]  Either an object with with the extras to include or true to include all extras
 * @return {Promise.<User>}                 Project with all specified models included
 */
var with_extras = function(user_id, options) {
  var include = {};
  if (options === undefined) options = true;

  if (options === true || options.projects) include.projects = {'model': Project, 'rel': 'member_of'};
  if (options === true || options.strengths) include.strengths = {'model': Tag, 'rel': 'strength'};
  if (options === true || options.interests) include.interests = {'model': Tag, 'rel': 'interest'};


  return User.query('MATCH (node:User) WHERE id(node)={id}', {'id': user_id}, {'include': include}).then(function(user) {
    return user[0];
  });
};

module.exports =  {
  'check_if_exists': check_if_exists,
  'create': create,
  'update': update,
  'clean': clean,
  'add_strength': add_strength,
  'add_strengths': add_strengths,
  'add_interest': add_interest,
  'add_interests': add_interests,
  'with_extras': with_extras
};
