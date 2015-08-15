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
var CreateProject = require('./views/create-project');
var NpProfile = require('./views/np-profile-view');
var Createorg = require('./views/create-org-view');
var Joinorg = require('./views/join-org-view');
var Organization = require('./views/org-view');
var Project = require('./views/project-view');

module.exports = (
  <Router history={new HashHistory}>
    <Route path="/" component={Main}>
      <Route name="signupdev" path="/signupdev" component={Signup} kind="dev" />
      <Route name="signupnp" path="/signupnp" component={Signup} kind="rep" />
      <Route name="termsofuse" path="/termsofuse" component={Termsofuse} />
      <Route name="privacypolicy" path="/privacypolicy" component={Privacypolicy} />
      <Route name="dashboard" path="/dashboard" component={Dashboard} />
      <Route name="devprofile" path="/devprofile" component={DevProfile} />
      <Route name="createproject" path="/createproject" component={CreateProject} />
      <Route name="npprofile" path="/npprofile" component={NpProfile} />
      <Route name="createorg" path="/createorg" component={Createorg} />
      <Route name="joinorg" path="/joinorg" component={Joinorg} />
      <Route name="project" path="/project" component={Project} />
      <Route name="organization" path="/organization" component={Organization} />
    </Route>
  </Router>
);
