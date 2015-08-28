var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;

module.exports = React.createClass({
  render: function(){
    return (
      <Paper style={{"minHeight": "450px"}} zdepth={1}>
        <div className="team-header">The Team</div>
          <div className="entire-team">
            <div className="col-xs-4 nametags">
              <div className="thumbnail">
                <a href="https://www.linkedin.com/in/colinmckeehan" target="_blank">
                  <img src="/assets/img/Colin.jpg"/>
                  <div className="caption">
                    <h4>Colin Mckeehan</h4>
                    <p>Software Engineer</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-xs-4 nametags">
              <div className="thumbnail">
                <a href="https://www.linkedin.com/in/mavmeister" target="_blank">
                  <img src="/assets/img/JamesMaveety.jpg"/>
                  <div className="caption">
                    <h4>James Maveety</h4>
                    <p>Scrum Master & Software Engineer</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-xs-4 nametags">
              <div className="thumbnail">
                <a href="https://www.linkedin.com/in/ryanjones10" target="_blank">
                  <img src="/assets/img/RyanJones.jpg"/>
                  <div className="caption">
                    <h4>Ryan Jones</h4>
                    <p>Product Manager & Software Engineer</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-xs-4 nametags">
              <div className="thumbnail">
                <a href="https://www.linkedin.com/in/yoshiv" target="_blank">
                  <img src="/assets/img/Yoshi .jpg"/>
                  <div className="caption">
                    <h4>Yoshi Varney</h4>
                    <p>Software Engineer</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
      </Paper>
    )
  }
})