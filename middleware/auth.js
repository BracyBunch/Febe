var Promise = require('bluebird');
var models = require('../db');
var passport = require('passport');

var bcrypt = require('bcrypt');
var hash = Promise.promisify(bcrypt.hash, bcrypt);
var compare = Promise.promisify(bcrypt.compare, bcrypt);

var GithubStrategy = require('passport-github2').Strategy;
var LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var LocalStrategy = require('passport-local').Strategy;

var keys = {};

if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_ID) {
  keys.FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
  keys.FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
} else {
  keys = require('../keys');
}

var GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback';
var LINKEDIN_CALLBACK_URL = process.env.LINKEDIN_CALLBACK_URL || 'http://localhost:3000/auth/linkedin/callback';
var FACEBOOK_CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/auth/facebook/callback';

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.read(id).then(function(user) {
    done(null, {
      'id': user.id,
      'kind': user.kind,
      'email': user.email,
      'name': user.name
    });
  }, done);
});

var oauth_login_or_create_generator = function(service) {
  return function(req, accessToken, refreshToken, profile, done) {
    var query = {'email': profile.emails[0].value};
    query[service + '_id'] = profile.id;

    models.User.where(query, {'limit': 1, 'any': true}).then(function(user) {
      if (!user.length) {
        user = {};
        user[service + '_id'] = profile.id;
        user.kind = req.session.user_kind || 'dev';
        user.name = profile.displayName;
        user.email = (profile.emails.length) ? profile.emails[0].value : null;
        user.links = [];
        if (service === 'linkedin') user.links.push(service + '|' +profile._json.publicProfileUrl);
        if (service === 'github') user.links.push(service + '|' + profile.profileUrl);
        if (service === 'facebook') user.links.push(service + '|' + 'https://facebook.com/' + profile.id);

        models.User.save(user).then(function(user) {
          done(null, user);
        });
      } else {
        user = user[0];

        if (user[service + '_id'] === undefined) {
          if (req.isAuthenticated()) {
            user[service + '_id'] = profile.id;
            models.User.update(user).then(function(user) {
              done(null, user);
            });
          } else {
            done(null, false, 'LoginToAddOAuth');
          }
        } else {
          done(null, user);
        }
      }
    });
  };
};

passport.use(new FacebookStrategy({
    'clientID': keys.FACEBOOK_APP_ID,
    'clientSecret': keys.FACEBOOK_APP_SECRET,
    'callbackURL': FACEBOOK_CALLBACK_URL,
    'profileFields': ['id', 'displayName', 'emails', 'profileUrl'],
    'passReqToCallback': true
  }, oauth_login_or_create_generator('facebook')));

passport.use(new GithubStrategy({
    'clientID': keys.GITHUB_APP_ID,
    'clientSecret': keys.GITHUB_APP_SECRET,
    'callbackURL': GITHUB_CALLBACK_URL,
    'passReqToCallback': true
  }, oauth_login_or_create_generator('github')));

passport.use(new LinkedinStrategy({
  'clientID': keys.LINKEDIN_APP_ID,
  'clientSecret': keys.LINKEDIN_APP_SECRET,
  'callbackURL': LINKEDIN_CALLBACK_URL,
  'state': true,
  'scope': ['r_emailaddress', 'r_basicprofile'],
  'passReqToCallback': true
}, oauth_login_or_create_generator('linkedin')));

passport.use(new LocalStrategy({
  'usernameField': 'email',
  'passReqToCallback': true
}, function(req, email, password, done) {
  models.User.where({'email': email}).then(function(user) {
    if (!user.length) {
      user = {
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
        done(null, user);
      }, function(err) {
        done(null, false, err);
      });
    } else {
      user = user[0];
      compare(password, user.password).then(function(matches) {
        done(null, (matches) ? user : false, (matches) ? undefined : 'Wrong password');
      });
    }
  });
}));

module.exports = passport;
