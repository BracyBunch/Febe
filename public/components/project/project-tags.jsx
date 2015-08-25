var React = require('react');
var Link = require('react-router').Link


module.exports = React.createClass({
  getInitialState: function() {
    return {
      tags: this.props.tags
    };
  },
  
  render: function() {

    return (
      <div> <span> {this.props.title}: </span>
        <span> 
        {
          this.props.tags.map(function(tag){
            return <font className='label-inline label label-color tag'> {tag['name']} </font>
            })
        }
        </span>
      </div>
    )
  }
});