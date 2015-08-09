var _ = require('lodash');
var Promise = require('bluebird');
var db = require('../db');

var common = require('./common');

var Project = require('../models/project');
var User = require('../models/user');
var Tag = require('../models/tag');

/**
 * Create and save a new Project
 * @param  {Object}        fields               Fields to create Project with
 * @param  {Integer|Organization}  organization Organization or id
 * @param  {Integer|User}  owner                User or id of the Project owner
 * @return {Promise.<Project>}                  The newly created Project
 */
var create = function(fields, organization, owner) {
  if (organization === undefined) return Promise.reject(new Error('Organization not given.'));
  if (owner === undefined) return Promise.reject(new Error('Owner not given.'));

  return Project.save(fields).then(function(project) {
    return Promise.all([
      db.relate(organization, 'runs', project),
      db.relate(owner, 'owns', project)
    ]).then(function() {
      return project;
    });
  });
};

/**
 * Update a Project
 * @param  {Integer} [id]     Id of the Project to update, can be omitted if there is an id key in fields
 * @param  {Object} fields    Fields to update
 * @return {Promise.<Project>}
 */
var update = function(id, fields) {
  if (typeof id === 'object') {
    fields = id;
    id = fields.id;
  }

  return Project.read(id).then(function(project) {
    return Project.save(_.extend(project, fields, {'id': id}));
  });
};

/**
 * Removes fields that shouldn't be public
 * @param {Project}
 * @return {Project} Project with private fields removed
 */
var clean = common.clean_generator(Project);


/**
 * Adds a User as a member of Project
 * @param {Integer|Project}  project   Project object or id to add User to
 * @param {Integer|User}     member    User or id to add to Project
 */
var add_member = common.add_rel_generator('User', 'member_of', 'Project');

/**
 * Adds an array of Users as members of Project
 * @param {Integer|Project}      project  Project or id to add Users to
 * @param {Integer[]|Project[]}  members  Array of Users or ids to add to Project
 */
var add_members = common.add_rels_generator(add_member);

/**
 * Fetches one Project including specifed extras
 * @param  {Integer}        project_id      Id of the Project
 * @param  {Object|Boolean} [options=true]  Either an object with with the extras to include or true to include all extras
 * @return {Promise.<Project>}              Project with all specified models included
 */
var with_extras = function(project_id, options) {
  var include = {};
  if (options === undefined) options = true;

  if (options === true || options.members) include.members = {'model': User, 'rel': 'member_of', 'direction': 'in'};
  if (options === true || options.owner) include.owner = {'model': User, 'rel': 'owns', 'direction': 'in', 'many': false};
  if (options === true || options.skills) include.skills = {'model': Tag, 'rel': 'skill', 'direction': 'out', 'many': true};


  return Project.query('MATCH (node:Project) WHERE id(node)={id}', {'id': project_id}, {'include': include}).then(function(project) {
    project = project[0];

    if (project.members) project.members = _.map(project.members, User.clean);
    if (project.owner) project.owner = User.clean(project.owner);

    return project;
  });
};

/**
 * Find all projects with relationships to all specified Tag ids
 * @param  {Integer[]}  skill_ids   Array of Tag ids
 * @return {Promise.<Project[]>}    Array of Projects matching filter
 */
var find_by_skill = function(skill_ids) {
  var query = [
    'MATCH (tags:Tag {kind:"skill"}) WHERE id(tags) IN {tags}',
    'WITH COLLECT(tags) AS t',
    'MATCH (node:Project)-->(tags) WHERE ALL(tag IN t WHERE (node)-->(tag))'
  ].join(' ');

  return Project.query(query, {'tags': skill_ids});
};

module.exports = {
  'create': create,
  'update': update,
  'clean': clean,
  'add_member': add_member,
  'add_members': add_members,
  'with_extras': with_extras,
  'find_by_skill': find_by_skill
};
