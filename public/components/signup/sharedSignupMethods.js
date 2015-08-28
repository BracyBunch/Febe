module.exports = {
  addFields: function(divId, newLink) {
    if (this.addlFieldCount === this.addlFieldLimit) {
      console.error("Maximum fields added");
    } else {
      var newdiv = document.createElement('div');
      newdiv.innerHTML = this.newLinkHTML;
      document.getElementById(divId).appendChild(newdiv);
      this.addlFieldCount++;
    }
  },
  authenticate: function(){
    var auth = true;
    if(auth){
      return "/dashboard";
    } else{
      return "/";
    }
  }
};
