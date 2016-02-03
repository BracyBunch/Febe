var React = require('react');
var ReactRouter = require('react-router');
var history = require('./utils/history')
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Main = require('./components/main');
var Signup = require('./views/signupView');
var Termsofuse = require('./components/shared/termsOfUse');
var Privacypolicy = require('./components/shared/privacyPolicy');
var Profile = require('./views/profile-view');
var CreateProject = require('./views/create-project-view');
var Createorg = require('./views/create-org-view');
var Joinorg = require('./views/join-org-view');
var Organization = require('./views/org-view');
var Project = require('./views/project-view');
var Browse = require('./views/browse-view');

module.exports = (
  <Router history={history}>
    <Route path="/" component={Main}>
      <Route path="/signupdev" component={Signup} kind="dev" />
      <Route path="/signupnp" component={Signup} kind="rep" />
      <Route path="/termsofuse" component={Termsofuse} />
      <Route path="/privacypolicy" component={Privacypolicy} />
      <Route path="/profile" component={Profile} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/createproject" component={CreateProject} />
      <Route path="/createorg" component={Createorg} />
      <Route path="/joinorg" component={Joinorg} />
      <Route path="/project/:id" component={Project} />
      <Route path="/organization/:id" component={Organization} />
      <Route path="/browse" component={Browse} />
    </Route>
  </Router>
);
