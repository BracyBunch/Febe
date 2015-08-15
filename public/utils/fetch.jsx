var _ = require('lodash');

module.exports = function(url, options) {
  options = _.extend(options || {}, {
    'credentials': 'same-origin',
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return fetch(url, options).then(function(response) {
    return response.json();
  });
};
