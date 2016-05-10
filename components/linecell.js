var React = require('react');
module.exports = React.createClass({
  getDefaultProps:function(){
    return {
      showTopLine: true,
      showBottomLine: true,
      bottomLineLeft: '15px',
      paddingTopAndBottom:'0'
    }
  },
  render: function() {
    var LineStyle={
      paddingTop:this.props.paddingTopAndBottom,
      paddingBottom:this.props.paddingTopAndBottom
    };
    if (this.props.showTopLine){
      LineStyle.borderTop='1px solid #F5F5F5';
    }
    var hrStyle={
      height: 1,
      border: 0,
      backgroundColor:'#F5F5F5',
      margin: '0px 0px 0px '+this.props.bottomLineLeft
    }
    return (
      <div>
        <div style={LineStyle}>
          {this.props.children}
        </div>
        <hr style={hrStyle}/>
      </div>
    )
  }
})