var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var TextField = mui.TextField;
var FlatButton = mui.FlatButton;
var Autocomplete = require('../shared/autocomplete');

module.exports = React.createClass({
  propTypes: {
    'on_change': React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className="searchbar">
        <Paper zdepth={1}>
          <Autocomplete url="/tag/search?fragment=" placeholder="Search for projects" min_chars={2} on_change={this.props.on_change} />
        </Paper>
      </div>
    );
  }
});
