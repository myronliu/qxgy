var express = require('express');
var router = express.Router();
var ApiAction = require('../helper/apiaction')

router.post('*',function(req,res){
  // let auth=req.cookies.auth
  // let ssoToken=req.cookies.ssoToken
  // let ajaxSet= {};
  // ajaxSet.url=global.ajaxConfig.url;
  // ajaxSet.header=global.ajaxConfig.header;
  // ajaxSet.header['X-KJT-AUTH']=(auth===undefined?'':auth);
  // ajaxSet.header['X-SSO-Auth']=(ssoToken===undefined?'':ssoToken);

  ApiAction.post(req.url,req.body,function(data){
    // console.log("response from localhost:3009=============>")
    // console.log(data)
    res.json(data);
    // res.json("hehe")
  })
})
router.get('*',function(req,res){
  ApiAction.get(req.url,function(data){
    res.json(data);
  })
})
module.exports = router;