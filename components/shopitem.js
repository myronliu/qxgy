
var React = require('react');
var TapAble = require('react-tappable');
var swiper_div={
  padding: "10px",
  paddingBottom: "0px",
  marginBottom: "10px",
  backgroundColor: "white"
};
var content={

};
var photostyle={
  display: "inline-block",
  height: "58px",
  float: "left",
  marginTop: "7px"
};
var imgstyle={
  width: "40px",
  height: "40px",
  borderRadius: "20px"
};
var contentstyle={
  display: "inline-block",
  marginLeft: "10px",
};
var shopname={
  fontSize: "15px",
  fontWeight: "bold"
};
var type={
  fontSize:"10px"
};
var selfoperation={
  fontSize:"10px"
};
var rightstyle={
  isplay: "inline-block",
  height: "58px",
  float: "right",
  marginTop: "19px"
};
var rightimg={
  width: "20px",
  height: "20px",
};

module.exports = React.createClass({
  // propTypes: {
  //   data: React.PropTypes.data
  // },
  getDefaultProps: function(){
    data:{}
  },
  nextPage: function(){
    window.to("/order/productlist?shopId=" + this.props.data._id);
  },
  render:function(){
    var imgStyle={
      width:'100%'
    }
    // image:'http://img1.imgtn.bdimg.com/it/u=743657958,2658206245&fm=21&gp=0.jpg',
    //           id:'1',
    //           shopname:'韩国化妆品代购',
    //           shopimg:'http://tx.haiqq.com/uploads/allimg/150327/2115411L5-8.jpg',
    //           type:'化妆品',
    //           selfoperation:false
    return (
      <div style={swiper_div}>
        <TapAble onTap={this.nextPage}>
          <img src={this.props.data.shopBacksImg} style={imgStyle}/>
          <div style={content}>
            <div style={photostyle}><img
              style={imgstyle}
              src={this.props.data.shopAvatarImg}
            /></div>
            <div style={contentstyle}>
              <div style={shopname}>{this.props.data.name}</div>
              <div style={type}>{this.props.data.type}</div>
              <div style={selfoperation}>{this.props.data.self.toString() == "true" ? "⭐️平台自营":"平台商户"}</div>
            </div>
            <div style={rightstyle}><img
              style={rightimg}
              src={"/images/h5/right.png"}
            /></div>
          </div>
        </TapAble>
      </div>
    );
  }
})