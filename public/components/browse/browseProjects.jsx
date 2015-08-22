var React = require('react');
var Thumbnail = require('../thumbnail/thumbnail');
var SearchBar = require('./searchbar');

var ajax = require('../../utils/fetch');

var BrowseProjects = React.createClass({
  getInitialState: function() {
    return {
      'projects': []
    };
  },
  on_selection_change: function(selections) {
    if (!Object.keys(selections).length) return this.setState({'projects': []});
    ajax('/project/search?tags=' + JSON.stringify(Object.keys(selections).map(Number))).then(function(res) {
      return res.json();
    }).then(function(projects) {
      this.setState({'projects': projects});
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <div>
          <SearchBar on_change={this.on_selection_change} />
        </div>
        <div className="eachThumbnail">
          {this.state.projects.map(function(project) {
            return <Thumbnail url={'/project/' + project.id} header={project.name} description={project.description} tags={project.skills} imageURL={project.organization.logo_url} />;
          })}
        </div>
      </div>
    );
  }
});

module.exports = BrowseProjects;
