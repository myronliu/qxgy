
var React = require('react');
var TapAble = require('react-tappable');
var TempStorage = require('../helper/tempstorage.js');

var swiper_div={
  padding: "10px",
  paddingBottom: "0px",
  marginBottom: "10px",
  backgroundColor: "white"
};
var content={
  display: "inline-block",
  width: '70%'
};
var icon_style={
  display: "inline-block",
  width: '29%',
  textAlign: 'center',
  height: '58px',
  verticalAlign: 'middle',
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
var rightstyle_add={
  display: 'inline-block',
  width: '20px',
  float: 'right'
};
var rightstyle_num={
  display: 'inline-block',
  color:'red',
  fontWeight:'bold'
};
var rightstyle_sub={
  display: 'inline-block',
  width: '20px',
  float: 'left'
};
var rightimg={
  width: "20px",
  height: "20px",
};

// image:'http://img1.imgtn.bdimg.com/it/u=743657958,2658206245&fm=21&gp=0.jpg',
// productid:'1',
// shopname:'护眼霜',
// shopimg:'http://tx.haiqq.com/uploads/allimg/150327/2115411L5-8.jpg',
// price: 10,
// unit: '瓶',
// tip:'已售10份',
// selfoperation:false

module.exports = React.createClass({
  // propTypes: {
  //   data: React.PropTypes.data
  // },
  getDefaultProps: function(){
    data:{}
  },
  getInitialState: function(){
    return {
      count: 0
    }
  },
  componentDidMount: function(){
    // this.setState({
    //   count: parseInt(TempStorage.getFromLocalStorage("productId_"+this.props.data._id) || 0)
    // })
  },
  nextPage: function(){
    window.to("/products/detail?productid="+this.props.data._id)
  },
  add: function(){
    if(this.state.count<99){
      // TempStorage.saveToLocalStorage("productId_"+this.props.data._id, this.state.count + 1)
      this.setState({
        count: this.state.count + 1
      })
      this.props.additem(this.props.data);
    }
  },
  sub: function(){
    if(this.state.count > 0){
      // TempStorage.saveToLocalStorage("productId_"+this.props.data._id, this.state.count - 1)
      this.setState({
        count: this.state.count - 1
      })
      this.props.subitem(this.props.data);
    }
  },
  render:function(){
    
    return (
      <div style={swiper_div}>
          <TapAble onTap={this.nextPage}>
            <div style={content}>
              <div style={photostyle}>
                <img
                  style={imgstyle}
                  src={this.props.data.icon}
                />
              </div>
              <div style={contentstyle}>
                <div style={shopname}>{this.props.data.name}</div>
                <div style={type}>{"价格：" + this.props.data.price + "元／"+this.props.data.unit}</div>
                <div style={selfoperation}>{"库存：" + (true ? "充足":this.props.data.stock)}</div>
              </div>
            </div>
          </TapAble>
          <div style={icon_style}>
            <div 
              style={rightstyle_sub}
              onTouchEnd={this.sub}
            >
              <img
                style={rightimg}
                src={"/images/h5/sub.png"}
              />
            </div> 
            <div style={rightstyle_num}>
              {this.state.count}
            </div>
            <div 
              style={rightstyle_add}
              onTouchEnd={this.add}
            >
              <img
                style={rightimg}
                src={"/images/h5/add.png"}
              />
            </div>
          </div>
      </div>
    );
  }
})