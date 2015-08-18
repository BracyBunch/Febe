var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return{
      hovering: false
    }
  },
  inset: function(){
    return (
      <div className="inset">
        <h4 className="descriptionHeader">Description</h4>
        <div className="insetDescription">
          {this.props.description}
        </div>
      </div>
    )
  },
  handleMouseEnter: function(){
    this.setState({hovering: true});
  },
  handleMouseLeave: function(){
    this.setState({hovering: false});
  },
  render: function(){
    return (
        <div className="thumbnail-preview row">
          <div className="thumbnail" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
            <img src={this.props.imageURL}></img>
            <div className="caption">
              <h3>{this.props.header}</h3>
              {this.state.hovering ? this.inset() : null}
            </div>
          </div>
        </div>
    )
  }
});