var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var Router = require('react-router');
var ThumbnailList = require('../components/thumbnail/thumbnailList');
var Link = Router.Link;

var TimelineStore = require('../stores/timeline-store');
var Actions = require('../actions');

var TimelineEntry = require('../components/dashboard/timelineEntry');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(TimelineStore, 'onLoad')],
  componentWillMount: function(){
    Actions.getTimeline();
  },
  getInitialState: function() {
    return {
      'timeline': []
    };
  },
  onLoad: function(event, timeline) {
    this.setState({'timeline': timeline});
  },
  render: function(){
    return (
      <div>
        <Header link='/' title='Browse'/>
        <div className="timeline-container">
          {this.state.timeline.map(function(entry) {
            return <TimelineEntry key={entry.entry.id} entry={entry}/>;
          }.bind(this))}
        </div> 
        <Link to="/devprofile"><button className="btn btn-primary">Dev Profile Temp</button></Link>
        <Link to="/createproject"><button className="btn btn-primary">Create Project Temp</button></Link>
        <Link to="/npprofile"><button className="btn btn-primary">Np Profile Temp</button></Link>
        <div>
          <ThumbnailList />
        </div> 
        <Footer />
      </div>
    );
  }
});
