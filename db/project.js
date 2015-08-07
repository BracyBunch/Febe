var Promise = require('bluebird');
var db = require('./db');
var model = require('seraph-model');

var User = require('./user');
var Tag = require('./tag');

/*
  ?[:cause]-(:Tag {kind: 'cause'})
  [:skill]-(:Tag {kind: 'skill'})
 */
var Project = model(db, 'Project');
Project.schema = {
  'name': {'type': String, 'required': true},
  'description': {'type': String, 'required': true},
  'published': {'type': Boolean, 'default': false}
};
Project.useTimestamps();

/**
 * Create and save a new Project
 * @param  {Object} fields   Fields to create Project with
 * @param  {Integer|User} owner User object or id of the Project owner
 * @return {Promise.<Project>}          The newly created Project
 */
Project.create = function(fields, owner) {
  return new Promise(function(resolve, reject) {
    if (owner === undefined && owner.id === undefined) {
      reject('Owner not given.');
      return;
    }

    Project.save(fields, function(err, project) {
      if (err) {
        reject(err);
        return;
      }

      db.relate(owner, 'owns', project, function(err, relationship) {
        resolve(project);
      });
    });
  });
};

/**
 * Adds a User as a member of Project
 * @param {Integer|Project} project Project object or id to add User to
 * @param {Integer|User} member  User or id to add to Project
 */
Project.add_member = function(project, member) {
  return new Promise(function(resolve, reject) {
    db.relate(member, 'member_of', project, function(err, relationship) {
      if (err) {
        reject(err);
        return;
      }

      resolve(relationship);
    });
  });
};

/**
 * Fetches one Project including specifed extras
 * @param  {Integer} project_id Id of the Project
 * @param  {Object|Boolean} [options=true]    Either an object with with the extras to include or true to include all extras
 * @return {Promise.<Project>}            Project with all specified models included
 */
Project.with_extras = function(project_id, options) {
  return new Promise(function(resolve, reject) {
    var include = {};
    if (options === undefined) options = true;

    if (options === true || options.members) include.members = {'model': User, 'rel': 'member_of', 'direction': 'in'};
    if (options === true || options.owner) include.owner = {'model': User, 'rel': 'owns', 'direction': 'in', 'many': false};
    if (options === true || options.skills) include.skills = {'model': Tag, 'rel': 'skill', 'direction': 'out', 'many': true};


    Project.query('MATCH (node:Project) WHERE id(node)={id}', {'id': project_id}, {'include': include}, function(err, project) {
      if (err) {
        reject(err);
        return;
      }

      resolve(project[0]);
    });
  });
};

/**
 * Find all projects with relationships to all specified Tag ids
 * @param  {Integer[]} skill_ids Array of Tag ids
 * @return {Promise.<Project[]>}           Array of Projects matching filter
 */
Project.find_by_skill = function(skill_ids) {
  return new Promise(function(resolve, reject) {
    var query = [
      'MATCH (tags:Tag {kind:"skill"}) WHERE id(tags) IN {tags}',
      'WITH COLLECT(tags) as t',
      'MATCH (node:Project)-->(tags) WHERE ALL(tag IN t WHERE (node)-->(tag))'
    ].join(' ');
    Project.query(query, {'tags': skill_ids}, function(err, projects) {
      if (err) {
        reject(err);
        return;
      }

      resolve(projects);
    });
  });
};

module.exports = Project;
