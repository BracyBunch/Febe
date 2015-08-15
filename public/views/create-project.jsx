var React = require('react/addons');
var DropdownButton = require('react-bootstrap').DropdownButton;
var Header = require('../components/shared/header');
var Landing = require('../components/homepage/landing');
var ValidationMixin = require('react-validation-mixin');

var DatePicker = require('../components/datepicker/datepicker')

module.exports = React.createClass({
  mixins: [ValidationMixin, React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      dropdownVisible: false,
      projectName: '',
      pointPeople: ['Yoshio Varney', 'Ryan Jones', 'James ', 'Colin '],
      pointPerson: '',
      completionDate: '',
      description: '',
      tech: [],
      links: [],
      terms: false
    }
  },

  select: function(item) {
    this.setState({
      pointPerson: item
    });
  },

  // showDropdown: function() {
  //   this.setState({
  //     dropdownVisible: true
  //   });
  //   document.addEventListener("click", this.hide);
  // },

  // hide: function() {
  //   this.setState({ 
  //     dropdownVisible: false 
  //   });
  //   document.removeEventListener("click", this.hide);
  // },

  renderDropdownItems: function() {
    var people = [];
    for (var i = 0; i < this.state.pointPeople.length; i++) {
      var person = this.state.pointPeople[i];
      people.push(
        <div onClick={this.select.bind(null, person)}>
          <span>{person}</span>
        </div>);
    }
    return people;
  },

  render: function() {
    return (
      <div>
        <Header link='/' title='Home'/>
          <h3>Create a Project</h3>
          <form className="form-inline names">
            <div className="form-group">
              <input type="text" ref="projectName" className="form-control projectName" valueLink={this.linkState('projectName')} placeholder="Project Name" />
            </div>
          </form>

          {this.state.pointPerson}
          <DropdownButton title="Point Person">
            {this.renderDropdownItems()}
          </DropdownButton>

          <DatePicker />

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