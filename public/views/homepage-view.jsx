var React = require('react');
var Header = require('../components/shared/header');
var Landing = require('../components/homepage/landing');
var Footer = require('../components/shared/footer');
var Team = require('../components/homepage/team');
var Stack = require('../components/homepage/stack');
var Help = require('../components/homepage/help');
var AboutUs = require('../components/homepage/aboutUS');
var FeaturedProjects = require('../components/homepage/featuredProjects');


module.exports = React.createClass({
  render: function() {
    return (
      <div id="main">
        <section>
          <div className="fullscreen background-image">
            <Landing />
          </div>
        </section>
        <section>
          <div className="fullscreen">
            <div className="aboutUsMain">
             <AboutUs />
            </div>
            <div className="teamMain">
             <Team />
            </div>
          </div>
        </section>
        <section className="break-point">
          <div className="fullscreen">
            <div className="featuredMain">
              <FeaturedProjects/>
            </div>
            <div className="stackMain">
              <Stack />
            </div>
            <Help />
            <Footer />
          </div>
        </section>
      </div>
    );
  }
});
