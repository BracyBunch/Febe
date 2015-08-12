var Promise = require('bluebird');
var db = require('../db');
var skills = require('./skills.json');
var causes = require('./causes.json');

var queries = [];

skills.forEach(function(t) {
  queries.push(db.Tag.save({name: t.name, kind: 'skill'}));
});

causes.forEach(function(t) {
  queries.push(db.Tag.save({name: t.name, kind: 'cause'}));
});

Promise.all(queries).then(function(){console.log('done');});
