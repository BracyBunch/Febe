var React = require('react');

module.exports = React.createClass({

  getInitialState: function(){
    return {
      start: '',
      end: '',
      length: ''
    };
  },

  calcTime: function(){
    var now = new Date().getTime();
    var lengthMs = this.props.end - this.props.start;
    var lengthInDays = (1.157407407 * Math.pow(10, -8)) * lengthMs;
    var projectStart = new Date(this.props.start);
    var elapsed = now - projectStart;
    var elapsedInDays = (1.157407407 * Math.pow(10, -8)) * elapsed;
    var projectEnd = new Date(this.props.end);
    var days = (elapsedInDays < 0.6) ? 1 : elapsedInDays;
    projectStart = projectStart.toString();
    projectEnd = projectEnd.toString();

    return {
      start: projectStart,
      end: projectEnd,
      length: lengthInDays.toFixed(0),
      elapsed: days.toFixed(1)
    };
  },

  updateBio: function(event) {
    this.props.updateBio(event.target.value);
  },

  render: function() {
    var times = this.calcTime();
    return (
      <div>
        <span>Start Date: {times.start.slice(0, 15)}</span><br/>
        <span>Days Since Start: {times.elapsed}</span><br/>
        <span>Desired Completion Date: {times.end.slice(0, 15)}</span><br/>
        <span>Time In Days Until Complete: {times.length}</span><br/>
      </div>
    );
  }
});
