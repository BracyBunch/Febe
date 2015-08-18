var React = require('react');
var Header = require('../components/shared/header');
var Landing = require('../components/homepage/landing');
var Footer = require('../components/shared/footer');
var Team = require('../components/homepage/team');
var Stack = require('../components/homepage/stack');
var Help = require('../components/homepage/help');
var FeaturedProjects = require('../components/homepage/featuredProjects');

module.exports = React.createClass({
  render: function(){
    return (
      <div id="main">
        <section>
          <div className="fullscreen background-image">
            <Header link='/' title='About' link2="/" title2='Browse' link3='/' title3='Team'/>
            <Landing />
          </div>
        </section>
        <section>
          <div className="fullscreen">
            <FeaturedProjects />
          </div>
        </section>
        <section>
          <div className="fullscreen">
            <Team />
            <Stack />
            <Help />
            <Footer />
          </div>
        </section>
      </div>
    )
  },
});