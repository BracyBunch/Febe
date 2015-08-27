var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var ProfileHeader = React.createClass({
  propTypes: {
    'edit_toggle': React.PropTypes.func.isRequired,
    'show_edit_button': React.PropTypes.bool,
    'avatar': React.PropTypes.string,
    'first_name': React.PropTypes.string.isRequired,
    'last_name': React.PropTypes.string.isRequired,
    'title': React.PropTypes.string.isRequired,
    'location': React.PropTypes.string.isRequired,
    'links': React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {
      'show_edit_button': false
    };
  },

  renderLinks: function() {
    return this.props.links.map(function(link) {
      var parts = link.split('|');
      var text = {
        'github': 'Github',
        'facebook': 'Facebook',
        'linkedin': 'LinkedIn',
        'other': parts[1]
      };

     return <a href={parts[1]} className="links">{text[parts[0]]}</a>;
    });
  },

  showEditButton: function() {
    if (!this.props.show_edit_button) return '';

    return (
      <div className="col-md-2">
        <RaisedButton
          label="Edit"
          onClick={this.props.edit_toggle} />
      </div>
    );
  },

  render: function() {
    return (
      <div className="container profileMargin">
        <div className="row">

          <div className="col-md-2">
            <div className="">
              <img className="profileAvatar profileRound" src={this.props.avatar} />
            </div>
          </div>

          <div className="col-md-2">
            <p>{this.props.first_name} {this.props.last_name}</p>
            <div>
              <p>{this.props.title}</p>
            </div>
            <div>
              <p>{this.props.location}</p>
            </div>
            <div>
              <p>{this.renderLinks()}</p>
            </div>
          </div>

          {this.showEditButton()}

        </div>
      </div>
    );
  }
});

module.exports = ProfileHeader;
