var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {

    }
  },
  
  dummyData: [
    {
      avatar: 'assets/img/james.jpg',
      profileURL: 'http://www.google.com/'
    },{
      avatar: 'assets/img/james.jpg',
      profileURL: 'http://www.google.com/'
    },{
      avatar: 'assets/img/james.jpg',
      profileURL: 'http://www.google.com/'
    },{
      avatar: 'assets/img/james.jpg',
      profileURL: 'http://www.google.com/'
    },{
      avatar: 'assets/img/james.jpg',
      profileURL: 'http://www.google.com/'
    },{
      avatar: 'assets/img/james.jpg',
      profileURL: 'http://www.google.com/'
    }
  ],

  render: function() {
    var thumbnails = this.dummyData.map(function(person) {
      return <a href={person.profileURL}><img src={person.avatar} className="smallAvatar" /></a>
    });
    return (
      <div>
        {thumbnails}
      </div>
    );
  }
})