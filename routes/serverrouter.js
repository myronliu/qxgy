var express = require('express');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var router = express.Router();
var testpage = React.createFactory(require('../pages/testpage'));
var error = React.createFactory(require('../pages/error'));
var Weixin_Config = require('../config/weixin');
var CheckSignature = require('../services/weixin/checksignature');
var ObjectToXML = require('../helper/objecttoxml');

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
global.ajaxSet = {url:apiAddress,header:{"Content-Type":"application/json","X-KJT-Agent": "h511111111111111111111111;h511111111111111111111111;h5;h5;;h5;h5;1.0.0;WIFI;h511111111111111111111111","X-KJT-AUTH": "","X-SSO-Auth":"","X-API-VER": "2.0"}}

/* GET home page. */
router.get('/', function(req, res, next) {
  var reactHtml = ReactDOMServer.renderToString(testpage());
  console.log(reactHtml)
  res.render('index', {reactOutput: reactHtml, title: 'testpage'});
});

router.get('/error', function(req, res, next) {
  var reactHtml = ReactDOMServer.renderToString(error());
  res.render('index', {reactOutput: reactHtml, title: 'testpage'});
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
