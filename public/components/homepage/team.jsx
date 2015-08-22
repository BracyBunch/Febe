var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;

module.exports = React.createClass({
  render: function(){
    return (
      <Paper style={{"height": "64%", "min-height": "400px"}} zdepth={1}>
        <div className="team-header">The Team</div>
          <div className="entire-team">
            <div className="col-sm-4 nametags">
              <div className="thumbnail">
                <a href="https://www.linkedin.com/in/colinmckeehan" target="_blank">
                  <img src="/assets/img/colin.jpg"/>
                  <div className="caption">
                    <h4>Colin Mckeehan</h4>
                    <p>Software Engineer</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-4 nametags">
              <div className="thumbnail">
                <a href="https://www.linkedin.com/in/mavmeister" target="_blank">
                  <img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAKNAAAAJDNjYzIyMTNjLWEwOWMtNDc1ZC1iMDQ5LTE3NGQ2Y2FiNTE1MQ.jpg"/>
                  <div className="caption">
                    <h4>James Maveety</h4>
                    <p>Scrum Master & Software Engineer</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-4 nametags">
              <div className="thumbnail">
                <a href="https://www.linkedin.com/in/ryanjones10" target="_blank">
                  <img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAYqAAAAJDFiZDRmM2I1LTZlOTItNDUxZi1iNWZjLTM3NWI2MTI2ZjcxOA.jpg"/>
                  <div className="caption">
                    <h4>Ryan Jones</h4>
                    <p>Product Manager & Software Engineer</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-4 nametags">
              <div className="thumbnail">
                <a href="https://www.linkedin.com/in/yoshiv" target="_blank">
                  <img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAR2AAAAJGVlOWJlMTFkLTc3N2YtNGVkZC05YjY2LWMxNzA4OTllN2YyMQ.jpg"/>
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