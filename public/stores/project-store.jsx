var Reflux = require('reflux');
var Actions = require('../actions');
var ajax = require('../utils/fetch');

module.exports = Reflux.createStore({
  listenables: [Actions],
  getProject: function(id) {
    return ajax('/project/' + id)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        this.projectData = data;
        this.triggerChange();
      }.bind(this));
  },
  triggerChange: function(){
    this.trigger('change', this.projectData);
  }
});
