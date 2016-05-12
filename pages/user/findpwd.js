var React = require('react');
var Layout = require('../../components/layout');
var Toast = require('../../helper/toast');
var Loading = require('../../helper/loading');
var PasswordText = require('../../components/passwordtext');
var NextButton = require('../../components/nextbutton');
var Input = require('../../components/Input');
var TitleInput = require('../../components/titleinput');
var ApiStore = require('../../helper/apistore');
var ApiAction =  require('../../helper/apiaction');
var SmsCodeText = require('../../components/smscodetext');
var UrlConfig = require('../../config/urlconfig');
var CheckBox = require('../../components/checkbox');

module.exports = React.createClass({
  getInitialState:function(){
    return{
      showLoading: false,
      checked:true,
      isShowTime:false
    }
  },

  showLoading:function(show) {
    this.setState({showLoading: show})
  },

  componentWillMount:function(){
    ApiStore.addApiFun(this.apiSuccess,this.apiFail);
  },

  apiSuccess:function(url,body){
    this.showLoading(false)
    switch(url){
      case UrlConfig.userpwdreset:
        // Cookie.setCookie('account', body.account);
        // Cookie.setCookie('token', body.token);
        window.to('/user/login?fromUrl=/');
        break;
    }
  },

  apiFail:function(url,status,message,body){
    this.showLoading(false)
    Toast.show(message, 1500);
  },
  
  downkeyboard:function() {
    this.refs.telNumber.refs.input.blur();
    this.refs.email.refs.input.blur();
  },

  smsTimeShow:function(show){
    this.setState({
      isShowTime:show
    })
  },

  smsTimeComplite:function(){
    this.smsTimeShow(false);
  },

  nextBtnPress:function() {
    this.downkeyboard()
    var phone = this.refs.telNumber.state.value;
    var email = this.refs.email.state.value;
    var phoneTest = /^1\d{10}$/;
    var emailTest = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if(phone.length===0){
      Toast.show('请输入手机号',1500);
    }else if(!phoneTest.test(phone)){
      Toast.show('请输入正确手机号',1500);
    }else if(email.length == 0){
      Toast.show("请输入邮箱", 1500)
    }else if(!emailTest.test(email)){
      Toast.show("邮箱输入不正确");
    }else{
      var params={
        account: phone,
        email: email
      }
      this.showLoading(true)
      ApiAction.post(UrlConfig.userpwdreset, params)
    }
  },

  handlerCheckboxChange:function(isCheck){
    this.setState({
      checked:isCheck
    })
  },

  render:function() {
    return (
      <Layout className={'register'} title={'找回密码'}>
        <Loading showLoading={this.state.showLoading}/>
        <img className='img' src='/images/h5/header_back.png'/>
        <div className='center_input'>
          <TitleInput type={'number'}  title={'手机号'} ref='telNumber' inputWidth={'70%'} placeholder={'请输入手机'}/>
        </div>
        <div className='center_input'>
          <TitleInput title={'邮箱'} ref='email' inputWidth={'70%'} placeholder={'请输入邮箱'}/>
        </div>
        <div className='button'>
          <NextButton disabled={!this.state.checked}  onTouchEnd={this.nextBtnPress} title={'确定'}/>
        </div>
      </Layout>
    )
  }
})