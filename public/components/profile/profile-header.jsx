var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAR2AAAAJGVlOWJlMTFkLTc3N2YtNGVkZC05YjY2LWMxNzA4OTllN2YyMQ.jpg",
      title: 'Please enter a title/company',
      location: 'Please enter a location',
      links: 'Please enter your GitHub, LinkedIn, etc'
    };
  },

  renderLinks: function() {
    return this.props.links.map(function(link) {
      if (link.slice(0,6) === 'github') {
        var link = link.slice(7);
        return <a href={link} className="links">GitHub</a>
      }
      if (link.slice(0,8) === 'linkedin') {
        var link = link.slice(9);
        return <a href={link} className="links">LinkedIn</a>
      }

      return <span>{link}</span>
    })
  },

  render: function() {
    return (
      <div className="container profileMargin">
        <div className="row">

          <div className="col-md-2">
            <div className="">
              <img className="profileAvatar" src={this.props.avatar} /> <br />
            </div>
          </div>

          <div className="col-md-4">
            <p>{this.props.firstName} {this.props.lastName}</p>
            <div>
              <p>{this.props.title}</p>
            </div>
            <div>
              <p>{this.props.location}</p>
            </div>
            <div>
              <p>{this.renderLinks()}</p>
            </div>
            <RaisedButton
              label="Contact" />
          </div>

          <div className="col-md-2">
            <RaisedButton
              label="Edit"
              onClick={this.props.edit} />
          </div>

        </div>
      </div>
    );
  }
});
