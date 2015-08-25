var React = require('react');
var Link = require('react-router').Link


module.exports = React.createClass({
  getInitialState: function() {
    return {
      tags: this.props.tags
    };
  },
  
  render: function() {
    var tagList = this.props.tags.map(function(tag) {
      return <span className="label label-color">{tag['name']}</span>
    });
    return (
      <div> 
        <span>{this.props.title}: </span>
        {tagList}
      </div>
    );
  }
});