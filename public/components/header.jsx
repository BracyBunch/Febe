var React = require('react');
var Router = require('react-router');
//renderable component
var Link = Router.Link;

module.exports = React.createClass({
  // getInitialState: function(){
  //   return {
  //     categories: []
  //   }
  // },
  render: function(){
    return (
      <div className="header">
        <nav className="navbar navbar-default">
          <div className= "container-fluid">
            <Link to="/" className="navbar-brand">About</Link>
            <Link to="/" className="navbar-brand">Browse</Link>
            <Link to="/" className="navbar-brand">Team</Link>
            <ul className="nav navbar-nav navbar-right">
              <button className="btn navbar-btn btn-success">Login</button>
            </ul>
          </div>
        </nav>
      </div>
    )
  },
  // renderCategories: function(){
  //   return this.state.categories.map(function(category){
  //     return <li key={category.id}>
  //       <Link to={category.link}>{category.title}</Link>
  //     </li>
  //   })
  // }
})