var React = require('react');
var Thumbnail = require('../thumbnail/thumbnail');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <div className="project-list">
          <h3>Current Projects</h3>
            <div className="eachThumbnail">
              {this.props.projects.map(function(project) {
                return <Thumbnail key={project.id} url={'/project/' + project.id} header={project.name} description={project.description} tags={project.skills}  />;
              })}
            </div>
        </div>
        <div className="project-list completed-projs">
          <h3>Completed Projects</h3>
          <div>No projects currently completed</div>  
        </div>
      </div>
    );
  }
});
