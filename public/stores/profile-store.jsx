var Reflux = require('reflux');
var Actions = require('../actions');
var profileAPI = require('../utils/profile-api')

module.exports = Reflux.createStore({
  listenables:[Actions],
  getProfile: function(ID){
    return profileAPI.get('/user/' + ID)
      .then(function(json){
        this.userData = json.data;
        this.triggerChange();
      }.bind(this));
  },
  triggerChange: function(){
    this.trigger('change', this.userData);
  }
});