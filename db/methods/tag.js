var _ = require('lodash');
var db = require('../db');

var common = require('./common');

var Tag = require('../models/tag');

/**
 * Creates a new Tag
 * @param  {Object} fields  Fields to set on Tag
 * @return {Promise.<Tag>}
 */
var create = function(fields) {
  return Tag.save(fields);
};

/**
 * Update a Tag
 * @param  {Integer} [id]     Id of the Tag to update, can be omitted if there is an id key in fields
 * @param  {Object} fields    Fields to update
 * @return {Promise.<User>}
 */
var update = function(id, fields) {
  if (typeof id === 'object') {
    fields = id;
    id = fields.id;
  }

  return Tag.read(id).then(function(tag) {
    return Tag.save(_.extend(tag, fields), {'id': id});
  });
};

/**
 * Removes fields that shouldn't be public
 * @param {Tag}
 * @return {Tag} Tag with private fields removed
 */
var clean = common.clean_generator(Tag);

/**
 * Finds Tags beginning with fragment
 * @param  {String} fragment  String to search for
 * @param  {String} kind      Either skill or cause
 * @return {Tag[]}
 */
var find_by_fragment = function(fragment, kind, limit) {
  limit = (limit === undefined) ? 25 : limit;

  var query = {
    'name': new RegExp('.*' + fragment + '.*', 'i')
  };

  if (kind !== undefined) query.kind = kind;

  return Tag.where(query, {'limit': limit, 'orderBy': 'node.name'}).then(function(tags) {
    return tags.map(clean);
  });
};

module.exports = {
  'create': create,
  'update': update,
  'clean': clean,
  'find_by_fragment': find_by_fragment
};
