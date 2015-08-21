var React = require('react/addons');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var Reflux = require('reflux');
var Navigation = require('react-router').Navigation;
var ValidationMixin = require('react-validation-mixin');
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var Methods = require('../sharedMethods');
var ImgurUpload = require('../utils/imgur');
var ajax = require('../utils/fetch');
var Autocomplete =require('../components/shared/autocomplete');

var Promise = require('bluebird');

module.exports = React.createClass({
  mixins: [ValidationMixin, React.addons.LinkedStateMixin, Navigation],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  generateMenu: [
    { type: MenuItem.Types.LINK, payload: '/', text: 'Home'},
    { type: MenuItem.Types.LINK, payload: '#/dashboard', text: 'Dashboard'},
    { type: MenuItem.Types.LINK, payload: '#/browse', text: 'Browse'},
    { type: MenuItem.Types.LINK, payload: '#/devprofile', text: 'My Profile'},
    { type: MenuItem.Types.SUBHEADER, text: 'Resources'},
    { route: '/', text: 'About'},
    { route: '/', text: 'Team'},
    { type: MenuItem.Types.LINK, payload: 'https://github.com/BracyBunch/Febe', text: 'GitHub'}
  ],

  getInitialState: function() {
    return {
      ein: '',
      name: '',
      website_url: '',
      logoURL: '',
      imgUri: 'assets/img/defaultlogo.jpg',
      location: '',
      causes: [],
      representatives: [],
      description: ''
    };
  },

  newRepField: '<input type="email" class="form-control" placeholder="Representative\'s Email" />', 

  setTerms: function(){
    this.setState({
      terms: !this.state.terms
    });
  },

  handleImage: function(event) {
    var imagePromise = new Promise(ImgurUpload.imgurUpload(image));

    var that = this;
    // FileReader is a native browser file reader
    var reader = new FileReader();
    // Assign file to img
    var img = event.target.files[0];
    var imgToUpload, imgBase64;

    // run function on
    reader.onload = readSuccess;
    function readSuccess(upload) {
      imgBase64 = upload.target.result;
      // slice only base64 data
      imgToUpload = imgBase64.slice(23);
      ImgurUpload.imgurUpload(imgToUpload);
      that.setState({
        imgUri: imgBase64
      });
    }

    // readAsDataURL converts file to base64
    reader.readAsDataURL(img);
  },

  on_autocomplete_change: function(selections) {
    this.setState({'causes': Object.keys(selections)});
  },

  createOrg: function() {
    if (this.state.terms) {
      ajax('/organization', {
        method: 'POST',
        body: JSON.stringify(this.state)
      }).then(function(response) {
        return response.json();
      })
      .then(function(data) {
        sessionStorage.setItem('orgId', data.id);
        this.transitionTo('/organization/' + data.id);
      }.bind(this));
    }
  },

  render: function(){
    var repTooltip = <Tooltip>Enter the email address of any additional users you would like to represent your organization.</Tooltip>;

    return (
      <div>
        <Header color={{"background-color":"#6E7FD5"}} generateMenu = {this.generateMenu}/>
        <div>

          <div>
            <h3>EIN</h3>
            <form className="form-inline">
              <div className="form-group">
                <h5>Project Name</h5>
                <input
                  type="text"
                  ref="ein"
                  className="form-control ein"
                  placeholder="EIN"
                  valueLink={this.linkState('ein')} />
              </div>
            </form>
          </div>

          <div>
            <input
              type="text"
              ref="name"
              className="form-control"
              placeholder="Organization Name"
              valueLink={this.linkState('name')} />
          </div>

          <div>
            <input
              type="url"
              ref="orgURL"
              className="form-control orgURL"
              placeholder="Organization Website"
              valueLink={this.linkState('website_url')} />
          </div>
           <img id="avatar" src={this.state.imgUri} />

          <div>
            <button type="submit"
              id="img"
              className="btn signupBtn text-center"
              onClick={this.uploadImage}>Upload Logo</button>
          </div>

          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <input type="file" onChange={this.handleImage} />
          </form>

          <div>
            <input
              type="text"
              ref="location"
              className="form-control location"
              placeholder="Organization Location"
              valueLink={this.linkState('location')} />
          </div>

          <div>
            <Autocomplete url='/tag/search?kind=cause&fragment=' placeholder='Search for causes'
             min_chars={0} ref='causes' on_change={this.on_autocomplete_change.bind(this)}/>
          </div>

          <div id="addlReps">
              <h5 className="headerInline">Additional Representatives </h5>
              <OverlayTrigger position="top" overlay={repTooltip}>
                <img className="questionmark" src="assets/img/questionmark.png" />
              </OverlayTrigger>
            <input type="url" className="form-control" placeholder="Representative's Email" />
          </div>
          <div>
            <button
              className="btn signupBtn"
              onClick={Methods.addFields.bind(this, 'addlReps', this.newRepField)}>Add +</button> <br />
          </div>

          <div>
            <h3>Mission / About</h3>
            <textarea
              defaultValue="Tell us about organization and it's mission..."
              className="form-control"
              rows="4"
              cols="200"
              valueLink={this.linkState('description')}
              ></textarea>
          </div>

          <div>
            <input
              type="checkbox"
              value="termsAgreed"
              onChange={this.setTerms}
              className="checkbox-inline"> I agree to the terms</input>
          </div>


          <div>
            <button type="submit" className="btn signupBtn text-center" onClick={this.createOrg}>Create</button>
          </div>

        </div>
        <Footer />
      </div>
    );
  }
});
