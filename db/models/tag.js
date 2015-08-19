var Promise = require('bluebird');
var db = require('../db');
var model = require('seraph-model');

/*
  get list of skill for project:
    match (skills)<-[:skill]-(project:Project) where id(project)={id} return skills

  get list of projects for skill:
    match (projects:Project)-[:skill]-(tag:Tag) where id(tag)={id} return projects

  autocomplete tag:
    match (tags:Tag) where tags.name=~'{text}.*' return tags
 */

var Tag = model(db, 'Tag');
Tag.schema = {
  'model': {'type': String, 'default': 'Tag'},
  'kind': {'type': String, 'required': true, 'enum': ['skill', 'cause']},
  'name': {'type': String, 'required': true}
};
Tag.setUniqueKey('name');
Tag.useTimestamps();

Tag.public_fields = [
  'id',
  'model',
  'kind',
  'name'
];

Tag.query = Promise.promisify(Tag.query, Tag);
Tag.save = Promise.promisify(Tag.save, Tag);
Tag.read = Promise.promisify(Tag.read, Tag);
Tag.where = Promise.promisify(Tag.where, Tag);

module.exports = Tag;
