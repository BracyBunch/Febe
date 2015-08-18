var Reflux = require('reflux');
var Actions = require('../actions');
var ajax = require('../utils/fetch');

module.exports = Reflux.createStore({
  listenables: [Actions],
  getTimeline: function() {
    return ajax('/user/timeline').then(function(response) {
      return response.json();
    }).then(function(data) {
      this.timelineData = data;
      this.triggerChange();
    }.bind(this));
  },
  triggerChange: function(){
    this.trigger('change', this.timelineData);
  }
});
