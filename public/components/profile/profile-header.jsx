var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var ProfileHeader = React.createClass({
  propTypes: {
    'edit_toggle': React.PropTypes.func.isRequired,
    'avatar': React.PropTypes.string,
    'first_name': React.PropTypes.string.isRequired,
    'last_name': React.PropTypes.string.isRequired,
    'title': React.PropTypes.string.isRequired,
    'location': React.PropTypes.string.isRequired,
    'links': React.PropTypes.array.isRequired
  },
  getDefaultProps: function() {
    return {
      avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAR2AAAAJGVlOWJlMTFkLTc3N2YtNGVkZC05YjY2LWMxNzA4OTllN2YyMQ.jpg'
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

  render: function() {
    return (
      <div className="container profileMargin">
        <div className="row">

          <div className="col-md-2">
            <div className="">
              <img className="profileAvatar" src={this.props.avatar} />
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

          <div className="col-md-2">
            <RaisedButton
              label="Edit"
              onClick={this.props.edit_toggle} />
          </div>

        </div>
      </div>
    );
  }
});

module.exports = ProfileHeader;
