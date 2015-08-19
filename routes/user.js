var _ = require('lodash');
var Promise = require('bluebird');
var models = require('../db');
var User = models.User;
var express = require('express');
var router = express.Router();
var validator = require('validator');

var bcrypt = require('bcrypt');
var hash = Promise.promisify(bcrypt.hash, bcrypt);

router.get('/timeline', function(req, res) {
  if (!req.isAuthenticated()) return res.status(403).send();

  var query = [
    'MATCH (user:User) WHERE id(user)={user_id}',
    'MATCH (entry),(followed) WHERE (user)-[:follows]->(followed)<-[:entry_from|:entry_to]-(entry:TimelineEntry)',
    'OR (user)-[:follows]->(followed)-[:owns]->(:Organization)<-[:entry_from|:entry_to]-(entry:TimelineEntry)',
    'MATCH (entry)-[:entry_to]-(entry_to)',
    'MATCH (entry)-[:entry_from]-(entry_from)',
    'RETURN DISTINCT entry, followed, entry_to, entry_from',
    'ORDER BY entry.created DESC'
  ];

  models.db.query(query.join(' '), {'user_id': req.user.id}).then(function(rows) {
    var data = [];
    rows.forEach(function(row) {
      data.push({
        'entry': row.entry,
        'from': models[row.entry_from.model].clean(row.entry_from),
        'to': (row.entry_to !== undefined) ? models[row.entry_to.model].clean(row.entry_to) : undefined
      });
    });

    res.json(data);
  }, console.error);
});

router.get('/:id', function(req, res) {
  var id = Number(req.params.id);

  User.with_extras(id).then(function(user) {
    if (req.isAuthenticated() && req.user.id === id) user = _.extend(user, req.user);
    res.json(user);
  }, function() {
    res.status(400).send();
  });
});

router.put('/', function(req, res){
  if (!req.isAuthenticated()) return res.status(403).send();

  var async = {};

  var editable_fields = [
    'kind', 'first_name', 'last_name', 'email', 'password',
    'can_message', 'title', 'bio', 'location', 'links',
    'strengths', 'interests'
  ];

  var fields = _.pick(req.body, editable_fields);

  if ('password' in fields) {
    async.password = hash(fields.password, 10).then(function(encrypted) {
      return encrypted;
    });
  }

  if ('email' in fields) {
    if (validator.isEmail(fields.email) && fields.email !== req.user.email) {
      async.email = User.check_if_exists(fields.email).then(function(exists) {
        return (!exists) ? fields.email : req.user.email;
      });
    } else {
      delete fields.email;
    }
  }
  if ('strengths' in fields) {
    async.strengths = User.clear_strengths(req.user.id).then(function() {
      return User.add_strengths(req.user.id, fields.strengths.map(function(strength) {return Number(strength);}));
    });
  }

  if ('interests' in fields && fields.interests.length) {
    async.interests = User.clear_interests(req.user.id).then(function() {
      return User.add_interests(req.user.id, fields.interests.map(function(interest) {return Number(interest);}));
    });
  }

  Promise.props(async).then(function(slow_fields) {
    if ('password' in slow_fields) fields.password = slow_fields.password;
    if ('email' in slow_fields) fields.email = slow_fields.email;
    User.update(req.user.id, fields).then(function() {
      res.send();
    });
  });
});


module.exports = router;
