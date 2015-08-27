var _ = require('lodash');
var React = require('react');
var Link = require('react-router').Link;
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Card = mui.Card;
var CardText = mui.CardText;
var CardHeader = mui.CardHeader;
var CardActions = mui.CardActions;
var Avatar = mui.Avatar;
var FlatButton = mui.FlatButton;


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
      return model.first_name + ' ' + model.last_name;
    }
  },

  render_update: function() {
    var entry = this.props.entry;
    return (
      <div className="timeline-entry">
        <span className="timeline-entry-text"> {entry.entry.text} </span>
        <Link to={this.get_path(entry.to.model) + entry.to.id}>{this.get_text(entry.to)}</Link>
      </div>
    );
  },
  render_create: function() {
    var entry = this.props.entry;
    return (
      <div className="timeline-entry">
        <span className="timeline-entry-text"> {entry.entry.text} </span>
        <Link to={this.get_path(entry.to.model) + entry.to.id}>{this.get_text(entry.to)}</Link>
      </div>
    );
  },

  render: function(){
    return (
      <Card>
        <CardHeader
          title={this.get_text(this.props.entry.from)}
          subtitle={new Date(this.props.entry.entry.created).toDateString()}
          avatar={<Avatar style={{color: 'red'}}>A</Avatar>}>
        </CardHeader>
        <CardText>
          {this['render_' + this.props.entry.entry.event]()}
        </CardText>
      </Card>
    );
  }
});
