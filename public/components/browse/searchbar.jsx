var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var TextField = mui.TextField;
var FlatButton = mui.FlatButton;

module.exports = React.createClass({
  render: function(){
    return (
      <div className="searchbar">
        <Paper zdepth={1}>
          <TextField  style={{"width":"97.5%", "padding-left":"10px"}} hintText="Search for ..." />
        </Paper>
      </div>
    )
  }
})