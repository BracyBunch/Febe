var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;

module.exports = React.createClass({
  render: function(){
    return (
      <Paper zdepth={2}>
        <div className="aboutUs">What Is GoodInThisWorld.com?</div>
        <div>
          <div className="aboutUsStatement"> 
            <p>GoodInThisWorld.com is a site that enables software engineers to work together with Non Profits on their technical challenges.
            It is a great way for engineers to work with those they would not traditionally work with, gain meaningful experience, solve complex challenges and "code for good". 
            Non Profits, GoodInThisWorld.com is a great way to work together with talented engineers to help enhance, create or provide insight on new applications.</p>
          </div> 
        </div>
      </Paper>
    )
  }
})