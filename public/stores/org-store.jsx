var Reflux = require('reflux');
var Actions = require('../actions');
var ajax = require('../utils/fetch');

module.exports = Reflux.createStore({
  listenables: [Actions],
  getOrg: function(id) {
    return ajax('/organization/' + id)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        this.orgData = data;
        this.triggerChange();
      }.bind(this));
  },
  triggerChange: function(){
    this.trigger('change', this.orgData);
  }
});
