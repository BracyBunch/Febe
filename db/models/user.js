var Promise = require('bluebird');
var db = require('../db');
var model = require('seraph-model');
var validator = require('validator');

/*
  [:member_of]-(:Project)
  [:follows]-(:Project)
  [:follows]-(:Organization)
  {kind: 'rep'}-[:owns]-(:Project)
  {kind: 'dev'}-[:skill]-(:Tag {kind: 'skill'})
  {kind: 'dev'}-[:interest]-(:Tag {kind: 'cause'})
 */
var User = model(db, 'User');
User.schema = {
  'kind': {'type': String, 'default': 'dev', 'enum': ['dev', 'rep']},
  'name': {'type': String, 'required': true},
  'email': {'type': String, 'required': true},
  'password': {'type': String},
  'can_message': {'type': Boolean, 'default': false},
  'links': {'type': Array, 'default': []},
  'github_id': {'type': String},
  'linkedin_id': {'type': String},
  'facebook_id': {'type': String}
};
User.setUniqueKey('email');
User.useTimestamps();

User.public_fields = [
  'id',
  'kind',
  'name',
  'can_message',
  'links'
];

User.on('validate', function(user, cb) {
  if (validator.isEmail(user.email)) {
    cb();
  } else {
    cb('Model is invalid');
  }
});

User.query = Promise.promisify(User.query, User);
User.save = Promise.promisify(User.save, User);
User.read = Promise.promisify(User.read, User);
User.where = Promise.promisify(User.where, User);


module.exports = User;
