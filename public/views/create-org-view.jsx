var React = require('react/addons');
var mui = require('material-ui');
var ValidationMixin = require('react-validation-mixin');
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var Methods = require('../sharedMethods');

module.exports = React.createClass({
  mixins: [ValidationMixin, React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      EIN: '',
      orgName: '',
      orgURL: '',
      logoURL: '',
      imgUri: 'assets/img/defaultlogo.jpg',
      location: '',
      tags: [],
      representatives: [],
      mission: ''
    }
  },

  newRepField: '<input type="email" class="form-control" placeholder="Representative\'s Email" />', 

  handleSubmit: function(e) {
    e.preventDefault();
  },

  setTerms: function(){
    this.setState({
      terms: !this.state.terms
    });
  },

  handleImage: function(event) {
    var that = this;
    var reader = new FileReader();
    var img = event.target.files[0];

    reader.onload = readSuccess;                                            
    function readSuccess(upload) { 
      var imgBase64 = upload.target.result;
      that.setState({
        imgUri: imgBase64
      })                              
    };

    reader.readAsDataURL(img);
  },

  createOrg: function() {
    if (this.state.terms) {
      console.log("submitting form")
    } 
  },

  render: function(){
    var repTooltip = <Tooltip>Enter the email address of any additional users you would like to represent your organization.</Tooltip>
  
    return (
      <div>
        <Header link='/' title='Browse'/>
        <div>
          
          <div>
            <h3>EIN</h3>
            <form className="form-inline">
              <div className="form-group">
                <h5>Project Name</h5>
                <input 
                  type="text" 
                  ref="EIN" 
                  className="form-control EIN" 
                  placeholder="EIN" 
                  valueLink={this.linkState('EIN')} />
              </div>
            </form>
          </div>

          <div>
            <input 
              type="text" 
              ref="orgName" 
              className="form-control orgName" 
              placeholder="Organization Name" 
              valueLink={this.linkState('orgName')} />
          </div>

          <div>
            <input 
              type="url" 
              ref="orgURL" 
              className="form-control orgURL" 
              placeholder="Organization Website" 
              valueLink={this.linkState('orgURL')} />
          </div>
           <img id="avatar" src={this.state.imgUri} />

          <div>
            <button type="submit" 
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
          TAGS GO HERE
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
    )
  },
});