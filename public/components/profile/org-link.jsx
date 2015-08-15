var React = require('react');
var Link = require('react-router').Link


module.exports = React.createClass({
  getInitialState: function() {
    return {
      bio: ''
    };
  },

  updateBio: function(event) {
    this.props.updateBio(event.target.value);
  },
  
  render: function() {
    return (
      <div>
        <Link to='/joinorg'><button className='btn btn-success btn-joinOrg' type='button' onClick={this.props.joinOrg}>Join Organization</button></Link>
        <Link to='/createorg'><button className='btn btn-success btn-createOrg' type='button' onClick={this.props.createOrg}>Create Organization</button></Link>
      </div>
    )
  }
});