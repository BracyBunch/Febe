var React = require('react');
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var Router = require('react-router');
var Link = Router.Link;

var Participant = require('../components/profile/participant')
var Timeline = require('../components/profile/org-link')
var Description = require('../components/profile/org-link')
var ProjectTags = require('../components/profile/org-link')
var Contributors = require('../components/profile/org-link')
var ProjectMedia = require('../components/profile/org-link')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      title: 'Project Title',
      location: 'Project Location',
      bio: 'Project info',
      technology: [],
      projectData: [],
      managerData: [],
      repData: [],
      devData: [],
      swap: false
    };
  },

  render: function(){
    return (
      <div>
        <Header link='/' title='Browse'/>
        <div>
          <h3> {this.state.title} </h3> 
          <button className='btn btn-warning edit-follow'> Edit/Follow </button>
        </div>
          <Participant 
            repID={this.state.repID} />
          <Participant 
            managerID={this.state.managerID} />
          <button className='btn btn-warning'> Organization Link </button>
          <Timeline />
          <Description />
          <ProjectTags />
          <Contributors />
          <ProjectMedia />
        <Footer />
      </div>
    )
  },
});