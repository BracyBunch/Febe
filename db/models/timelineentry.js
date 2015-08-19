var Promise = require('bluebird');
var db = require('../db');
var model = require('seraph-model');


var TimelineEntry = model(db, 'TimelineEntry');
TimelineEntry.schema = {
  'model': {'type': String, 'default': 'TimelineEntry'},
  'event': {'type': String, 'required': true, 'enum': ['create', 'update']},
  'text': {'type': String}
};
TimelineEntry.useTimestamps();

TimelineEntry.public_fields = [
  'model',
  'text'
];

TimelineEntry.query = Promise.promisify(TimelineEntry.query, TimelineEntry);
TimelineEntry.save = Promise.promisify(TimelineEntry.save, TimelineEntry);
TimelineEntry.read = Promise.promisify(TimelineEntry.read, TimelineEntry);
TimelineEntry.where = Promise.promisify(TimelineEntry.where, TimelineEntry);

TimelineEntry.create = function(event, from, text, to) {
  from = from.id || from;
  if (to !== undefined) to = to.id || to;

  var query = {
    'event': event,
    'text': text
  };

  return TimelineEntry.save(query).then(function(entry) {
    var calls = [db.relate(entry, 'entry_from', from)];

    if (to) calls.push(db.relate(entry, 'entry_to', to));

    return Promise.all(calls);
  });
};

module.exports = TimelineEntry;
