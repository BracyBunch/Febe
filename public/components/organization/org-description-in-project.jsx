var React = require('react');
var Link = require('react-router').Link

module.exports = React.createClass({
  getInitialState: function() {
    return {
      ownerData: this.props.owner,
      verified: this.props.verified
    };
  },
  
  // create link to /user/:id with id as props.owner.id
  
  render: function() {
    return (
      <div>
        <p> 
          Organization: {this.props.name}
        </p>
        <p> 
          EIN: {this.props.ein}
        </p>
        <p>
          Location: {this.props.location}
        </p>
        <p>
          Website: <a href={this.props.website}> {this.props.website} </a>
        </p>

      </div>
    )
  }
});
