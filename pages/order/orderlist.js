var React = require('react');
var TapAble = require('react-tappable');
var Loading = require('../../helper/loading.js');
var TwoBtnAlert = require('../../components/twobtnalert.js');
var TitleInputWithAlert = require('../../components/alert/titleinputwithalert.js');
var TempStorage = require('../../helper/tempstorage.js');
var Layout = require('../../components/layout_list');
var getCookie = require('../../helper/getCookie');
var OrderItem = require('../../components/orderitem');
var Cookie = require('../../helper/cookie');
var ApiAction = require('../../helper/apiaction');
var ApiStore = require('../../helper/apistore');
var UrlConfig = require('../../config/urlconfig');
var Toast = require('../../helper/toast');

module.exports = React.createClass({
  getInitialState:function(){
    return{
      title: this.props.type == "1" ? "已完成订单" : "未完成订单",//0：未完成； 1：已完成；
      showLoading: false,
      type: this.props.type == "1" ? ["3"] : ["0","1","2","4","5"],
      data:[
        // {
        //   list:[{
        //     productname: '大樱桃',
        //     productimg: 'http://tx.haiqq.com/uploads/allimg/150327/2115411L5-8.jpg',
        //     price: '10',
        //     count: '1',
        //     unit: '斤'
        //   },{
        //     productname: '大樱桃-2',
        //     productimg: 'http://tx.haiqq.com/uploads/allimg/150327/2115411L5-8.jpg',
        //     price: '10',
        //     count: '1',
        //     unit: '斤'
        //   }],
        //   name: '刘永鹏',
        //   tel:'13666666666',
        //   address:'上海市浦东新区陆家嘴软件园',
        // },
        // {
        //   list:[{
        //     productname: '大樱桃',
        //     productimg: 'http://tx.haiqq.com/uploads/allimg/150327/2115411L5-8.jpg',
        //     price: '10',
        //     count: '1',
        //     unit: '斤'
        //   },{
        //     productname: '大樱桃-2',
        //     productimg: 'http://tx.haiqq.com/uploads/allimg/150327/2115411L5-8.jpg',
        //     price: '10',
        //     count: '1',
        //     unit: '斤'
        //   }],
        //   name: '刘永鹏',
        //   tel:'13666666666',
        //   address:'上海市浦东新区陆家嘴软件园',
        // },
        // {
        //   list:[{
        //     productname: '大樱桃',
        //     productimg: 'http://tx.haiqq.com/uploads/allimg/150327/2115411L5-8.jpg',
        //     price: '10',
        //     count: '1',
        //     unit: '斤'
        //   },{
        //     productname: '大樱桃-2',
        //     productimg: 'http://tx.haiqq.com/uploads/allimg/150327/2115411L5-8.jpg',
        //     price: '10',
        //     count: '1',
        //     unit: '斤'
        //   }],
        //   name: '刘永鹏',
        //   tel:'13666666666',
        //   ordertime: '2016-1-1',
        //   address:'上海市浦东新区陆家嘴软件园',
        // }
      ]
    }
  },

  userCenter:function(){
      window.to('/user/usercenter')
  },

  apiSuccess: function(url,body){
    this.showLoading(false);
    switch(url){
      case UrlConfig.getordersbytype:
        var arr = [];
        var voucherId = "";
        for(var i = 0; i < body.length; i++){
          if(voucherId != body[i].voucherId){
            var time = new Date(parseInt(body[i].createTime));
            var d = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes();
            voucherId = body[i].voucherId;
            var item = {};
            item.name = body[i].buyerName;
            item.tel = body[i].buyerTel;
            item.ordertime = d;
            item.address = body[i].buyerAddress;
            item.voucherId = body[i].voucherId;
            item.status = body[i].status;
            item.list = [];
            var order = {};
            order.productname = body[i].productName;
            order.productimg = body[i].productIcon;
            order.price = body[i].price;
            order.count = body[i].count;
            order.unit = body[i].unit;
            item.list.push(order);
            arr.push(item);
          }else{
            var item = arr[arr.length-1];
            var order = {};
            order.productname = body[i].productName;
            order.productimg = body[i].productIcon;
            order.price = body[i].price;
            order.count = body[i].count;
            order.unit = body[i].unit;
            item.list.push(order);
          }
        }
        this.setState({
          data: arr
        })
        break;
      case UrlConfig.orderupdate:
        Toast.show("更新成功", 1500);
        this.getData();
        break;
    }
  },

  apiFail:function(url,status,message,body){
    this.showLoading(false)
    Toast.show(message, 1500);
  },

  componentWillMount:function(){
    ApiStore.addApiFun(this.apiSuccess,this.apiFail);
  },

  componentDidMount:function(){
    this.getData();
  },
  getData: function(){
    var account = Cookie.getCookie("account");
    if(!account){
      Toast.show("未登录", 2000);
    }else{
      this.showLoading(true);
      ApiAction.post(UrlConfig.getordersbytype,{account: account, status: this.state.type});
    }
  },
  componentWillUnmount:function(){
  },

  gotoLoginPage:function(fromUrl){
    if(!fromUrl||(fromUrl instanceof Object)){
      fromUrl=window.location.pathname+window.location.search
    }
    window.to('/user/login?fromUrl='+fromUrl);
  },

  showLoading:function(show) {
    this.setState({showLoading: show})
  },

  renderOrders:function(){
    return this.state.data.map(function (item, i) {
      return <OrderItem key={i} data={item} onTouchEnd={this.handleTouch}/>
    }.bind(this));
  },
  
  handleTouch: function(data){
    this.showLoading(true);
    ApiAction.post(UrlConfig.orderupdate,{voucherId: data.voucherId, status: 4});
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
      <Layout hideBack={false} hideFooter={true} className={'index'} title={this.state.title} rightItems={[rightBtn]}>
        <Loading showLoading={this.state.showLoading}/>
        <div className='center-wrap'>
          {this.renderOrders()}
        </div>
      </Layout>
    )
  }
})