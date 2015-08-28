var ajax = require('../../utils/fetch');

module.exports = {
  updateProject: function(url, data) {
    ajax(url, {method: 'PUT', body: JSON.stringify(data)})
    .then(function(data) {
      // call method with id returned from db
      // console.log(data);
    })
    .catch(function(error) {
      console.error('request failed: ', error);
    });
  }
};
