var React = require('react');
var ListUsers = require('./listusers');

module.exports = React.createClass({
  handleClick: function(){
    //set state causes the whole component to re-render
    //you should never directly maipulate the state such as this.state.open = false
    this.setState({open: !this.state.open});
  },
  getInitialState: function(){
    return {
      open: false,
    };
  },
  handleItemClick: function(item){
    this.setState({
      open: false,
      itemTitle: item
    })
  },
  render: function(){
    var list = this.props.pointPeople.map(function(item){
      return <ListUsers 
        item={item}
        whenItemClicked={this.handleItemClick} 
        className={this.state.itemTitle === item ? 'active' : ''}/>
    }.bind(this));

    return <div className="dropdown">
      <button onClick={this.handleClick} className="btn btn-default" type="button"> {this.state.itemTitle || this.props.pointPerson} 
        <span className="caret"></span>
      </button>
      <ul className={'dropdown-menu ' + (this.state.open ? 'show' : '')}>
        {list}
      </ul>
    </div>
  }
});