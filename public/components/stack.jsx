var React = require('react');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <div className="stack">Tech Stack</div>
        <div className="row thumbnail">
          <div className="col-xs-6 col-sm-3 stack-images">
            <a href="http://facebook.github.io/react/" target="_blank">
              <img src="http://jpsierens.com/wp-content/uploads/2015/05/react-logo.png"/>
            </a>
          </div>
          <div className="col-xs-6 col-sm-3 stack-images">
            <a href="https://nodejs.org/" target="_blank">
              <img src="http://code-maven.com/img/node.png"/>
            </a>
          </div>
          <div className="col-xs-6 col-sm-3 stack-images neo4j">
            <a href="http://neo4j.com/" target="_blank">
              <img src="http://businessintelligence.com/wp-content/themes/bi/assets/images/vendor/neo4j-logo.png"/>
            </a>
          </div>
          <div className="col-xs-6 col-sm-3 stack-images">
            <a href="http://gulpjs.com/" target="_blank">
              <img src="http://brunch.io/images/others/gulp.png"/>
            </a>
          </div>
        </div>
      </div>
    )
  }
});