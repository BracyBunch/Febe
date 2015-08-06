var Promise = require('bluebird');
var seraph = require('seraph');
var model = require('seraph-model');
var db = seraph();

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
  'first_name': {'type': String, 'required': true},
  'last_name': {'type': String, 'required': true},
  'email': {'type': String, 'required': true},
  'github_id': {'type': String},
  'linkedin_id': {'type': String}
};
User.setUniqueKey('email');
User.useTimestamps();
User.check_if_exists = function(email) {
  return new Promise(function(resolve, reject) {
    db.query('MATCH (user:User {email:{email}}) RETURN COUNT(user) > 0 AS exists', {'email': email}, function(err, row) {
      if (err) {
        reject(err);
        return;
      }

      resolve(row.exists);
    });
  });
};
User.create = function(fields) {
  return new Promise(function(resolve, reject) {
    User.check_if_exists(fields.email).then(function(exists) {
      if (exists) {
        reject('User already exists with given email.');
        return;
      }

      User.save(fields, function(err, user) {
        if (err) {
          reject(err);
          return;
        }

        resolve(user);
      });
    });
  });
};
User.with_projects = function(user_id) {
  return new Promise(function(resolve, reject) {
    var include = {
      'projects': {'model': Project, 'rel': 'member_of'}
    };
    User.query('MATCH (node:User) WHERE id(node)={id}', {'id': user_id}, {'include': include}, function(e, r) {
      if (e) {
        reject(e);
        return;
      }
      resolve(r[0]);
    });
  });
};

module.exports = User;
