var React = require('react');
var Link = require('react-router').Link

module.exports = React.createClass({
  getInitialState: function() {
    return {
      ownerData: this.props.owner,
      verified: this.props.verified,
      description: "No description available",
      causes: this.props.causes     
    };
  },

  getDefaultProps: function() {
    return {
      causes: 'No causes specified'
    };
  },
  
  // create link to /user/:id with id as props.owner.id
  
  render: function() {
    return (
      <div>
        <p> 
          Organization: {this.props.name} (<a href={this.props.website}> {this.props.website}) </a>
        </p>
        <p> 
          EIN: {this.props.ein}
        </p>
        <p>
          Location: {this.props.location}
        </p>
        <p>
          Description: {this.props.description || this.state.description}
        </p>
        <p>
          Causes: {this.props.causes}
        </p>
        <p>
          Verified: {this.props.verified}
        </p>
      </div>
    )
  }
});
