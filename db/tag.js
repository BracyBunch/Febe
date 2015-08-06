// var Promise = require('bluebird');
var seraph = require('seraph');
var model = require('seraph-model');
var db = seraph();

var Tag = model(db, 'Tag');
Tag.schema = {
  'kind': {'type': String, 'required': true, 'enum': ['skill', 'cause']},
  'name': {'type': String, 'required': true}
};
Tag.setUniqueKey('name');
Tag.useTimestamps();

module.exports = Tag;
