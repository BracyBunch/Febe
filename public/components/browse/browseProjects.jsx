var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var RaisedButton = mui.RaisedButton;
var ThumbnailList = require('../thumbnail/thumbnailList');
var SearchBar = require('./searchbar');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <div >
          <SearchBar />
        </div>
        <div>
          <ThumbnailList />
        </div> 
      </div> 
    )
  }
})