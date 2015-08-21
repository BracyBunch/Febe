var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;

module.exports = React.createClass({
  render: function(){
    return (
      <Paper style={{"height":"40%"}}zdepth={1}>
        <div>
          <div className="stack">Tech Stack</div>
          <div className="row entire-stack">
            <div className="col-sm-3 stack-tags">
              <div className="thumbnail">
                <a href="http://facebook.github.io/react/" target="_blank">
                  <img className="stack-images" src="http://yycjs.com/real-world-react/img/react-logo.png"/>
                </a>
              </div>
            </div>
            <div className="col-sm-3 stack-tags">
              <div className="thumbnail">
                <a href="https://nodejs.org/" target="_blank">
                  <img className="stack-images" src="http://code-maven.com/img/node.png"/>
                </a>
              </div>
            </div>
            <div className="col-sm-3 stack-tags">
              <div className="thumbnail neo4j">
                <a href="http://neo4j.com/" target="_blank">
                  <img className="stack-images neo4j-image" src="http://opencredo-website.s3.amazonaws.com/2013/10/neo4j-logo.png"/>
                </a>
              </div>
            </div>
            <div className="col-sm-3 stack-tags">
              <div className="thumbnail">
                <a href="http://gulpjs.com/" target="_blank">
                  <img className="stack-images" src="http://brunch.io/images/others/gulp.png"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    )
  }
});