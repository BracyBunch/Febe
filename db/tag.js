// var Promise = require('bluebird');
var seraph = require('seraph');
var model = require('seraph-model');
var db = seraph();

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
  'kind': {'type': String, 'required': true, 'enum': ['skill', 'cause']},
  'name': {'type': String, 'required': true}
};
Tag.setUniqueKey('name');
Tag.useTimestamps();

module.exports = Tag;
