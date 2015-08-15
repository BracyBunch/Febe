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
  render: function(){
    return (
      <div>
        <Header link='/' title='Browse'/>
          <Participant />
          <Participant />
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