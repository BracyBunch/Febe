var React = require('react');
var Link = require('react-router').Link
var Navigation = require('react-router').Navigation;

module.exports = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      projectID: null
    };
  },

  goToProject: function(projectID){
    this.transitionTo('/project/' + projectID);
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
