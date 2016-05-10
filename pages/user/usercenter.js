var React = require('react');
var Layout = require('../../components/layout');
var Toast = require('../../helper/toast');
var Loading = require('../../helper/loading');
var NextButton = require('../../components/nextbutton');
var IconTitleCell = require('../../components/icontitlecell');
var LineCell = require('../../components/linecell');
var ReactDOMServer = require('react-dom/server');
var TapAble = require('react-tappable');
var ApiStore = require('../../helper/apistore');
var ApiAction =  require('../../helper/apiaction');
var UrlConfig = require('../../config/urlconfig');
var Cookie = require('../../helper/cookie');


module.exports = React.createClass({
  getInitialState:function(){
    return {
        showLoading: false,
        pageData:{},
        data:{},
        isShowAlert:false,
        nextPage:'',
        checkData:{}
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

  toNoCompleteOrder: function(){
    window.to("/order/orderlist?type=0");
  },

  toCompleteOrder: function(){
    window.to("/order/orderlist?type=1");
  },

  toPwdUpdate: function(){
    window.to("/user/resetpwd");
  },

  toAddress: function(){
    window.to("/address/add");
  },

  logout: function(){
    Cookie.setCookie('account', "");
    Cookie.setCookie('token', "");
    window.to("/");
  },

  render:function() {
    return (
      <Layout className={'usercenter'} title={'用户中心'}>
        <Loading showLoading={this.state.showLoading}/>
        <section className="part-bottom">
          <LineCell>
            <TapAble onTap={this.toPwdUpdate}>
              <IconTitleCell
                  icon={'/images/h5/myttj.png'}
                  title={'修改密码'}
                  />
            </TapAble>
          </LineCell>
          <LineCell showTopLine={false}>
            <TapAble onTap={this.toAddress}>
              <IconTitleCell
                icon={'/images/h5/mylcj.png'}
                title={'我的地址'}
              />
            </TapAble>
          </LineCell>
        </section>
        <section className="part-bottom">
          <LineCell showTopLine={false}>
            <TapAble onTap={this.toNoCompleteOrder}>
              <IconTitleCell
                icon={'/images/h5/mytz.png'}
                title={'未完成订单'}
              />
            </TapAble>
          </LineCell>
          <LineCell showTopLine={false}>
            <TapAble onTap={this.toCompleteOrder}>
              <IconTitleCell
                icon={'/images/h5/myky.png'}
                title={'已完成订单'}
              />
            </TapAble>
          </LineCell>
        </section>

        <div className="lognout">
            <div onTouchEnd={this.logout} className="out-submit">安全退出</div>
        </div>
      </Layout>
    )
  }
})