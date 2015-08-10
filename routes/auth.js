var express = require('express');
var router = express.Router();
var passport = require('../middleware/auth');
// var models = require('../db');


router.get('/logout', function(req, res) {
  req.logout();
  res.send();
});

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
        next();
      });
    } else if (info === 'LoginToAddOAuth') {
      res.status(409).send();
    }
  })(req, res, next);
};

var signal_complete = function(req, res) {
  res.send();
};

router.get('/facebook/login', passport.authenticate('facebook', {'scope': ['email']}));
router.get('/facebook/callback', set_provider('facebook'), handle_login, signal_complete);

router.get('/github/login', passport.authenticate('github', {'scope': ['user:email']}));
router.get('/github/callback', set_provider('github'), handle_login, signal_complete);

router.get('/linkedin/login', passport.authenticate('linkedin', {'scope': ['r_emailaddress', 'r_basicprofile']}));
router.get('/linkedin/callback', set_provider('linkedin'), handle_login, signal_complete);


module.exports = {
  'router': router
};
