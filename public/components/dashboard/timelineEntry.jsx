var React = require('react');
var Link = require('react-router').Link;
var mui = require('material-ui');
var Card = mui.Card;
var CardText = mui.CardText;
var CardHeader = mui.CardHeader;
var Avatar = mui.Avatar;


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
  get_avatar: function(model) {
    if (model.model === 'Organization') {
      return <Avatar src={model.logo_url || '/assets/img/defaultlogo.jpg'}/>;
    } else if (model.model === 'Project') {
      return <Avatar style={{color: 'red'}}>P</Avatar>;
    } else if (model.model === 'User') {
      return <Avatar src={model.avatar}/>;
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
          avatar={this.get_avatar(this.props.entry.from)}>
        </CardHeader>
        <CardText>
          {this['render_' + this.props.entry.entry.event]()}
        </CardText>
      </Card>
    );
  }
});
