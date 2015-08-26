var React = require('react');
var Link = require('react-router').Link


module.exports = React.createClass({

  getInitialState: function(){
    return {
      start: '',
      end: '',
      length: ''
    }
  },

  componentWillMount: function(){
    setTimeout(function(){this.calcTime()}.bind(this), 500)
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

    this.setState({
      start: projectStart,
      end: projectEnd,
      length: lengthInDays.toFixed(0),
      elapsed: days.toFixed(1)
    })
  },

  updateBio: function(event) {
    this.props.updateBio(event.target.value);
  },
  
  render: function() {
    return (
      <div>
      <span> Start Date: {this.state.start.slice(0, 15)} </span> <br/>
      <span> Days Since Start: {this.state.elapsed} </span> <br/>
      <span> Desired Completion Date: {this.state.end.slice(0, 15)} </span> <br/>
      <span> Time In Days Until Complete: {this.state.length} </span> <br/>
      </div>
    )
  }
});