var React = require('react');
var Link = require('react-router').Link;
var Navigation = require('react-router').Navigation;
var history = require('../../utils/history');
var Thumbnail = require('../thumbnail/thumbnail');

module.exports = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      projectID: null,
      ThumbnailData: [],
    };
  },

  componentWillMount: function(){
    this.setState({
      projects: this.props.projects
    })
  },

  goToProject: function(projectID){
    sessionStorage.setItem('projectId', projectID);
    history.pushState({}, 'project' + projectID)
    // this.transitionTo('/project/' + projectID);
    {this.renderThumbnail()}
  },

  renderThumbnail: function(){
    return this.props.projects.map(function(thumbnailProps){
      return <Thumbnail {...thumbnailProps} />
    });
  },

  projectsList: function() {
    var that = this;
    return this.props.projects.map(function(thumbnailProps) {
      return (
        <div>
          <Thumbnail
           url={'/project/' + thumbnailProps.id}
           goToProject={that.goToProject} 
           header={thumbnailProps.name} 
           imageURL={that.props.orgURL} 
           description={thumbnailProps.description} 
           tags={thumbnailProps.skills} /> 
        </div> 
      )
    });
  },

  render: function() {
    return (
      <div>
         {this.projectsList()}
      </div>
    )
  }
});
