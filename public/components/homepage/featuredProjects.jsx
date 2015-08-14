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
        <div className="featured">About Us</div>
        <div>
	  		  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur ratione harum voluptate adipisci, numquam! Ducimus maxime accusamus, nisi, nulla dolorum ad expedita eligendi officiis hic, a distinctio non ea est adipisci fuga eius ipsum quos, modi sunt cum doloremque magni eum! Dolore repudiandae ea porro! Facere id eligendi ipsum accusamus, itaque tempore ab impedit deleniti illo facilis eius veritatis eveniet molestiae molestias tenetur omnis architecto, reprehenderit numquam odio aut voluptas illum fuga repellendus. Asperiores odit amet ex, praesentium nobis iure ad aliquid accusantium mollitia, eligendi fugiat voluptatibus explicabo corrupti officiis aperiam repellat at, ipsum cupiditate! Dicta temporibus cumque aspernatur repudiandae doloremque facilis quas itaque! Ipsum hic ducimus suscipit tempore, perferendis cumque ullam itaque laboriosam pariatur nesciunt quis nihil facere, aspernatur sequi, dignissimos tempora debitis sunt. Quo accusamus illum architecto eos! Sit quasi sed cumque ipsum reiciendis vero enim mollitia temporibus sint exercitationem quisquam, veritatis omnis ut molestiae. Neque quia sit quaerat, deleniti aliquid! Ab magnam ex tenetur, velit, necessitatibus omnis eligendi minus labore veniam incidunt aut. Ad modi amet, similique suscipit in perferendis fugit deserunt recusandae aspernatur cupiditate accusamus possimus quae veniam, asperiores blanditiis nihil a iure voluptatem incidunt! Quidem soluta, libero sint. Dolorum cumque quae est officia, molestiae quaerat?</p>
        </div>
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