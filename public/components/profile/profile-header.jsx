var React = require('react');

module.exports = React.createClass({
	getDefaultProps: function() {
    return {
    	avatar: '/assets/img/avatar.png',
    	title: 'Please enter a title/company',
    	location: 'Please enter a location',
    	links: 'Please enter your GitHub, LinkedIn, etc'
    };
	},
	
	render: function() {
		return (
			<div className="profile">
			  <div className="row row-centered">

			    <div className="col-md-3 ">
				    <div className="">
					    <img src={this.props.avatar} /> <br />
				    </div>
				  </div>

				  <div className="col-md-4">
				    <p>{this.props.firstName} {this.props.lastName}</p>
				    <div>
					    <p>{this.props.title}</p>
					  </div>
					  <div>
					    <p>{this.props.location}</p>
					  </div>
					  <div>
					    <p>{this.props.links}</p>
				    </div>
		        <button className="btn btn-primary" type="submit">Contact</button>
				  </div>

				  <div className="col-md-2"> 
		        <button className="btn signupBtn" type="submit" onClick={this.props.edit}>Edit</button>
				  </div>

			  </div>
		  </div>
		)
	}
})