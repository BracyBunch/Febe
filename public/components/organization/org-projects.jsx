var React = require('react');
var Link = require('react-router').Link
var Navigation = require('react-router').Navigation;

module.exports = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
    };
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {
    return (
    <div>
      <div> Project 1
      </div>
      <div> Project 2
      </div>
      <div> Project 3
      </div>
      <div> Project 4
      </div>
    </div>
    )
  }
});
