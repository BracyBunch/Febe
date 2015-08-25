var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var TextField = mui.TextField;
var FlatButton = mui.FlatButton;
var Autocomplete = require('../shared/autocomplete');

var SearchBar = React.createClass({
  propTypes: {
    'on_value_change': React.PropTypes.func.isRequired,
    'on_tag_change': React.PropTypes.func.isRequired
  },
  on_value_change: function(e) {
    this.props.on_value_change(e.target.value.trim());
  },
  render: function() {
    return (
      <div className="searchbar">
        <Paper zdepth={1}>
          <TextField type="text" fullWidth={true} onChange={this.on_value_change}/>
          <Autocomplete url="/tag/search?fragment=" placeholder="Search for tech/causes" min_chars={2} on_change={this.props.on_tag_change} alternate_tag_display={true}/>
        </Paper>
      </div>
    );
  }
});

module.exports = SearchBar;
