var React = require('react');
var Layout = require('../../components/layout');
var Toast = require('../../helper/toast');
var Loading = require('../../helper/loading');
var NextButton = require('../../components/nextbutton');
var Input = require('../../components/Input');
var TitleInput = require('../../components/titleinput');
var ApiStore = require('../../helper/apistore');
var ApiAction = require('../../helper/apiaction');
var UrlConfig = require('../../config/urlconfig');
var TwoBtnAlert = require('../../components/twobtnalert');
var Cookie = require('../../helper/cookie');
var md5 = require('md5');

module.exports = React.createClass({
  getInitialState:function(){
    return {
      showLoading: false,
      checkData:{
          url:'',
          message:''
      },
    }
  },

  componentWillMount:function(){
    ApiStore.addApiFun(this.apiSuccess,this.apiFail);
  },

  componentDidMount:function(){
    // Cookie.setCookie('account', '');
    // Cookie.setCookie('token', '');
  },

  showLoading:function(show) {
    this.setState({showLoading: show})
  },

  apiSuccess: function(url,body){
    this.showLoading(false);
    switch(url){
      case UrlConfig.getuser:
        Cookie.setCookie('account', body.account);
        Cookie.setCookie('token', body.token);
        if(this.props.fromUrl){
          window.to(this.props.fromUrl);
        }else if(window.history.length<=2){
          window.to('/');
        }else{
          window.history.back();
        }
        break;
    }
  },

  apiFail:function(url,status,message,body){
    this.showLoading(false)
    Toast.show(message, 1500);
  },

  downkeyboard:function() {
    this.refs.loginname.refs.input.blur();
    this.refs.loginpwd.refs.input.blur();
  },

  nextBtnPress:function() {
    this.downkeyboard()
    var loginName = this.refs.loginname.state.value;
    var psw = this.refs.loginpwd.state.value;
    if(loginName.length === 0) {
        Toast.show('请输入账户名', 1500);
    }else if (psw.length === 0) {
        Toast.show('请输入密码', 1500);
    }else {
      var phoneTest = /^1\d{10}$/;
      if(!phoneTest.test(loginName)) {
          Toast.show('手机号格式不正确', 1500);
      }else if (psw.length < 6) {
          Toast.show('密码格式不正确', 1500);
      }else {
        this.showLoading(true)
        ApiAction.post(UrlConfig.getuser,{account:loginName,password:md5(psw)})
      }
    }
  },

  render:function() {
    return (
      <Layout className={'login'} title={'登录'}>
        <Loading showLoading={this.state.showLoading}/>
        <img className='img' src='/images/h5/header_back.png'/>
        <div className='center_input'>
          <TitleInput title={'账户名'} ref='loginname' inputWidth={'70%'} placeholder={'请输入手机'}/>
          <hr/>
          <TitleInput title={'密码'} ref='loginpwd' inputWidth={'70%'} placeholder={'请输入密码'} type={'password'}/>
        </div>
        <div className='button'>
          <NextButton onTouchEnd={this.nextBtnPress} title={'登录'}/>
          <a href='javascript:window.to("/user/findpwd")'>忘记密码</a>
          <a href='javascript:window.to("/user/register")'>新用户注册</a>
        </div>
      </Layout>
    )
  }
})