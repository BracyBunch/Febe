var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var ThumbnailList = require('../components/thumbnail/thumbnailList');

module.exports = React.createClass({
  
  render: function(){
    return (
      <div>
        <Header link='/' title='Browse'/>
        Dashboard
        <div>
          <Link to="/devprofile"><button className="btn btn-primary">Dev Profile Temp</button></Link>
          <Link to="/createproject"><button className="btn btn-primary">Create Project Temp</button></Link>
          <Link to="/npprofile"><button className="btn btn-primary">Np Profile Temp</button></Link>
        </div>
        <div>
          <ThumbnailList />
        </div>  
        <Footer />
      </div>
    )
  },
});

//<Footer />