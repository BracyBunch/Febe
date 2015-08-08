var _ = require('underscore');
var db = require('./db');

var Project = require('./models/project');
var User = require('./models/user');
var Organization = require('./models/organization');
var Tag = require('./models/tag');

module.exports = {
  'db': db,
  'User': _.extend(User, require('./methods/User')),
  'Organization': _.extend(Organization, require('./methods/organization')),
  'Project': _.extend(Project, require('./methods/project')),
  'Tag': _.extend(Tag, require('./methods/tag')),

  'test_dev': function() { return {'first_name': 'dev' + Math.floor(Math.random() * 100), 'last_name': 'gy!be', 'email': 'bojangles' + Math.floor(Math.random() * 100) + '@gmail.com'};},
  'test_rep': function() { return {'kind': 'rep', 'first_name': 'rep' + Math.floor(Math.random() * 100), 'last_name': 'aclu', 'email': '501c' + Math.floor(Math.random() * 100) + '@gmail.com'};},
  'test_org': function() { return {'name': 'org' + Math.floor(Math.random() * 100), 'description': 'making the world a better place for cats', 'website': 'http://adultcatfinder.com'};},
  'test_pro': function() { return {'name': 'pro' + Math.floor(Math.random() * 100), 'description': 'connect lonely cats', 'complete_by': Date.now()};},
  'test_tag': function() { return {'kind': 'skill', 'name': 'skill'+ Math.floor(Math.random() * 100)};}
};
