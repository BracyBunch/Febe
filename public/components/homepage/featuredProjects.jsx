var React = require('react');
var _ = require('lodash');
var mui = require('material-ui');
var Paper = mui.Paper;
var RaisedButton = mui.RaisedButton;
var Thumbnail = require('../thumbnail/thumbnail');
var ajax = require('../../utils/fetch');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      'projects': [],
      'tags': {},
      'value': '',
      'zdepth': 1,
      paperStyle: {
        minHeight: '400px',
      }
    };
  },
  componentWillMount: function() {
    this.update_projects();
    this.paperSize();
  },
  update_projects: function() {
    var url = '/project/search?limit=9';
    ajax(url).then(function(res) {
      return res.json();
    }).then(function(projects) {
      this.setState({'projects': projects},function(){
        this.paperSize();
      });
    }.bind(this));
  },
  paperSize: function(){
    var originalStyle = this.state.paperStyle;
    if(this.state.projects.length > 3){
      originalStyle.minHeight = '600px';
    }
    if(this.state.projects.length > 6){
      originalStyle.minHeight = '900px';
    }
    this.setState({paperStyle : originalStyle});
  },
  render: function(){
    return (
      <div>
      <Paper style={this.state.paperStyle} zdepth={this.state.zdepth}>
	      <div>
	        <div className="featured">Featured Projects & Organizations</div>
		    </div>
        <div className="eachThumbnail">
          {this.state.projects.map(function(project) {
            return <Thumbnail key={project.id} url={'/project/' + project.id} header={project.name} description={project.description} tags={project.skills} imageURL={project.organization.logo_url} />;
          })}
        </div>
      </Paper >
      <Paper zdepth={0}>
        <div style={{'paddingBottom':'10px', 'paddingTop':'10px'}} className="browse-button">
          <RaisedButton linkButton={true} href="#/browse" secondary={true} label="Browse More" />
        </div>
      </Paper >
      </div>
    )
  }
})