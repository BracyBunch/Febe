var _ = require('lodash');
var React = require('react');
var Thumbnail = require('../thumbnail/thumbnail');
var SearchBar = require('./searchbar');

var ajax = require('../../utils/fetch');

var BrowseProjects = React.createClass({
  getInitialState: function() {
    return {
      'projects': [],
      'tags': {},
      'value': ''
    };
  },
  componentWillMount: function() {
    this.update_projects();
  },
  update_projects: _.debounce(function() {
    var url = '/project/search';
    url += '?tags=' + JSON.stringify(Object.keys(this.state.tags).map(Number));
    url += '&name=' + this.state.value;
    ajax(url).then(function(res) {
      return res.json();
    }).then(function(projects) {
      console.log(projects)
      this.setState({'projects': projects});
    }.bind(this));
  }, 100),
  on_tag_change: function(tags) {
    this.setState({'tags': tags}, this.update_projects);
  },
  on_value_change: function(value) {
    this.setState({'value': value}, this.update_projects);
  },
  render: function() {
    return (
      <div>
        <div>
          <SearchBar on_tag_change={this.on_tag_change} on_value_change={this.on_value_change} />
        </div>
        <div className="eachThumbnail">
          {this.state.projects.map(function(project) {
            return <Thumbnail key={project.id} url={'/project/' + project.id} header={project.name} description={project.description} tags={project.skills} imageURL={project.organization.logo_url} />;
          })}
        </div>
      </div>
    );
  }
});

module.exports = BrowseProjects;
