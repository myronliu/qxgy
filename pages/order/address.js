var React = require('react');
var TapAble = require('react-tappable');
var Loading = require('../../helper/loading.js');
var TwoBtnAlert = require('../../components/twobtnalert.js');
var TitleInputWithAlert = require('../../components/alert/titleinputwithalert.js');
var TempStorage = require('../../helper/tempstorage.js');
var Layout = require('../../components/layout_list');
var getCookie = require('../../helper/getCookie');
var SelectedItem = require('../../components/selecteditem');
var Book = require('../../components/book');
var EditAddress = require('../../components/editaddress');
var ApiAction = require('../../helper/apiaction');
var ApiStore = require('../../helper/apistore');
var UrlConfig = require('../../config/urlconfig');
var Toast = require('../../helper/toast');
var Format = require('../../helper/format');

module.exports = React.createClass({
    getInitialState:function(){
      return{
        showLoading: false,
        productlist:[1,2,3,4,5,6],
        ordercount:0,
        orderamount:0,
        products: [
        ]
      }
    },

    userCenter:function(){
      window.to('/user/usercenter')
    },

    apiSuccess:function(url,body){
      this.showLoading(false);
      switch(url){
        case UrlConfig.getproductsbyids:
          this.setState({
            products: body.list,
            buyerName: body.address ? body.address.buyerName : '',
            address: body.address ? body.address.buyerAddress : '',
            tel:  body.address ? body.address.buyerTel : '',
          });
          this.cart();
          break;
        case UrlConfig.createorder:
          Toast.show("订单已经提交");
          window.to('/order/orderlist?type=0');
          break;
      }
    },

    apiFail:function(url,status,message,body){
      this.showLoading(false);
      Toast.show(message, 1500);
    },

    componentWillMount:function(){
      ApiStore.addApiFun(this.apiSuccess,this.apiFail);
    },

    cart: function(){
      var shop = JSON.parse(localStorage["shop_"+this.props.shopId]);
      var count = 0;
      var money = 0;
      for(var i = 0; i < this.state.products.length; i++) {
        var c = parseInt(shop["productId_"+this.state.products[i]._id]);
        count += c;
        money += c * parseFloat(this.state.products[i].price);
      }
      this.setState({
        ordercount:count,
        orderamount:Format.formatMoney(money, 2)
      })
    },

    componentDidMount:function(){
      var shop = JSON.parse(localStorage["shop_"+this.props.shopId]);
      var ids=[];
      for(key in shop){
        if(parseInt(shop[key]) > 0){
          ids.push(key.substring(key.indexOf('_')+1));
        }
      }
      this.showLoading(true);
      ApiAction.post(UrlConfig.getproductsbyids,{productlist:ids.join(',')})
    },

    showLoading:function(show) {
      this.setState({showLoading: show})
    },

    componentWillUnmount:function(){
    },

    gotoLoginPage:function(fromUrl){
      if(!fromUrl||(fromUrl instanceof Object)){
        fromUrl=window.location.pathname+window.location.search
      }
      window.to('/user/login?fromUrl='+fromUrl);
    },

    handleBook:function(){
      debugger;
      var address = this.refs.address.state;
      var shop = JSON.parse(localStorage["shop_"+this.props.shopId]);
      var ids=[];
      for(key in shop){
        if(parseInt(shop[key]) > 0){
          ids.push(key.substring(key.indexOf('_')+1) + ":" + shop[key]);
        }
      }
      ApiAction.post(UrlConfig.createorder,{productlist:ids.join(','), buyerName: address.buyerName, buyerAddress: address.buyerAddress, buyerTel: address.buyerTel})
    },

    renderProducts:function(){
      return this.state.products.map(function (item, i) {
        var shop = JSON.parse(localStorage["shop_"+this.props.shopId]);
        return <SelectedItem key={i} data={item} price={item.price} count={parseInt(shop["productId_"+item._id])} money={Format.formatMoney(parseInt(shop["productId_"+item._id]) * parseFloat(item.price), 2)} />
      }.bind(this));
    },
    
    render:function(){
        var rightBtn={title:'登录',func:this.gotoLoginPage};
        if(process.browser)
        {
            var auth=getCookie('token');
            // console.log(auth);

            if(auth&&auth.length>10){
                rightBtn={icon:'/images/h5/user.png',func:this.userCenter}
            }
        }

        return (
          <Layout hideBack={false} hideFooter={true} className={'index'} title={'预定'} rightItems={[rightBtn]}>
            <Loading showLoading={this.state.showLoading}/>
            <div className='section'>已选列表</div>
            <div className='center-wrap'>
              {this.renderProducts()}
            </div>
            <div className='section' style={{marginTop:'20px'}}>填写地址</div>
            <EditAddress ref="address" buyerName={this.state.buyerName} address={this.state.address} tel={this.state.tel}/>
            <Book count={this.state.ordercount} amount={this.state.orderamount} handleBook={this.handleBook}/>
          </Layout>
        )
    }
})