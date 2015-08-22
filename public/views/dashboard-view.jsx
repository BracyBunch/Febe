var React = require('react');
var Reflux = require('reflux');
var Footer = require('../components/shared/footer');
var Router = require('react-router');
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
        <div className="timeline-container">
          {this.state.timeline.map(function(entry) {
            return <TimelineEntry key={entry.entry.id} entry={entry}/>;
          }.bind(this))}
        </div>
        <Link to="/profile"><button className="btn btn-primary">Profile</button></Link>
        <Link to="/createproject"><button className="btn btn-primary">Create Project</button></Link>
        <Link to="/createorg"><button className="btn btn-primary">Create Organization</button></Link>
        <Footer />
      </div>
    );
  }
});
