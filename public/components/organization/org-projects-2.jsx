var React = require('react');
var Link = require('react-router').Link
var Navigation = require('react-router').Navigation;
var Thumbnail = require('../thumbnail/thumbnail')

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
    this.transitionTo('/project/' + projectID);
    {this.renderThumbnail()}
  },

  renderThumbnail: function(){
    return this.props.projects.map(function(thumbnailProps){
      return <Thumbnail {...thumbnailProps} />
    });
  },

  nothing: function(){
    var header = '';
    var imageURL = '';
    var description = '';
    var tags = '';
  },

  render: function() {
    var that = this;
    return (
    <div>
    {this.props.projects.map(function(obj){
        return (
        <div className='org-view-project' onClick={that.goToProject.bind(that, obj['id'])}>
         Project: {obj['name']} <br/>
         Description: {obj['description']} <br/>
         Active: {obj['active'].toString()}
        </div>
        )
      })
    }
    </div> )
    }
});
