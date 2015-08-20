var React = require('react');
var Link = require('react-router').Link


module.exports = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  
  render: function() {
    return (
      <div> <span> Technology: </span>
        <span> 
        {
          this.props.tags.map(function(obj){
            console.log('obj', obj)
            return <span className='tag'> {obj['name']} </span>
            })
        }
        </span>
      </div>
    )
  }
});