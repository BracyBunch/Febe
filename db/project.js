var Promise = require('bluebird');
var seraph = require('seraph');
var model = require('seraph-model');
var db = seraph();

var User = require('./user');

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
Project.create = function(fields, owner_id) {
  return new Promise(function(resolve, reject) {
    if (owner_id === undefined) {
      reject('Owner id not given.');
      return;
    }

    Project.save(fields, function(err, project) {
      if (err) {
        reject(err);
        return;
      }

      db.relate(owner_id, 'owns', project.id, function(err, relationship) {
        resolve(project);
      });
    });
  });
};
Project.add_member = function(project_id, member_id) {
  return new Promise(function(resolve, reject) {
    db.relate(member_id, 'member_of', project_id, function(err, relationship) {
      if (err) {
        reject(err);
        return;
      }

      resolve(relationship);
    });
  });
};
Project.with_all_contributors = function(project_id) {
  return new Promise(function(resolve, reject) {
    var include = {
      'members': {'model': User, 'rel': 'member_of', 'direction': 'in'},
      'owner': {'model': User, 'rel': 'owns', 'direction': 'in', 'many': false}
    };
    Project.query('MATCH (node:Project) WHERE id(node)={id}', {'id': project_id}, {'include': include}, function(err, project) {
      if (err) {
        reject(err);
        return;
      }

      resolve(project[0]);
    });
  });
};
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
