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

  componentDidMount: function(){
    this.forceUpdate();
  },

  forceUpdate: function(data){
    console.log(data);
  },

  componentWillMount: function(){
    setTimeout(function(){this.calcTime()}.bind(this), 100)
  },

  calcTime: function(){
    console.log('\'calc\'')
    var now = new Date(Date.now()).toString();
    var lengthMs = this.props.end - this.props.start;
    var lengthInDays = (1.157407407 * Math.pow(10, -8)) * lengthMs;
    var projectStart = new Date(this.props.start);
    var projectEnd = new Date(this.props.end);
    projectStart = projectStart.toString();
    projectEnd = projectEnd.toString();

    this.setState({
      start: projectStart,
      end: projectEnd,
      length: lengthInDays.toFixed(1),
      now: now
    })
  },

  updateBio: function(event) {
    this.props.updateBio(event.target.value);
  },
  
  render: function() {
    return (
      <div>
      <span> Start date: {this.state.start} </span> <br/>
      <span> Elapsed time: {this.state.now} </span> <br/>
      <span> Desired completion date: {this.state.end} </span> <br/>
      <span> Time In Days Until Complete: {this.state.length} </span> <br/>
       Time Button: <button onClick={this.calcTime}>likerklikken</button>

      </div>
    )
  }
});