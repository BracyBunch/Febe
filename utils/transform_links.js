var _ = require('lodash');
var url_parse = require('url').parse;
var validator = require('validator');

var transform_links = function(input_links, categorize) {
  categorize = (categorize === undefined) ? true : categorize;
  var links = [];

  input_links.forEach(function(link) {
    if (validator.isURL(link, {'protocol': ['http', 'https']})) {
      var hostname = url_parse(link).hostname;
      var type;

      if (categorize) {
        type = _.get({
          'facebook.com': 'facebook',
          'github.com': 'github',
          'linkedin.com': 'linkedin'
        }, hostname, 'other');
      } else {
        type = 'other';
      }

      links.push([type, link].join('|'));
    }
  });

  return links;
};

module.exports = transform_links;
