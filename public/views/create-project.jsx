var React = require('react/addons');
var DropdownButton = require('react-bootstrap').DropdownButton;
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var ValidationMixin = require('react-validation-mixin');
var Methods = require('../sharedMethods');
var DatePicker = require('../components/datepicker/datepicker');

module.exports = React.createClass({
  mixins: [ValidationMixin, React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      projectName: '',
      contributors: ['Yoshio Varney', 'Ryan Jones', 'James Maveety', 'Colin McKeehan'],
      representative: 'Point Person',
      projectManager: 'Bobby the PM',
      completionDate: '',
      description: '',
      tech: [],
      links: [],
      terms: false
    }
  },

  newLink: '<input type="url" class="form-control" placeholder="Additional Link" />',

  setTerms: function(){
    this.setState({
      terms: !this.state.terms
    });
  },

  createProject: function() {
    if (this.state.terms) {
      console.log("submitting")
    } else {
      console.log("nope")
    }
  },

  select: function(item) {
    this.setState({
      representative: item
    });
  },

  renderDropdownItems: function() {
    var people = [];
    for (var i = 0; i < this.state.contributors.length; i++) {
      var person = this.state.contributors[i];
      people.push(
        <div onClick={this.select.bind(null, person)}>
          <span>{person}</span>
        </div>);
    }
    return people;
  },

  render: function() {
    return (
      <div className="">
        <Header link='/' title='Home'/>
        <div className="fullscreen">

          <h3>Create a Project</h3>
          <form className="form-inline">
            <div className="form-group">
              <h5>Project Name</h5>
              <input type="text" ref="projectName" className="form-control projectName" valueLink={this.linkState('projectName')} />
            </div>
          </form>

          <div>
            <DropdownButton title={this.state.representative}>
              {this.renderDropdownItems()}
            </DropdownButton>
          </div>

          <div>
            <h5>Preferred Completion Date</h5>
            <DatePicker />
          </div>
          
          <div>
            <h5>Project Description</h5>
            <textarea
              className="form-group"
              rows="4"
              cols="100"
              valueLink={this.linkState('description')}
            ></textarea>
          </div>

          <div>
            <h5>Technology Needs</h5>
            <input type="text" className="form-control" />
          </div>

          <div>
            <button type="submit" className="btn signupBtn text-center">Upload Media???</button>
          </div>

          <div id="addlLinks">
            <h5>Additional Links</h5>
            <input type="url" className="form-control" placeholder="YouTube" />
          </div>
          <div>
            <button 
              className="btn signupBtn" 
              onClick={Methods.addFields.bind(this, 'addlLinks', this.newLink)}>Add +</button> <br />
          </div>

          <div>
            {this.state.terms}
            <input type="checkbox" value="termsAgreed" onChange={this.setTerms} className="checkbox-inline"> I agree to the terms</input>
          </div>

          <div>
            <button type="submit" className="btn signupBtn text-center" onClick={this.createProject}>Create</button>
          </div>

        </div>
        <Footer />
      </div>
    )
  }
//   var colours = [{
//   name: "Red",
//   hex: "#F21B1B"
// }, {
//   name: "Blue",
//   hex: "#1B66F2"
// }, {
//   name: "Green",
//   hex: "#07BA16"
// }];

// React.render(<Dropdown list={colours} selected={colours[0]} />
});