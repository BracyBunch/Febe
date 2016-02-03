var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ProfileMethods = require('../../../sharedMethods');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var ProfileHeaderEdit = React.createClass({
  mixins: [LinkedStateMixin],
  propTypes: {
    'save': React.PropTypes.func.isRequired,
    'onChange': React.PropTypes.func.isRequired,
    'avatar': React.PropTypes.string,
    'first_name': React.PropTypes.string.isRequired,
    'last_name': React.PropTypes.string.isRequired,
    'title': React.PropTypes.string.isRequired,
    'location': React.PropTypes.string.isRequired,
    'links': React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      'title': this.props.title,
      'location': this.props.location,
      'links': this.props.links,
      'avatar': this.props.avatar
    };
  },

  divId: 'addlLinks',
  newLinkHTML: '<input type="text" value="" id="links" placeholder="LinkedIn, Github, Angel List, Website, etc." class="form-control" />',
  addlFieldCount: 1,
  addlFieldLimit: 4,

  onChange: function() {
    this.props.updateHeader(this.state);
  },
  checkLinks: function(){
    return this.state.links[0] ? this.state.links[0].split('|',2)[1] : this.state.links;
  },
  updateLink: function(event) {
    this.props.updateLinks(event.target.value);
  },

  updateField: function(field, event) {
    var update = {};
    update[field] = event.target.value;
    this.setState(update, function() {
      this.onChange(this.state);
    });
  },

  render: function() {
    return (
      <div className="container profileMargin">
        <div className="row">

          <div className="col-md-2">
            <div className="">
              <img className="profileAvatar" src={this.props.avatar} /> <br />
              <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                <input type="file" onChange={this.props.handleImage} />
              </form>
            </div>
          </div>

          <div className="col-md-4">
            <p>{this.props.first_name} {this.props.last_name}</p>
            <div>
              <input
                type="text"
                className="form-control techstrengths"
                placeholder="Your position & company"
                value={this.state.title} onChange={this.updateField.bind(this, 'title')} />
            </div>
            <div>
              <input
                type="text"
                className="form-control techstrengths"
                placeholder="Your location"
                value={this.state.location} onChange={this.updateField.bind(this, 'location')} />
            </div>
            <div>
              <div className="form-group techstrengths" id="addlLinks">
                <input type="text" 
                id="links" 
                placeholder="LinkedIn, Github, Angel List, Website, etc." 
                className="form-control" 
                value={this.checkLinks()}
                onChange={this.updateLink} />
              </div>
                <button className="btn signupBtn" onClick={ProfileMethods.addFields.bind(this, this.divId, this.newLinkHTML)}>Add +</button> <br />
            </div>
          </div>

          <div className="col-md-2">
            <RaisedButton
              label="Save"
              onClick={this.props.save} />
          </div>

        </div>
      </div>
    );
  }
});

module.exports = ProfileHeaderEdit;
