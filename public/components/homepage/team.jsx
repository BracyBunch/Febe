var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;

module.exports = React.createClass({
  getInitialState: function(){
    return{
      hovering: false
    }
  },
  render: function(){
    return (
      <Paper zdepth={2}>
        <div>
          <div className="team-header">The Team</div>
            <div className="thumbnail-preview" 
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}>
                {this.image()}
                {this.state.hovering ? this.inset() : null}
            </div>
        </div>
      </Paper>
    )
  },
  inset: function(){
    return (
      <div className="inset">
        Views: Something
        <br />
        Upvotes: Something
      </div>
    )
  },
  image: function(){
    var holder = ['https://media.licdn.com/media/AAEAAQAAAAAAAAKNAAAAJDNjYzIyMTNjLWEwOWMtNDc1ZC1iMDQ5LTE3NGQ2Y2FiNTE1MQ.jpg', 'https://media.licdn.com/media/AAEAAQAAAAAAAAR2AAAAJGVlOWJlMTFkLTc3N2YtNGVkZC05YjY2LWMxNzA4OTllN2YyMQ.jpg'];
    return holder.map(function(image){
      return <img className="team-image" src={image} />
    })
  },
  handleMouseEnter: function(){
    this.setState({hovering: true});
  },
  handleMouseLeave: function(){
    this.setState({hovering: false});
  }
})