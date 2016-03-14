var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      pageTitle: "",
      site:"",
      location:"",
      startTime: "",
      endDate: ""
    };
  },
  componentDidMount: function(){
    
  },

  componentWillUnmount: function() {
  },
  handleClick: function(){
    console.log("this is a test");
  },
  render:function(){
    return (
      <div onClick={this.handleClick}>
        <h1>error</h1>
      </div>
    )
  }
})