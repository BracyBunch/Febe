var _ = require('lodash');
var Promise = require('bluebird');
var url_parse = require('url').parse;
var validator = require('validator');
var models = require('../db');
var Project = models.Project;
var express = require('express');
var router = express.Router();

var validate_id = function(req, res, next) {
  var project_id = Number(req.params.project_id);
  if (Number.isNaN(project_id)) return res.status(400).send();
  req.params.project_id = project_id;
  next();
};

router.get('/search', function(req, res) {
  if ('tags' in req.query) {
    Project.find_by_tags(JSON.parse(req.query.tags), {'only_published': false, 'order_by': 'project.created DESC'}).then(function(projects) {
      res.json(projects);
    });
  } else {
    Project.with_extras(null, true).then(function(projects) {
      res.json(projects);
    });
  }
});

router.get('/:project_id', validate_id, function(req, res) {
  Project.with_extras(req.params.project_id, true).then(function(project) {
    // if (!project.published) {
    //   if (!req.isAuthenticated()) return res.status(403).send();
    //   Project.user_has_access(project, req.user).then(function(has_access) {
    //     if (!has_access) return res.status(403).send();
    //     res.json(project);
    //   }, function() {
    //     return res.status(500).send();
    //   });
    // } else {
    //   res.json(project);
    // }
    res.json(project);
  });
});

router.post('/', function(req, res) {
  if (!req.isAuthenticated() || req.user.kind !== 'rep') return res.status(403).send();

  var required_fields = [
    'organization_id', 'name', 'complete_by', 'description'
  ];

  if (!_.all(required_fields, function(field) {return field in req.body;})) return res.status(400).send();

  var organization_id = Number(req.body.organization_id);

  var links = [];
  if ('links' in req.body && Array.isArray(req.body.links) && req.body.links.length) {
    req.body.links.forEach(function(link) {
      if (validator.isURL(link, {'protocol': ['http', 'https']})) {
        var hostname = url_parse(link).hostname;
        var type = _.get({
          'facebook.com': 'facebook',
          'github.com': 'github',
          'linkedin.com': 'linkedin'
        }, hostname, 'other');

        links.push([type, link].join('|'));
      }
    });
  }

  Project.create({
    'name': req.body.name,
    'complete_by': req.body.complete_by,
    'description': req.body.description,
    'links': links
  }, organization_id, req.user.id).then(function(project) {
    if ('tech' in req.body && Array.isArray(req.body.tech) && req.body.tech.length) {
      Project.add_skills(project, req.body.tech.map(Number));
    }

    res.json(project);
  });
});

router.put('/:project_id', validate_id, function(req, res) {
  // Check permissions here
  var project_id = req.params.project_id;

  var async = {};

  var editable_fields = [
    'name', 'complete_by', 'description', 'links', 'published', 'active'
  ];

  var fields = _.pick(req.body, editable_fields);

  var relations = _.pick(req.body, ['tech']);

  if ('tech' in relations) {
    async.tech = Project.clear_skills(project_id).then(function() {
      return Project.add_skills(relations.tech.map(Number));
    });
  }

  Promise.props(async).then(function() {
    Project.update(project_id, fields).then(function() {
      res.send();
    });
  });
});

router.put('/:project_id/add_member/:user_id', validate_id, function(req, res) {
  var project_id = Number(req.params.project_id);
  var user_id = Number(req.params.user_id);
  if (Number.isNaN(user_id)) return res.status(400).send();

  if (!req.isAuthenticated) return res.status(403).send();

  Project.with_extras(project_id, {'owner': true}).then(function(project) {
    if (project.owner.id !== req.user.id) throw new Error('User doesn\'t have permission to add members');
    return Project.add_member(project_id, user_id).then(function() {
      res.status(201).send();
    });
  }, function(err) {
    res.status(400).send(err);
  });
});

module.exports = router;
