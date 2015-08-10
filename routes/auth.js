var express = require('express');
var router = express.Router();
var passport = require('../middleware/auth');

router.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  res.send();
});

var set_user_kind = function(req, res, next) {
  if (req.body.user_kind) {
    req.session.user_kind = (req.body.user_kind in ['dev', 'rep']) ? req.body.user_kind : 'dev';
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
  res.send();
};

router.post('/login', set_user_kind, passport.authenticate('local'));

router.get('/facebook/login', set_user_kind, passport.authenticate('facebook', {'scope': ['email']}));
router.get('/facebook/callback', set_user_kind, set_provider('facebook'), handle_login, signal_complete);

router.get('/github/login', set_user_kind, passport.authenticate('github', {'scope': ['user:email']}));
router.get('/github/callback', set_user_kind, set_provider('github'), handle_login, signal_complete);

router.get('/linkedin/login', set_user_kind, passport.authenticate('linkedin', {'scope': ['r_emailaddress', 'r_basicprofile']}));
router.get('/linkedin/callback', set_user_kind, set_provider('linkedin'), handle_login, signal_complete);


module.exports = {
  'router': router
};
