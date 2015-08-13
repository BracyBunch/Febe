var Reflux = require('reflux');
var Actions = require('../actions');
var profileAPI = require('../utils/profile-api')

module.exports = Reflux.createStore({
  listenables:[Actions],
  getProfile: function(ID){
    console.log("this is the ID in get profile", ID)
    return profileAPI.get('/user/' + ID)
      .then(function(data){
        this.userData = data;
        this.triggerChange();
      }.bind(this));
  },
  triggerChange: function(){
    this.trigger('change', this.userData);
  }
});