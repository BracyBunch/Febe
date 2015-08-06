// var Promise = require('bluebird');
var seraph = require('seraph');
var db = seraph();

var User = require('./user');
var Organization = require('./organization');
var Project = require('./project');
var Tag = require('./tag');

module.exports = {
  'db': db,
  'User': User,
  'Organization': Organization,
  'Project': Project,
  'Tag': Tag,

  'test_dev': function() { return {'first_name': 'dev' + Math.floor(Math.random() * 100), 'last_name': 'gy!be', 'email': 'bojangles' + Math.floor(Math.random() * 100) + '@gmail.com'};},
  'test_rep': function() { return {'kind': 'rep', 'first_name': 'rep' + Math.floor(Math.random() * 100), 'last_name': 'aclu', 'email': '501c' + Math.floor(Math.random() * 100) + '@gmail.com'};},
  'test_org': function() { return {'name': 'org' + Math.floor(Math.random() * 100), 'description': 'making the world a better place for cats', 'website': 'http://adultcatfinder.com'};},
  'test_pro': function() { return {'name': 'pro' + Math.floor(Math.random() * 100), 'description': 'connect lonely cats'};},
  'test_tag': function() { return {'kind': 'skill', 'name': 'skill'+ Math.floor(Math.random() * 100)};}
};
