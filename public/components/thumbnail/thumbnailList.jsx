var React = require('react');
var Reflux = require('reflux');
var Thumbnail = require('./thumbnail');
var GetProject = require('../../stores/project-store');
var Actions = require('../../actions');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(GetProject, 'onChange')
  ],
  getInitialState: function(){
    return {
      ThumbnailData: [{
        header: 'New Volunteer Signup',
        imageURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/HSUS_logo.svg/1280px-HSUS_logo.svg.png',
        description: 'Everything is awesome Everything is cool when youre part of a team Everything is awesome when were living our dream Everything is better when we stick together Side by side, you and I gonna win forever, lets party forever Were the same, Im like you, youre like me, were all working in harmony',
        projLink: ''
      }, {
        header: 'Run Tracker',
        imageURL: 'http://www.kelsey-seybold.com/about-us/in-the-community/publishingimages/komenlogo.png',
        description: 'Everything is awesome Everything is cool when youre part of a team Everything is awesome when were living our dream Everything is better when we stick together Side by side, you and I gonna win forever, lets party forever Were the same, Im like you, youre like me, were all working in harmony',
        projLink: ''
      }]
    }
  },
  componentWillMount: function(){
    // Actions.getProject();
  },
  onChange: function(event, thumbnailData){
    this.setState({thumbnailData: thumbnailData});
  },
  renderThumbnail: function(){
    return this.state.ThumbnailData.map(function(thumbnailProps){
      return <Thumbnail {...thumbnailProps} />
    });
  },
  render: function(){
    return <div className="eachThumbnail">
      {this.renderThumbnail()}
    </div> 
  }
});