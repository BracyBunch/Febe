var React = require('react');
var Reflux = require('reflux');
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var ProfHeader = require('../components/profile/profile-header');
var DevProfBody = require('../components/profile/dev-profile-body');
var Bio = require('../components/profile/profile-bio');
var Projects = require('../components/profile/profile-projects');
var ProfileStore = require('../stores/profile-store');
var Actions = require('../actions');

var ProfHeaderEdit = require('../components/profile/edit-components/profile-header-edit');
var DevProfBodyEdit = require('../components/profile/edit-components/dev-profile-body-edit');
var BioEdit = require('../components/profile/edit-components/profile-bio-edit');


module.exports = React.createClass({
	mixins:[
		Reflux.listenTo(ProfileStore, 'onChange')
	],
	getInitialState: function(){
		return {
			userData: [],
			swap: true
		}
	},
	componentWillMount: function(){
		Actions.getProfile(window.localStorage.getItem('userId'));
	},
	onChange: function(event, userData){
		this.setState({userData: userData})
	},
	checking:function(){
		console.log("this is on dev page", this.state.userData)
	},
	edit: function() {
		console.log("editting")
    this.setState({
    	swap: !this.state.swap
    })
	},
	save: function() {
		console.log("saving")
    this.edit();
    // fetch post request w/ new data
	},
	profileEdit: function(edit) {
		return edit ? 
      <div>
        <ProfHeader 
            edit={this.edit}
		        props={this.state.userData}
		        firstName={this.state.userData.first_name}
		        lastName={this.state.userData.last_name}
		        avatar={this.state.userData.avatar}
		        title={this.state.userData.title} />
        <DevProfBody />
        <Bio />
        <Projects />
      </div> 
      :
      <div>
        <ProfHeaderEdit 
            edit={this.save}
		        props={this.state.userData}
		        firstName={this.state.userData.first_name}
		        lastName={this.state.userData.last_name}
		        avatar={this.state.userData.avatar}
		        title={this.state.userData.title} />
        <DevProfBodyEdit />
        <BioEdit />
      </div>
	},
	render: function() {
		return (
		<div>
      <Header link='/dashboard' title='Dashboard' />
			{this.profileEdit(this.state.swap)}
			<button type="submit" onClick={this.checking} className="btn signupBtn text-center">checkstate</button>
      <Footer />	
		</div>
		)
	}
})
