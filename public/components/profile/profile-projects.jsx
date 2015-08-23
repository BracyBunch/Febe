var React = require('react');
var ThumbnailList = require('../thumbnail/thumbnailList');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <div className="project-list">
          <h3>Current Projects</h3>
            <ThumbnailList />
        </div>

        <div className="project-list">
          <h3>Completed Projects</h3>
            <ThumbnailList />
        </div>
      </div>
    );
  }
});
