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

module.exports = Project;
