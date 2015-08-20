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
      <div> <span> Technology: </span>
        <span> 
        {
          this.props.tags.map(function(obj){
            return <span className='tag'> {obj['name']} </span>
            })
        }
        </span>
      </div>
    )
  }
});