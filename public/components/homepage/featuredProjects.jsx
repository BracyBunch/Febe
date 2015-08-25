var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var RaisedButton = mui.RaisedButton;
var ThumbnailList = require('../thumbnail/thumbnailList');

module.exports = React.createClass({
  render: function(){
    return (
      <Paper zdepth={1}>
	      <div>
	        <div className="featured">Featured Projects & Organizations</div>
		    </div>
        <div>
          <ThumbnailList />
        </div> 
        <div style={{"paddingBottom":"10px"}} className="browse-button">
          <RaisedButton linkButton={true} href="#/browse" secondary={true} label="Browse More" />
        </div>
      </Paper >
    )
  }
})