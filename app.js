var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var bodyParser    = require('body-parser');

var session       = require('express-session');
var FileStore     = require('session-file-store')(session);
var passport      = require('./middleware/auth');

var auth          = require('./routes/auth');
var user          = require('./routes/user');
var ein           = require('./routes/ein');
var organization  = require('./routes/organization');
var project       = require('./routes/project');
var tag           = require('./routes/tag');

// ***************** APP configure ******************
var app = express();

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/')));
app.use(session({
  'secret': 'starman',
  'resave': false,
  'saveUninitialized': false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use('/auth', auth.router);

app.use('/ein', ein);
app.use('/user', user);
app.use('/organization', organization);
app.use('/project', project);
app.use('/tag', tag);


// catch 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send(err);
});

module.exports = app;
