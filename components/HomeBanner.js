
var React = require('react');
var TapAble = require('react-tappable');

module.exports = React.createClass({
  // propTypes: {
  //   data: React.PropTypes.object
  // },
  getDefaultProps: function(){
    data:{}
  },
  nextPage:function(){
    // console.log(this.props.data.target)
    // console.log(this.props.data.type)
    if(this.props.data.type===1){
      if(this.props.data.target&&this.props.data.target.length>0){
        var target=this.props.data.target;
        var targetAry=target.split("=");
        if(targetAry.length>1){
          window.to('/financing/detail?bId='+targetAry[1]);
        }
      }
    }else{
      if(this.props.data.target&&this.props.data.target.length>0){
          window.to(this.props.data.target);
      }
    }
  },
  render:function(){
      var imgStyle={
        width:'100%'
      }
      return (
        <div className='swiper_div'>
          <TapAble onTap={this.nextPage}>
            <img src={this.props.data.image} style={imgStyle}/>
          </TapAble>
        </div>
      );
  }
})