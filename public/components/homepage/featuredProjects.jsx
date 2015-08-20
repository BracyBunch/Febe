var React = require('react');
var Carousel = require('react-bootstrap').Carousel;
var CarouselItem = require('react-bootstrap').CarouselItem;

module.exports = React.createClass({
	getInitialState() {
		return {
			index: 0,
			direction: null
		};
	},

  handleSelect(selectedIndex, selectedDirection) {
    this.setState({
      index: selectedIndex,
      direction: selectedDirection
    });
  },

  render: function(){
    return (
      <div className="carouselProjects">
	      <div>
	        <div className="featured">Featured Projects & Organizations</div>
		      <Carousel 
		        activeIndex={this.state.index} 
		        direction={this.state.direction} 
		        onSelect={this.handleSelect}>

		        <CarouselItem className="carouselProjects">
		          <div className='carousel-caption'>
		          <img width={2000} height={1000} src='/assets/img/story.jpg'/>
		            <h3>First slide label</h3>
		            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
		          </div>
		        </CarouselItem>
		        <CarouselItem className="carouselProjects">
		          <div className='carousel-caption'>
			          <img width={screen.width} height={screen.height} alt='900x500' src='/assets/img/james.jpg'/>
		            <h3>Second slide label</h3>
		            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		          </div>
		        </CarouselItem>

		      </Carousel>
		    </div>
      </div>
    )
  }
})