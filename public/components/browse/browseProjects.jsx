var React = require('react');
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