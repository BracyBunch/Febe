var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
		  <div className="">
		    <div className="box">
			    <img src=""/>
			  </div>
			  <div className="centered box">
			    lol css
			    <p>{this.props.something}First Name Last Name</p>
			    <p>{this.props.something}Software Engineer at MakerSquare</p>
			    <p>{this.props.something}San Francisco, CA</p>
			    <a href="http://www.github.com">{this.props.something}Github</a> <br />
			    <a href="http://www.linkedin.com">{this.props.something}LinkedIn</a>
	        <button className="btn btn-primary" type="submit">Contact</button>
			  </div>
			  <div className="box"> 
	        <button className="btn btn-primary" type="submit">{this.props.something}Edit/Follow</button>
			  </div>
		  </div>
		)
	}
})