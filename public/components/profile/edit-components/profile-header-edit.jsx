var React = require('react/addons');
var ProfileMethods = require('../../../sharedMethods');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      title: '',
      location: ''
    };
  },

  getDefaultProps: function() {
    return {
      avatar: '/assets/img/avatar.png',
      title: <a href="devprofile">Please enter your title/company</a>,
      location: 'Please enter a location',
      links: 'Please enter your GitHub, LinkedIn, etc'
    };
  },

  divId: 'addlLinks',
  newLinkHTML: '<input type="text" value="" id="links" placeholder="LinkedIn, Github, Angel List, Website, etc." class="form-control" />',
  addlFieldCount: 1,
  addlFieldLimit: 4,

  updateTitle: function(title) {
    this.props.updateTitle(title.target.value);
  },

  updateLocation: function(event) {
    this.props.updateLocation(event.target.value);
  },

  updateLinks: function(link) {
    this.props.links.push(link);
    this.props.updateLinks(this.props.links);
  },

  render: function() {
    return (
      <div className="container profileMargin">
        <div className="row">

          <div className="col-md-2">
            <div className="">
              <img src={this.props.avatar} /> <br />
              <a href="#" className="">upload avatar</a>
            </div>
          </div>

          <div className="col-md-4">
            <p>{this.props.firstName} {this.props.lastName}</p>
            <div>
              <input
                type="text"
                className="form-control techstrengths"
                placeholder="Your position & company"
                onChange={this.updateTitle} />
            </div>
            <div>
              <input
                type="text"
                className="form-control techstrengths"
                placeholder="Your location"
                onChange={this.updateLocation} />
            </div>
            <div>
              <div className="form-group techstrengths" id="addlLinks">
                <input type="text" id="links" placeholder="LinkedIn, Github, Angel List, Website, etc." className="form-control" />
              </div>
                <button className="btn signupBtn" onClick={ProfileMethods.addFields.bind(this, this.divId, this.newLinkHTML)}>Add +</button> <br />
            </div>
          </div>

          <div className="col-md-2">
            <RaisedButton
              label="Save"
              onClick={this.props.edit} />
          </div>

        </div>
      </div>
    );
  }
});
