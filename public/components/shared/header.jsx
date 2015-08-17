'use strict';
var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var AppBar = mui.AppBar;
var Router = require('react-router');
var SigninModal = require('../homepage/signinModal');
//renderable component
var Link = Router.Link;

// let React = require('react');
// let mui = require('mui');
// let ThemeManager = new mui.Styles.ThemeManager();

class Header extends React.Component {
  getChildContext() { 
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    return (
      <div>
        <AppBar>
          <Link to={this.props.link} className="navbar-brand">{this.props.title}</Link>
          <Link to={this.props.link2} className="navbar-brand">{this.props.title2}</Link>
          <Link to={this.props.link3} className="navbar-brand">{this.props.title3}</Link> 
          <SigninModal />     
        </AppBar>
      </div>
    )
  }
};

// Important!
Header.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Header;

// module.exports = React.createClass({
//   render: function() {
//     return (
//       <div className="header">
//         <nav className="navbar navbar-default">
//           <div className= "container-fluid">
//             <Link to={this.props.link} className="navbar-brand">{this.props.title}</Link>
//             <Link to={this.props.link2} className="navbar-brand">{this.props.title2}</Link>
//             <Link to={this.props.link3} className="navbar-brand">{this.props.title3}</Link>
//             <ul className="nav navbar-nav navbar-right">
//               <div id="login">
//                 <SigninModal/>
//               </div>
//             </ul>
//           </div>
//         </nav>
//       </div>
//     );
//   }
// });
