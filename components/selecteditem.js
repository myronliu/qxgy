
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
  width: '60%'
};
var icon_style={
  display: "inline-block",
  width: '39%',
  textAlign: 'center',
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
  height: '65px',
  lineHeight: '55px',
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
  width: '60px',
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

module.exports = React.createClass({
  // propTypes: {
  //   data: React.PropTypes.data
  // },
  // getDefaultProps: function(){
  //   data:{}
  // },
  // getInitialState: function(){
  //   return {
  //     count: 0,
  //     price: 0,
  //     money: 0
  //   }
  // },
  componentDidMount: function(){
    // this.setState({
    //   count: parseInt(TempStorage.getFromLocalStorage("productId_"+this.props.data.productid) || 0)
    // })
  },
  nextPage: function(){
    window.to("/user/login");
  },
  
  render:function(){
    return (
      <div style={swiper_div}>
          <div style={content}>
            <div style={photostyle}>
              <img
                style={imgstyle}
                src={this.props.data.icon}
              />
            </div>
            <div style={contentstyle}>
              <div style={shopname}>{this.props.data.name}</div>
            </div>
          </div>
          <div style={icon_style}>
            <div style={rightstyle_sub}>
              {this.props.price}*{this.props.count}
            </div> 
            <div style={rightstyle_add}>
              {this.props.money || 0}元
            </div>
          </div>
      </div>
    );
  }
})