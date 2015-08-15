var React = require('react');
var ReactRouter = require('react-router');
//object that tells the router how we will keep track of where the user is
var HashHistory = require('react-router/lib/HashHistory').default;
//what to show on the page at any given time
var Router = ReactRouter.Router;
//object used to configure the router
var Route = ReactRouter.Route;
var Main = require('./components/main');
var Signup = require('./views/signupView');
var Termsofuse = require('./components/shared/termsOfUse');
var Privacypolicy = require('./components/shared/privacyPolicy');
var Dashboard = require('./views/dashboard-view');
var DevProfile = require('./views/dev-profile-view');
var NpProfile = require('./views/np-profile-view');

module.exports = (
  <Router history={new HashHistory}>
    <Route path="/" component={Main}>
      <Route name="signupdev" path="/signupdev" component={Signup} kind="dev" />
      <Route name="signupnp" path="/signupnp" component={Signup} kind="rep" />
      <Route name="termsofuse" path="/termsofuse" component={Termsofuse} />
      <Route name="privacypolicy" path="/privacypolicy" component={Privacypolicy} />
      <Route name="dashboard" path="/dashboard" component={Dashboard} />
      <Route name="devprofile" path="/devprofile" component={DevProfile} />
      <Route name="npprofile" path="/npprofile" component={NpProfile} />
    </Route>
  </Router>
);
