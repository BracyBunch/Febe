var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var Router = require('react-router');
var Actions = require('../actions');
var Reflux = require('reflux');
var Link = Router.Link;
var Participant = require('../components/profile/participant')
var Description = require('../components/organization/org-description')
var OrgMedia = require('../components/organization/org-media')
var OrgStore = require('../stores/org-store');


module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(OrgStore, 'onChange')
  ],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){ 
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState: function(){
    return {
      orgData: [],
      managerData: [],
      repData: [],
      devData: [],
      swap: false
    };
  },

  componentWillMount: function(){
    Actions.getOrg(sessionStorage.getItem('orgId'));
    // 411
  },

  onChange: function(event, data){
    console.log("data: ", data)
    this.setState({
      orgData: data
    });
  },
  

  render: function(){
    return (
      <div>
        <Header link='/' title='Browse'/>
        <div>
          <h3> {this.state.orgData.title} </h3> 
          <button className='btn btn-warning edit-follow'> Edit/Follow </button>
        </div>
          <button className='btn btn-warning'> Organization Link </button>
          <Description />
          <OrgMedia />
        <Footer />
      </div>
    )
  },
});