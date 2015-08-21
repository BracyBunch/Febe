var React = require('react/addons');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var BrowseProjects = require('../components/browse/browseProjects');

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
    { type: MenuItem.Types.LINK, payload: '/', text: 'Home'},
    { type: MenuItem.Types.LINK, payload: '#/dashboard', text: 'Dashboard'},
    { type: MenuItem.Types.LINK, payload: '#/browse', text: 'Browse'},
    { type: MenuItem.Types.LINK, payload: '#/profile', text: 'My Profile'},
    { type: MenuItem.Types.SUBHEADER, text: 'Resources'},
    { route: '/', text: 'About'},
    { route: '/', text: 'Team'},
    { type: MenuItem.Types.LINK, payload: 'https://github.com/BracyBunch/Febe', text: 'GitHub'}
  ],
  render:function(){
    return (
      <div>
        <Header color={{"background-color":"#6E7FD5"}} generateMenu = {this.generateMenu}/>
        <div>
          <BrowseProjects />
        </div>
        <Footer />
      </div>
    )
  }
});