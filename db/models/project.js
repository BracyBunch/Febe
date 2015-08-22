var Promise = require('bluebird');
var db = require('../db');
var model = require('seraph-model');

/*
  [:skill]-(:Tag {kind: 'skill'})
 */
var Project = model(db, 'Project');
Project.schema = {
  'model': {'type': String, 'default': 'Project'},
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
  'model',
  'name',
  'complete_by',
  'description',
  'links',
  'published',
  'active',
  'created',
  'skills'
];

Project.addComputedField('skills', function(project, cb) {
  db.query('MATCH (p:Project)-[:skill]-(tags:Tag) where id(p)={project_id} RETURN tags', {'project_id': project.id}).then(function(tags) {
    cb(null, tags);
  }, console.error);
});

Project.query = Promise.promisify(Project.query, Project);
Project.save = Promise.promisify(Project.save, Project);
Project.read = Promise.promisify(Project.read, Project);
Project.where = Promise.promisify(Project.where, Project);

module.exports = Project;
