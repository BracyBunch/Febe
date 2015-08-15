var _ = require('lodash');

module.exports = function(url, options) {
  options = _.extend(options || {}, {
    'credentials': 'same-origin'
  });
  return fetch(url, options);
};
