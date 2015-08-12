var React = require('react');
var ReactRouter = require('react-router');
//object that tells the router how we will keep track of where the user is
var HashHistory = require('react-router/lib/HashHistory').default;
//what to show on the page at any given time
var Router = ReactRouter.Router;
//object used to configure the router
var Route = ReactRouter.Route;
var Main = require('./components/main');
var Signupdev = require('./components/signupDevView');
var Signuporg = require('./components/signupOrgView');
var Termsofuse = require('./components/termsOfUse');
var Privacypolicy = require('./components/privacyPolicy');
var Dashboard = require('./components/dashboard');
var DevProfile = require('./components/profile/dev-profile-view');
var OrgProfile = require('./components/profile/org-profile-view');

module.exports = (
  <Router history={new HashHistory}>
    <Route path="/" component={Main}>
      <Route path="/signupdev" component={Signupdev} />
      <Route path="/signuporg" component={Signuporg} />
      <Route path="/termsofuse" component={Termsofuse} />
      <Route path="/privacypolicy" component={Privacypolicy} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/devprofile" component={DevProfile} />
      <Route path="/orgprofile" component={OrgProfile} />
    </Route>
  </Router>
);
