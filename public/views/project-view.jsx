var React = require('react');
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var Router = require('react-router');
var Link = Router.Link;

var Participant = require('../components/profile/participant')
var Timeline = require('../components/project/project-timeline')
var Description = require('../components/project/project-description')
var ProjectTags = require('../components/project/project-tags')
var Contributors = require('../components/project/project-contrib')
var ProjectMedia = require('../components/project/project-media')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      projectData: {
        title: 'Project Title',
        location: 'Project Location',
        description: 'Project info',
        tags: ['javascript', 'angular', 'bootstrap', 'html'],
        contributors: ['john', 'bob', 'joe', 'sally']
      },
      managerData: [],
      repData: [],
      devData: [],
      swap: false
    };
  },

  componentWillMount: function(){
    //gather project data here
  },

  render: function(){
    return (
      <div>
        <Header link='/' title='Browse'/>
        <div>
          <h3> {this.state.projectData.title} </h3> 
          <button className='btn btn-warning edit-follow'> Edit/Follow </button>
        </div>
          <Participant 
            repID={this.state.repID} />
          <Participant 
            managerID={this.state.managerID} />
          <button className='btn btn-warning'> Organization Link </button>
          <Timeline />
          <Description />
          <ProjectTags tags={this.state.projectData.tags} />
          <Contributors contributors={this.state.projectData.contributors} />
          <ProjectMedia />
        <Footer />
      </div>
    )
  },
});