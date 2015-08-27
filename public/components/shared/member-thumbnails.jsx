var React = require('react');
var Link = require('react-router').Link;

var MemberThumbnails = React.createClass({
  propTypes: {
    'members': React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    'owner': React.PropTypes.object
  },

  render_thumbnail: function(member) {
    return (
      <Link key={member.id} to={'/profile/' + member.id}>
        <img src={member.avatar} className="smallAvatar" title={member.first_name + ' ' + member.last_name} />
      </Link>
    );
  },

  render: function() {
    var thumbnails = [];

    if (this.props.owner && Object.keys(this.props.owner).length) {
      thumbnails.push(this.render_thumbnail(this.props.owner));
    }

    thumbnails = thumbnails.concat(this.props.members.map(function(member) {
      return this.render_thumbnail(member);
    }.bind(this)));

    return (
      <div>
        {thumbnails}
      </div>
    );
  }
});

module.exports = MemberThumbnails;
