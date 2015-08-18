var React = require('react/addons');
var ProfileMethods = require('../../../sharedMethods');

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      description: '',
      title: '',
      technology: '',
      mediaLinks: [],
      contributors: []
    };
  },

  getDefaultProps: function() {
    return {
      title: 'Please enter your project descriptions',
      description: 'No description available',
      technology: 'No location specified',
      mediaLinks: 'No media links available',
      contributors: 'No project contributors yet!'
    };
  },

  updateTitle: function(title) {
    this.props.updateTitle(title.target.value);
  },

  updateDescription: function(title) {
    this.props.updateDescription(title.target.value);
  },

  updateTechnology: function(event) {
    this.props.updateTechnology(event.target.value);
  },

  updateMediaLinks: function(event) {
    this.props.updateMediaLinks(event.target.value);
  },

  updateContributors: function(event) {
    this.props.updateContributors(event.target.value);
  },

  render: function() {
    return (
    <div>
      <div>
        <h3>Description</h3>
        <textarea
          defaultValue="Tell us about the project..."
          className="form-control"
          rows="4"
          cols="200"
          onChange={this.updateDescription}
          ></textarea>
      </div>
    </div>
    );
  }
});
