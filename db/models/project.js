var Promise = require('bluebird');
var db = require('../db');
var model = require('seraph-model');

/*
  ?[:cause]-(:Tag {kind: 'cause'})
  [:skill]-(:Tag {kind: 'skill'})
 */
var Project = model(db, 'Project');
Project.schema = {
  'name': {'type': String, 'required': true},
  'complete_by': {'type': Date, 'required': true},
  'description': {'type': String, 'required': true},
  'links': {'type': Array, 'default': []},
  'published': {'type': Boolean, 'default': false},
  'active': {'type': Boolean, 'default': true}
};
Project.useTimestamps();

Project.public_fields = [
  'id',
  'name',
  'complete_by',
  'description',
  'links',
  'published',
  'active'
];

Project.query = Promise.promisify(Project.query, Project);
Project.save = Promise.promisify(Project.save, Project);
Project.read = Promise.promisify(Project.read, Project);
Project.where = Promise.promisify(Project.where, Project);

module.exports = Project;
