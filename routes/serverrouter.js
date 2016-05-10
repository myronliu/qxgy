var express = require('express');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var router = express.Router();
var testpage = React.createFactory(require('../pages/testpage'));
var error = React.createFactory(require('../pages/error'));
var Weixin_Config = require('../config/weixin');
var CheckSignature = require('../services/weixin/checksignature');
var ObjectToXML = require('../helper/objecttoxml');

var Login = React.createFactory(require('../pages/user/login'));
var Register = React.createFactory(require('../pages/user/register'));
var Findpwd = React.createFactory(require('../pages/user/findpwd'));
var Resetpwd = React.createFactory(require('../pages/user/resetpwd'));
var Usercenter = React.createFactory(require('../pages/user/usercenter'));
var Home = React.createFactory(require('../pages/home'));
var ProductList = React.createFactory(require('../pages/order/productlist'));
var Address = React.createFactory(require('../pages/order/address'));
var AddAddress = React.createFactory(require('../pages/address/add'));
var OrderList = React.createFactory(require('../pages/order/orderlist'));
var ProductDetail = React.createFactory(require('../pages/products/detail'));

var apiAddress = "http://a.com/";
if(process.env.NODE_ENV != undefined){
  switch(process.env.NODE_ENV ){
    case "uat":
      apiAddress =  "http://uat.com/";
      break;
    case "production":
      apiAddress = "http://prd.com/";
      break;
    case "development":
      //apiAddress = "http://api.dev.lezhuan.io/zhuanle";
      //apiAddress =  "http://zzhuanle2.kjtpay.com/zhuanle";

      apiAddress = "http://dev.com/";
      break;
  }
}

// TODO: 这里设置的是服务端发起请求的url设置
// global.ajaxSet = {url:apiAddress,header:{"Content-Type":"application/json","X-KJT-Agent": "h511111111111111111111111;h511111111111111111111111;h5;h5;;h5;h5;1.0.0;WIFI;h511111111111111111111111","X-KJT-AUTH": "","X-SSO-Auth":"","X-API-VER": "2.0"}}
global.ajaxConfig = {url:"http://localhost:3009",header:{'Content-Type': 'application/json','X-KJT-Agent': 'h511111111111111111111111;h511111111111111111111111;h5;h5;;h5;h5;1.0.0;WIFI;h511111111111111111111111','X-KJT-AUTH': '','X-SSO-Auth':'','X-API-VER': '2.0'}}

router.get('/error', function(req, res, next) {
  var reactHtml = ReactDOMServer.renderToString(error());
  res.render('index', {reactOutput: reactHtml, title: 'testpage'});
});

router.get(['/','/home'], function(req, res, next) {
  var reactHtml = ReactDOMServer.renderToString(Home());
  res.render('index', {reactOutput: reactHtml, title: '清新果园'});
});

router.get('/user/login', function(req, res, next) {
  var reactHtml = ReactDOMServer.renderToString(Login({fromUrl: req.query.fromUrl}));
  res.render('index', {reactOutput: reactHtml, title: '登录'});
});

router.get('/user/register', function(req, res, next) {
  var reactHtml = ReactDOMServer.renderToString(Register());
  res.render('index', {reactOutput: reactHtml, title: '注册'});
});

router.get('/user/findpwd', function(req, res, next) {
  var reactHtml = ReactDOMServer.renderToString(Findpwd());
  res.render('index', {reactOutput: reactHtml, title: '找回密码'});
});

router.get('/user/resetpwd', function(req, res, next) {
  var reactHtml = ReactDOMServer.renderToString(Resetpwd());
  res.render('index', {reactOutput: reactHtml, title: '重设密码'});
});

router.get('/user/usercenter', function(req, res, next) {
  var reactHtml = ReactDOMServer.renderToString(Usercenter());
  res.render('index', {reactOutput: reactHtml, title: '用户中心'});
});

router.get('/order/productlist', function(req, res, next) {
  var reactHtml = ReactDOMServer.renderToString(ProductList({shopId: req.query.shopId}));
  res.render('index', {reactOutput: reactHtml, title: '预定'});
});

router.get('/order/orderlist', function(req, res, next) {
  var reactHtml = ReactDOMServer.renderToString(OrderList({type:req.query.type}));
  res.render('index', {reactOutput: reactHtml, title: '订单'});
});

router.get('/order/address', function(req, res, next) {
  var reactHtml = ReactDOMServer.renderToString(Address({shopId: req.query.shopId}));
  res.render('index', {reactOutput: reactHtml, title: '填写地址'});
});

router.get('/address/add', function(req, res, next) {
  var reactHtml = ReactDOMServer.renderToString(AddAddress());
  res.render('index', {reactOutput: reactHtml, title: '新增地址'});
});

router.get('/products/detail', function(req, res, next) {
  var reactHtml = ReactDOMServer.renderToString(ProductDetail({productid: req.query.productid}));
  res.render('index', {reactOutput: reactHtml, title: '产品详情'});
});

router.get('/weixin/qxgy', function(req, res, next) {
  var token = Weixin_Config.token;
  var signature = req.query.signature;
  var timestamp = req.query.timestamp;
  var nonce = req.query.nonce;
  var echostr = req.query.echostr;
  if(CheckSignature(token, signature, timestamp, nonce)){
    res.send(echostr)
  }else{
    res.send("error");
  }
});

router.post('/weixin/qxgy', function(req, res, next) {
  if(req.body.MsgType === 'text'){
    var json = {
      "ToUserName": req.body.FromUserName,
      "FromUserName": req.body.ToUserName,
      "CreateTime": new Date().getTime(),
      "MsgType": "text",
      "Content": '菜单：1:预定；2查看。您发送的信息为：' + req.body.Content
    };
   
    var xml = ObjectToXML(json);
    console.log(xml)
    try{
      res.set('Content-Type', 'text/xml;charset=utf-8');
      res.send(xml);
    }catch(e){
      console.log(e)
    }

  }else if(req.body.xml.content === 'image'){

  }else if(req.body.xml.content === 'voice'){//语音

  }else if(req.body.xml.content === 'video'){//视频

  }else if(req.body.xml.content === 'shortvideo'){//小视频

  }else if(req.body.xml.content === 'location'){//地理位置

  }else if(req.body.xml.content === 'link'){//链接

  }else{

  }
});

router.post('/manage/weixin/setmenu', function(req, res, next) {
  
  if(CheckSignature(token, signature, timestamp, nonce)){
    res.send(echostr)
  }else{
    res.send("error");
  }
});


module.exports = router;
