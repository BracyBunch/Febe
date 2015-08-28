var Promise = require('bluebird');
var db = require('../db');
var skills = require('./skills.json');
var causes = require('./causes.json');

var queries = [];

queries.push(db.Tag.where({'name': skills[0].name}).then(function(rows) {
  if (rows.length){
    console.log('Not installing fixtures');
    process.exit();
  }

  skills.forEach(function(t) {
    queries.push(db.Tag.save({name: t.name, kind: 'skill'}));
  });

  causes.forEach(function(t) {
    queries.push(db.Tag.save({name: t.name, kind: 'cause'}));
  });
}));

Promise.all(queries).then(function(){console.log('done');});
