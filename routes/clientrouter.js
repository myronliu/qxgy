var React = require('react');
var ReactDOM = require('react-dom');
// var Router = require('../helper/router');
var EvoFlux = require('evoflux');
var Testpage = require('../pages/testpage');//一定要大写啊亲～～～～～～～
var reactBodyContainer = document.getElementById('react-body-container');
function _reactRender(cmpt, opts){
  opts = opts || {};
  ReactDOM.render(cmpt, reactBodyContainer);
}

// TODO: 这里设置的是客户端发起请求的url设置
global.ajaxConfig = {url:"/api",header:{'Content-Type': 'application/json','X-KJT-Agent': 'h511111111111111111111111;h511111111111111111111111;h5;h5;;h5;h5;1.0.0;WIFI;h511111111111111111111111','X-KJT-AUTH': '','X-SSO-Auth':'','X-API-VER': '2.0'}}
// React.initializeTouchEvents(true);//react0.14版本已经可以不用写这个了。。。
// var Router = Router.__create__({
var Router = EvoFlux.createRouter({
  '/': function(){
    //console.log(testpage)
    // _reactRender(<testpage />);
    // console.log(reactBodyContainer)
    ReactDOM.render(<Testpage />, reactBodyContainer);
  }
}).configure({html5history:true}).init();

window.to = function(url){return Router.setRoute(url);}

//待完成

module.exports = Router;