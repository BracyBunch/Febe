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
  generateMenu: [],
  whichMenu: function(){
    window.localStorage.getItem('userId') ?
      this.generateMenu.push(
        { type: MenuItem.Types.LINK, payload: '/', text: 'Home'},
        { type: MenuItem.Types.LINK, payload: '#/dashboard', text: 'Dashboard'},
        { type: MenuItem.Types.LINK, payload: '#/browse', text: 'Browse'},
        { type: MenuItem.Types.LINK, payload: '#/devprofile', text: 'My Profile'},
        { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
        { route: '/', text: 'About'},
        { route: '/', text: 'Team'},
        { type: MenuItem.Types.LINK, payload: 'https://github.com/BracyBunch/Febe', text: 'GitHub' } 
      ):
      this.generateMenu.push(
        { type: MenuItem.Types.LINK, payload: '/', text: 'Home'},
        { type: MenuItem.Types.LINK, payload: '#/browse', text: 'Browse'},
        { type: MenuItem.Types.SUBHEADER, text: 'Resources'},
        { route: '/', text: 'About'},
        { route: '/', text: 'Team'},
        { type: MenuItem.Types.LINK, payload: 'https://github.com/BracyBunch/Febe', text: 'GitHub'}
      )
  },
  componentWillMount: function(){
    this.whichMenu();
  },
  render: function(){
    return (
      <div id="main">
        <section>
          <div className="fullscreen background-image">
            <Header color={{"backgroundColor": "rgba(0,0,255,0.2)"}} generateMenu = {this.generateMenu}/>
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
    )
  },
});