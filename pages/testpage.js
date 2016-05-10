var React = require('react');
var ApiStore = require('../helper/apistore');
var ApiAction = require('../helper/apiaction');
var UrlConfig = require('../config/urlconfig');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      pageTitle: "添加广告",
      site:"",
      location:"",
      startTime: "",
      endDate: ""
    };
  },
  apiSuccess: function(url,body){
    switch(url){
      case UrlConfig.homeHots:
        console.log(body);
        //balabala...
        break;
      case UrlConfig.homeHeaders:
        //balabala....
        break;
      case UrlConfig.openFundAccount:
        window.to('/financing/buy');//示例跳转
        break;
    }
  },
  apiFail:function(url,status,message,body){
    // this.showLoading(false)
    if(status==1004||status==1088){//1004为用户在其他地方登录， 1088为用户升级未完成
      // TODO
    }else{
      // TODO
    }
  },
  componentDidMount: function(){
    //先注释掉
    ApiStore.addApiFun(this.apiSuccess.bind(this),this.apiFail.bind(this));
    ApiAction.post(UrlConfig.homeHots,{});//发起请求
  },
  componentWillUnmount: function() {
    //先注释掉
    ApiStore.removeApiFun(this.apiSuccess.bind(this),this.apiFail.bind(this));
  },
  handleClick: function(){
    console.log("this is a test");
  },
  render:function(){
    console.log("slkdjfsdlkjfsldkjfj-----")
    return (
      <div  onClick={this.handleClick}>
        <h1>hhhhhafasdfsadlfs</h1>
      </div>
    )
  }
})