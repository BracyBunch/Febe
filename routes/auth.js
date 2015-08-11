var Promise = require('bluebird');
var express = require('express');
var router = express.Router();
var models = require('../db');
var passport = require('../middleware/auth');

var bcrypt = require('bcrypt');
var hash = Promise.promisify(bcrypt.hash, bcrypt);

router.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  res.send();
});

var set_user_kind = function(req, res, next) {
  if (req.body.user_kind || 'rep' in req.query) {
    req.session.user_kind = (req.body.user_kind === 'rep' || 'rep' in req.query) ? 'rep' : 'dev';
    req.session.save();
  }
  next();
};

var set_provider = function(provider) {
  return function(req, res, next) {
    res.locals.provider = provider;
    next();
  };
};

var handle_login = function(req, res, next) {
  passport.authenticate(res.locals.provider, function(err, user, info) {
    if (err === null && user !== false) {
      req.login(user, function() {
        req.session.user_kind = undefined;
        req.session.save();
        next();
      });
    } else if (info === 'LoginToAddOAuth') {
      res.status(409).send();
    }
  })(req, res, next);
};

var signal_complete = function(req, res) {
  if (!req.isAuthenticated) res.status(401);
  res.send();
};

router.post('/login', set_user_kind, passport.authenticate('local'), signal_complete);
router.post('/signup', set_user_kind, function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  if (!email || !password || !name) return res.status(401).send();

  models.User.check_if_exists(email).then(function(exists) {
    if (exists) return res.status(409).send();

    var user = {
      'kind': req.session.user_kind || 'dev',
      // 'name': req.body.first_name + ' ' + req.body.last_name,
      'name': req.body.name,
      'email': email,
      'links': []
    };

    hash(password, 10).then(function(encrypted) {
      user.password = encrypted;
      return models.User.save(user);
    }).then(function(user) {
      req.login(user, function() {
        req.session.user_kind = undefined;
        req.session.save();
        next();
      });
    }, function(err) {
      return res.status(401).send();
    });
  });
}, signal_complete);

router.get('/facebook/login', set_user_kind, passport.authenticate('facebook', {'scope': ['email']}));
router.get('/facebook/callback', set_user_kind, set_provider('facebook'), handle_login, signal_complete);

router.get('/github/login', set_user_kind, passport.authenticate('github', {'scope': ['user:email']}));
router.get('/github/callback', set_user_kind, set_provider('github'), handle_login, signal_complete);

router.get('/linkedin/login', set_user_kind, passport.authenticate('linkedin', {'scope': ['r_emailaddress', 'r_basicprofile']}));
router.get('/linkedin/callback', set_user_kind, set_provider('linkedin'), handle_login, signal_complete);


module.exports = {
  'router': router
};
