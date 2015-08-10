var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function(){
    return (
      <div className="footer footer-bottom">
        <nav>
          <div className= "container-fluid">
            <div className="bracy">The Bracy Bunch 
              <span className="glyphicon glyphicon-copyright-mark">2015</span>
              <span className="terms">
                <Link to="/" className="active">Terms of Use</Link>
                <Link to="/" className="active">Privacy Policy</Link>
              </span>
            </div>
          </div>
        </nav>
      </div>
    )
  }
})
