var _ = require('lodash');
var Promise = require('bluebird');
var User = require('../db').User;
var express = require('express');
var router = express.Router();
var validator = require('validator');

var bcrypt = require('bcrypt');
var hash = Promise.promisify(bcrypt.hash, bcrypt);

router.get('/:id', function(req, res) {
  var id = Number(req.params.id);

  User.with_extras(id).then(function(user) {
    if (req.isAuthenticated() && req.user.id === id) user = _.extend(user, req.user);
    res.json(user);
  }, function() {
    res.status(400).send();
  });
});

router.delete('/remove', function(req, res){
  // access DB to remove a user
  res.send('New User Added');
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
