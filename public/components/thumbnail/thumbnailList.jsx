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
        description: 'Everything is awesome Everything is cool when youre part of a team Everything is awesome when were living our dream Everything is better when we stick together Side by side, you and I gonna win forever...',
        projLink: '',
        tags:['Angular', 'HTML', 'CSS']
      }, {
        header: 'Run Tracker',
        imageURL: 'http://www.kelsey-seybold.com/about-us/in-the-community/publishingimages/komenlogo.png',
        description: 'Everything is awesome Everything is cool when youre part of a team Everything is awesome when were living our dream Everything is better when we stick together Side by side, you and I gonna win forever...',
        projLink: '',
        tags:['iOS', 'Android', 'Javascript']
      }, {
        header: 'Custom App for New Exhibit',
        imageURL: 'http://www.annenbergfoundation.org/sites/default/files/slideshow/moma.png',
        description: 'Everything is awesome Everything is cool when youre part of a team Everything is awesome when were living our dream Everything is better when we stick together Side by side, you and I gonna win forever...',
        projLink: '',
        tags:['HTML', 'CSS', 'Jquery', 'Node']
      }, {
        header: 'New Tank Tempurature Monitors',
        imageURL: 'http://www.hagginoaks.com/wp-content/uploads/2015/07/MONTERAY-BAY.png',
        description: 'Everything is awesome Everything is cool when youre part of a team Everything is awesome when were living our dream Everything is better when we stick together Side by side, you and I gonna win forever...',
        projLink: '',
        tags:['Python', 'Javascript']
      },{
        header: 'Online Ticket Sales',
        imageURL: 'https://www.nationalhellenicmuseum.org/wp-content/uploads/2012/10/aic-logo.png',
        description: 'Everything is awesome Everything is cool when youre part of a team Everything is awesome when were living our dream Everything is better when we stick together Side by side, you and I gonna win forever...',
        projLink: '',
        tags:['Angular', 'RoR', 'Ruby']
      },{
        header: 'New Course Distribution Network',
        imageURL: 'http://www.roomtoread.org/document.doc?id=133',
        description: 'Everything is awesome Everything is cool when youre part of a team Everything is awesome when were living our dream Everything is better when we stick together Side by side, you and I gonna win forever...',
        projLink: '',
        tags:['PHP', 'HTML', 'CSS']
      },{
        header: 'Inventory Platform Integration',
        imageURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Goodwill_Industries_Logo.svg/561px-Goodwill_Industries_Logo.svg.png',
        description: 'Everything is awesome Everything is cool when youre part of a team Everything is awesome when were living our dream Everything is better when we stick together Side by side, you and I gonna win forever...',
        projLink: '',
        tags:['RoR', 'Ruby']
      },{
        header: 'Implement New Database Structure',
        imageURL: 'http://www.vivient.com/images/la_philharmonic_logo.png',
        description: 'Everything is awesome Everything is cool when youre part of a team Everything is awesome when were living our dream Everything is better when we stick together Side by side, you and I gonna win forever...',
        projLink: '',
        tags:['MongoDB', 'Node', 'Express', 'Javascript']
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