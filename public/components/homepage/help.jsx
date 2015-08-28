var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

module.exports = React.createClass({
  render: function(){
    return (
      <div className="help">
        <h4>Want to help us out?</h4> 
        <RaisedButton linkButton={true} href="#/browse" secondary={true} label="Contact Us" />
      </div>
    )
  }
})