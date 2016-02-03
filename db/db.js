var Promise = require('bluebird');
var seraph = require('seraph');
var options = {};

if (process.env.GRAPHSTORY_URL) {
  var url = require('url').parse(process.env.GRAPHSTORY_URL);

  options = {
    server: process.env.GRAPHSTORY_URL,
    user: process.env.GRAPHSTORY_USER,
    pass: process.env.GRAPHSTORY_PW
    // server: url.protocol + '//' + url.host,
    // user: url.auth.split(':')[0],
    // pass: url.auth.split(':')[1]
  };
} else {
  options = {
    'user': 'neo4j',
    'pass': 'febe'
  };
}

var db = seraph(options);
db.query = Promise.promisify(db.query);
db.relate = Promise.promisify(db.relate);

/**
 * Check if there is a relationship of the specified type between two nodes
 * @param  {Integer}  start_id  Id of the start node
 * @param  {String}   rel_name  Name of the relationship
 * @param  {Integer}  end_id    Id of the end node
 * @return {Boolean}
 */
db.has_rel = function(start_id, rel_name, end_id) {
  var query = [
    'MATCH (start) WHERE id(start)={start_id}',
    'MATCH (end) WHERE id(end)={end_id} AND (start)-[:' + rel_name + ']->(end)',
    'RETURN COUNT(end)>0 AS exists'
  ].join(' ');

  return db.query(query, {'start_id': start_id, 'rel_name': rel_name, 'end_id': end_id}).then(function(row) {
    return row.exists;
  });
};

module.exports = db;
