var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="">
        <div>
          <h3>Tech Strengths</h3>
          {this.tagsList()}
          <p className="btn btn-primary btn-disabled">temp content</p>
          <p className="btn btn-primary btn-disabled">temp content</p>
        </div>
        <div>
          <h3>Interests</h3>
          {this.interestsList()}
          <p className="btn btn-primary disabled">temp content</p>
          <p className="btn btn-primary disabled">temp content</p>
        </div>
      </div>
    );
  },
  tagsList: function(tags) {
    // return tags.map(function(tag) {
    //  return <li className="">some tags</li>
    // })
  },
  interestsList: function(interests) {
    // return interests.map(function(interest) {
    //  return <li className="">interest</li>
    // })
  }
});
