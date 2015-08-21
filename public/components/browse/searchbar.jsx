var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var TextField = mui.TextField;
var FlatButton = mui.FlatButton;

module.exports = React.createClass({
  render: function(){
    return (
      <Paper zdepth={1}>
        <div>
          <TextField className="searchbar" style={{"width":"97.5%"}} hintText="Search for ..." />
        </div> 
      </Paper>
    )
  }
})