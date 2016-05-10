var React = require('react');
var Loading = require('../../helper/loading.js');
var TempStorage = require('../../helper/tempstorage.js');
var Layout = require('../../components/layout_list');
var getCookie = require('../../helper/getCookie');
var EditAddress = require('../../components/editaddress');
var NextButton = require('../../components/nextbutton');
var ApiAction = require('../../helper/apiaction');
var ApiStore = require('../../helper/apistore');
var UrlConfig = require('../../config/urlconfig');
var Toast = require('../../helper/toast');

module.exports = React.createClass({
  getInitialState:function(){
    return{
      
    }
  },

  userCenter:function(){
      window.to('/user/usercenter')
  },

  apiSuccess:function(url,body){
    this.showLoading(false);
    switch(url){
      case UrlConfig.getaddress:
        this.setState({
          buyerName: body.buyerName,
          address: body.buyerAddress,
          tel: body.buyerTel,
        });
        break;
      case UrlConfig.updateaddress:
        Toast.show("更新成功");
        window.to('/user/usercenter');
        break;
    }
  },

  apiFail:function(url,status,message,body){
    Toast.show(message, 1500);
  },

  componentDidMount:function(){
    this.showLoading(true);
    ApiAction.post(UrlConfig.getaddress,{})
  },

  componentWillMount:function(){
    ApiStore.addApiFun(this.apiSuccess,this.apiFail);
  },

  showLoading:function(show) {
    this.setState({showLoading: show})
  },
  
  gotoLoginPage:function(fromUrl){
    if(!fromUrl||(fromUrl instanceof Object)){
      fromUrl=window.location.pathname+window.location.search
    }
    window.to('/user/login?fromUrl='+fromUrl);
  },
  
  nextBtnPress: function(){
    this.showLoading(true);
    ApiAction.post(UrlConfig.updateaddress,{buyerName: this.refs.address.state.buyerName, buyerAddress: this.refs.address.state.buyerAddress, buyerTel: this.refs.address.state.buyerTel})
  },

  render:function(){
    var rightBtn={title:'登录',func:this.gotoLoginPage};
    if(process.browser)
    {
        var auth=getCookie('token');

        if(auth&&auth.length>10){
            rightBtn={icon:'/images/h5/user.png',func:this.userCenter}
        }
    }
    return (
      <Layout hideBack={false} hideFooter={true} className={'index'} title={'地址编辑'} rightItems={[rightBtn]}>
        <Loading showLoading={this.state.showLoading}/>
        <EditAddress ref="address" buyerName={this.state.buyerName} address={this.state.address} tel={this.state.tel}/>
        <div className='button' style={{paddingLeft:'10px',paddingRight:'10px'}}>
          <NextButton onTouchEnd={this.nextBtnPress} title={'确定'}/>
        </div>
      </Layout>
    )
  }
})