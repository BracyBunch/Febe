var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var EIN = require('./routes/ein');
// var ROUTE2 = require('./routes/bookInfo');
// var ROUTE3 = require('./routes/productImg');

// ***************** APP configure ******************
var app = express();

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use('/ein', EIN);
// app.use('/bookInfo', ROUTE2);
// app.use('/productImg', ROUTE3);

// catch 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send(err);
});

module.exports = app;
