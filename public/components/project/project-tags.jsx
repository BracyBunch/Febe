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
          this.props.tags.map(function(tag){
            console.log(tag)
          return <span className='tag'> {tag} </span>
          })
        }
        </span>
      </div>
    )
  }
});