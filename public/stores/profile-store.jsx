var Reflux = require('reflux');
var Actions = require('../actions');
var ajax = require('../utils/fetch');

module.exports = Reflux.createStore({
  listenables: [Actions],
  getProfile: function(id) {
    return ajax('/user/' + id)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        this.userData = data;
        this.triggerChange();
      }.bind(this));
  },
  triggerChange: function(){
    this.trigger('change', this.userData);
  }
});
