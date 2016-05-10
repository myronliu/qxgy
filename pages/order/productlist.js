var React = require('react');
var TapAble = require('react-tappable');
var Loading = require('../../helper/loading.js');
var TwoBtnAlert = require('../../components/twobtnalert.js');
var TitleInputWithAlert = require('../../components/alert/titleinputwithalert.js');
var TempStorage = require('../../helper/tempstorage.js');
var Layout = require('../../components/layout_list');
var getCookie = require('../../helper/getCookie');
var ProductItem = require('../../components/productitem');
var Cart = require('../../components/cart');
var ApiAction = require('../../helper/apiaction');
var ApiStore = require('../../helper/apistore');
var UrlConfig = require('../../config/urlconfig');
var Toast = require('../../helper/toast');

module.exports = React.createClass({
    getInitialState:function(){
      return{
        showLoading: false,
        productlist:['5728468df3ae273a84bcc9e2'],
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
        case UrlConfig.getproducts:
          this.setState({products:body});
          var ordercount = 0;
          var orderamount = 0;
          this.setState({
            ordercount:ordercount,
            orderamount:orderamount
          })
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

    componentDidMount:function(){
      TempStorage.saveToLocalStorage("shop_"+this.props.shopId, JSON.stringify({}))
      this.showLoading(true);
      ApiAction.post(UrlConfig.getproducts,{shopId: this.props.shopId});
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

    handleOrder:function(){
      var shop = JSON.parse(localStorage["shop_"+this.props.shopId]);
      for(var i=0; i < this.state.products.length; i++){
        if(shop["productId_"+this.state.products[i]._id] > 0){
          window.to("/order/address?shopId=" + this.props.shopId);
          return;
        }
      }
      Toast.show("未选择产品");
    },

    additem: function(data){
      var shop = JSON.parse(localStorage["shop_"+this.props.shopId]);
      shop["productId_"+data._id] = parseInt(shop["productId_"+data._id]||0) + 1;
      TempStorage.saveToLocalStorage("shop_"+this.props.shopId, JSON.stringify(shop));
      this.setState({
        ordercount:parseInt(this.state.ordercount) + 1,
        orderamount:parseFloat(this.state.orderamount) + parseFloat(data.price)
      })
    },

    subitem: function(data){
      var shop = JSON.parse(localStorage["shop_"+this.props.shopId]);
      shop["productId_"+data._id] = parseInt(shop["productId_"+data._id]||0) - 1;
      TempStorage.saveToLocalStorage("shop_"+this.props.shopId, JSON.stringify(shop))
      this.setState({
        ordercount:parseInt(this.state.ordercount) - 1,
        orderamount:parseFloat(this.state.orderamount) - data.price
      })
    },

    renderProducts:function(){
      if(this.state.products) {
        return this.state.products.map(function (item, i) {
          return <ProductItem key={i} data={item} additem={this.additem} subitem={this.subitem}/>
        }.bind(this));
      }
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
            <div className='center-wrap'>
              {this.renderProducts()}
            </div>
            <Cart count={this.state.ordercount} amount={this.state.orderamount} handleOrder={this.handleOrder}/>
          </Layout>
        )
    }
})