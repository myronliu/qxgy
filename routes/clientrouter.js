var React = require('react');
var ReactDOM = require('react-dom');
// var Router = require('../helper/router');
var EvoFlux = require('evoflux');
var Testpage = require('../pages/testpage');//一定要大写啊亲～～～～～～～

var Login = require('../pages/user/login');
var Register = require('../pages/user/register');
var Findpwd = require('../pages/user/findpwd');
var Resetpwd = require('../pages/user/resetpwd');
var Usercenter = require('../pages/user/usercenter');
var Home = require('../pages/home');
var ProductList = require('../pages/order/productlist');
var Address = require('../pages/order/address');
var AddAddress = require('../pages/address/add');
var OrderList = require('../pages/order/orderlist');
var ProductDetail = require('../pages/products/detail');

var reactBodyContainer = document.getElementById('react-body-container');
function _reactRender(cmpt, opts){
  opts = opts || {};
  React.render(cmpt, reactBodyContainer);
}

// TODO: 这里设置的是客户端发起请求的url设置
global.ajaxConfig = {url:"/api",header:{'Content-Type': 'application/json','X-KJT-Agent': 'h511111111111111111111111;h511111111111111111111111;h5;h5;;h5;h5;1.0.0;WIFI;h511111111111111111111111','X-KJT-AUTH': '','X-SSO-Auth':'','X-API-VER': '2.0'}}
global.ajaxQXGYConfig = {url:"http://localhost:3009",header:{'Content-Type': 'application/json','X-KJT-Agent': 'h511111111111111111111111;h511111111111111111111111;h5;h5;;h5;h5;1.0.0;WIFI;h511111111111111111111111','X-KJT-AUTH': '','X-SSO-Auth':'','X-API-VER': '2.0'}}
// React.initializeTouchEvents(true);//react0.14版本已经可以不用写这个了。。。
// var Router = Router.__create__({
var Router = EvoFlux.createRouter({
  '/': function(){
    ReactDOM.render(<Home />, reactBodyContainer);
  },
  '/home': function(){
    ReactDOM.render(<Home />, reactBodyContainer);
  },
  '/user/login':function(){
    ReactDOM.render(<Login fromUrl={this.query('fromUrl')}/>, reactBodyContainer);
  },
  '/user/register':function(){
    ReactDOM.render(<Register />, reactBodyContainer);
  },
  '/user/findpwd':function(){
    ReactDOM.render(<Findpwd />, reactBodyContainer);
  },
  '/user/resetpwd':function(){
    ReactDOM.render(<Resetpwd />, reactBodyContainer);
  },
  '/user/usercenter':function(){
    ReactDOM.render(<Usercenter />, reactBodyContainer);
  },
  '/order/productlist':function(){
    ReactDOM.render(<ProductList shopId={this.query('shopId')} />, reactBodyContainer);
  },
  '/order/orderlist':function(){
    ReactDOM.render(<OrderList type={this.query('type')} />, reactBodyContainer);
  },
  '/order/address':function(){
    ReactDOM.render(<Address shopId={this.query('shopId')} />, reactBodyContainer);
  },
  '/address/add':function(){
    ReactDOM.render(<AddAddress />, reactBodyContainer);
  },
  '/products/detail':function(){
    ReactDOM.render(<ProductDetail productid={this.query('productid')} />, reactBodyContainer);
  }
}).configure({html5history:true,convert_hash_in_init:false,after:function(){
  window.scrollTo(0,0);
}}).init();

window.to = function(url){return Router.setRoute(url);}

//待完成

module.exports = Router;