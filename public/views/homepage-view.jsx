var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var Header = require('../components/shared/header');
var Landing = require('../components/homepage/landing');
var Footer = require('../components/shared/footer');
var Team = require('../components/homepage/team');
var Stack = require('../components/homepage/stack');
var Help = require('../components/homepage/help');
var AboutUs = require('../components/homepage/aboutUS');
var FeaturedProjects = require('../components/homepage/featuredProjects');


module.exports = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){ 
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  generateMenu: [
      {
        type: MenuItem.Types.LINK, 
        payload: '/', 
        text: 'Home'
      },
      {
        type: MenuItem.Types.LINK, 
        payload: '/', 
        text: 'Browse'
      },
      { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
      { route: '/', text: 'About' },
      { route: '/', text: 'Team' },
      { 
        type: MenuItem.Types.LINK, 
        payload: 'https://github.com/BracyBunch/Febe', 
        text: 'GitHub' 
      }
  ],
  render: function(){
    return (
      <div id="main">
        <section>
          <div className="fullscreen background-image">
            <Header generateMenu = {this.generateMenu}/>
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
        <section>
          <div className="featuredMain">
            <FeaturedProjects/>
          </div>
        </section>
        <section>
          <div>   
            <div className="stackMain">
              <Stack />
            </div>
            <Help />
            <Footer />
          </div>
        </section>
      </div>
    )
  },
});