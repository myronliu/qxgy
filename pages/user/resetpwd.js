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
var getCookie = require('../../helper/getCookie');

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
      case UrlConfig.userpwdupdate:
        // Cookie.setCookie('account', body.account);
        // Cookie.setCookie('token', body.token);
        Toast.show("更新成功")
        window.to('/user/usercenter');
        break;
    }
  },

  apiFail:function(url,status,message,body){
    this.showLoading(false)
    Toast.show(message, 1500);
  },
  
  downkeyboard:function() {
    // this.refs.old.refs.input.blur();
    // this.refs.newpwd.refs.input.blur();
    // this.refs.newagain.refs.input.blur();
  },

  nextBtnPress:function() {
    this.downkeyboard()
    var old = this.refs.old.state.value;
    // var newpwd = this.refs.newpwd.state.value;
    // var newagain = this.refs.newagain.state.value;
    var newpwd = this.refs.newpwd.state.password;
    var newagain = this.refs.newagain.state.password;

    if (old.length < 6) {
      Toast.show('旧密码格式不正确', 1500);
    }else if(!this.refs.newpwd.state.result){
      Toast.show('新密码格式不正确', 1500);
    }else if(!this.refs.newagain.state.result){
      Toast.show('重复新密码格式不正确', 1500);
    }else if(newpwd != newagain){
      Toast.show('新密码输入不一致', 1500);
    }else{
      var token = getCookie('token');
      var account = getCookie('account');
      if(!token || !account){
        Toast.show("用户未登录");
        return;
      }
      var params={
        account: account,
        token: token,
        oldpwd: old,
        newpwd: newpwd
      }
      this.showLoading(true);
      ApiAction.post(UrlConfig.userpwdupdate, params);
    }
  },

  handlerCheckboxChange:function(isCheck){
    this.setState({
      checked:isCheck
    })
  },
          // <TitleInput title={'新密码'} ref='newpwd' inputWidth={'70%'} placeholder={'请输入新密码'} type={'password'}/>
          // <TitleInput title={'重复新密码'} ref='newagain' inputWidth={'70%'} placeholder={'请输入重复新密码'} type={'password'}/>

  render:function() {
    return (
      <Layout className={'register'} title={'重设密码'}>
        <Loading showLoading={this.state.showLoading}/>
        <img className='img' src='/images/h5/header_back.png'/>
        <div className='center_input'>
          <TitleInput title={'旧密码'} ref='old' inputWidth={'70%'} placeholder={'请输入旧密码'} type={'password'}/>
        </div>
        <div className='center_input'>
          <PasswordText ref="newpwd" content={"6-23位,数字、字母或字符"}  typecount={2} length={"6..23"} />
        </div>
        <div className='center_input'>
          <PasswordText ref="newagain" content={"6-23位,数字、字母或字符"}  typecount={2} length={"6..23"} />
        </div>
        <div className='button'>
          <NextButton disabled={!this.state.checked}  onTouchEnd={this.nextBtnPress} title={'确定'}/>
        </div>
      </Layout>
    )
  }
})