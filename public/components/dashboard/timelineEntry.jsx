var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


module.exports = React.createClass({
  propTypes: {
    'entry': React.PropTypes.object.isRequired
  },
  get_path: function(model_name) {
    model_name = model_name.toLowerCase();
    var paths = {
      'organization': '/organization/',
      'project': '/project/',
      'user': '/profile/'
    };

    return paths[model_name];
  },
  get_text: function(model) {
    if (model.model === 'Organization') {
      return model.name;
    } else if (model.model === 'Project') {
      return model.name;
    } else if (model.model === 'User') {
      return model.first_name;
    }
  },
  render_update: function() {
    var entry = this.props.entry;
    return (
      <div className="timeline-entry">
        <Link to={this.get_path(entry.from.model) + entry.from.id}>{this.get_text(entry.from)}</Link>
        <span className="timeline-entry-text"> {entry.entry.text} </span>
        <Link to={this.get_path(entry.to.model) + entry.to.id}>{this.get_text(entry.to)}</Link>
      </div>
    );
  },
  render_create: function() {
    var entry = this.props.entry;
    return (
      <div className="timeline-entry">
        <Link to={this.get_path(entry.from.model) + entry.from.id}>{this.get_text(entry.from)}</Link>
        <span className="timeline-entry-text"> {entry.entry.text} </span>
        <Link to={this.get_path(entry.to.model) + entry.to.id}>{this.get_text(entry.to)}</Link>
      </div>
    );
  },
  render: function(){
    return this['render_' + this.props.entry.entry.event]();
  }
});
