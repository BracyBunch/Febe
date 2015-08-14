var React = require('react/addons');
var Methods = require('../sharedProfileMethods')

module.exports = React.createClass({
	mixins: [React.addons.LinkedStateMixin],
	getInitialState: function() {
		return {
	    title: '',
	    location: ''
	  }
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
	updateTitle: function(event) {
    this.setState({
      title: event.target.value
    });
    this.props.updateTitle(this.state.title);
	},
	updateLocation: function(event) {
    this.setState({
    	location: event.target.value
    });
    this.props.updateLocation(this.state.location);
	},
	render: function() {
		return (
			<div className="profile">
			  <div className="row row-centered">

			    <div className="col-md-3 ">
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
						    <button className="btn signupBtn" onClick={Methods.addFields.bind(this, this.divId, this.newLinkHTML)}>Add +</button> <br />
				    </div>
				  </div>

				  <div className="col-md-2"> 
		        <button className="btn signupBtn" type="submit" onClick={this.props.edit}>Save</button>
				  </div>
			  </div>
		  </div>
		)
	}
})