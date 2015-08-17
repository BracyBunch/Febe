var React = require('react');
var Link = require('react-router').Link


module.exports = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  
  render: function() {
    return (
      <div> <span> Contributors: </span>
        <span> 
        {
          this.props.contributors.map(function(contributor){
          return <Link to='#'><a className='contributor'>  {contributor} </a></Link>
          })
        }
        </span>
      </div>
    )
  }
});