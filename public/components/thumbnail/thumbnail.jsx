var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  getInitialState: function(){
    return{
      hovering: false
    }
  },
  inset: function(){
    return (
      <div className="inset">
        <h4 style={{"color":"#f2f2f2"}} className="descriptionHeader">Description</h4>
        <div style={{"color":"#f2f2f2"}} className="insetDescription">
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
  strengthsList: function() {
    return this.props.tags.map(function(tags) {
      return <h4 className="label-inline"> <span className="label label-color">{tags}</span> </h4>;
    });
  },
  thumbnailInformation: function(){
    return (
      <div>
        <img className="thumbnail-image" src={this.props.imageURL}></img>
        <div className="caption">
          <h4>{this.props.header}</h4>
        </div>
      </div>
    )
  },
  render: function(){
    return (
      <Link to={this.props.projLink}>
        <div className="thumbnail-preview col-sm-4">
          <div className="thumbnail" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
            {this.state.hovering ? this.inset() : this.thumbnailInformation()}
          </div>
          <div className="thumbnail-tags">
            {this.strengthsList()}
          </div>
        </div>
      </Link>
    )
  }
});