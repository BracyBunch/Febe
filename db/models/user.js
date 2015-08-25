var _ = require('lodash');
var Promise = require('bluebird');
var db = require('../db');
var model = require('seraph-model');
var validator = require('validator');

/*
  [:member_of]-(:Project)
  [:follows]-(:Project)
  [:follows]-(:User)
  [:follows]-(:Organization)
  {kind: 'rep'}-[:owns]-(:Project)
  {kind: 'dev'}-[:skill]-(:Tag {kind: 'skill'})
  {kind: 'dev'}-[:interest]-(:Tag {kind: 'cause'})
 */
var User = model(db, 'User');
User.schema = {
  'model': {'type': String, 'default': 'User'},
  'kind': {'type': String, 'default': 'dev', 'enum': ['dev', 'rep']},
  'first_name': {'type': String, 'required': true},
  'last_name': {'type': String},
  'email': {'type': String, 'required': true},
  'password': {'type': String},
  'can_message': {'type': Boolean, 'default': false},
  'title': {'type': String},
  'bio': {'type': String},
  'location': {'type': String},
  'links': {'type': Array, 'default': []},
  'github_id': {'type': String},
  'linkedin_id': {'type': String},
  'facebook_id': {'type': String},
  'avatar': {'type': String, 'default': 'assets/img/avatar.png'}
};
User.setUniqueKey('email');
User.useTimestamps();

User.public_fields = [
  'id',
  'model',
  'kind',
  'first_name',
  'last_name',
  'can_message',
  'title',
  'bio',
  'location',
  'links',
  'avatar'
];

User.on('validate', function(user, cb) {
  var valid = true;
  valid = valid && validator.isEmail(user.email);

  user.links.forEach(function(link) {
    valid = valid && validator.isURL(link.split('|', 2)[1], {'protocol': ['http', 'https']});
  });

  // valid = valid && user.avatar === null || validator.isURL(user.avatar, {'protocol': ['http', 'https']});

  if (valid) {
    cb();
  } else {
    cb('User is invalid');
  }
});

User.query = Promise.promisify(User.query, User);
User.save = Promise.promisify(User.save, User);
User.read = Promise.promisify(User.read, User);
User.where = Promise.promisify(User.where, User);

User.follow = function(user, target) {
  var user_id = _.get(user, 'id', user);
  var target_id = _.get(target, 'id', target);

  return db.has_rel(user_id, 'follows', target_id).then(function(exists) {
    if (!exists) return db.relate(user_id, 'follows', target_id);
  });
};

module.exports = User;
