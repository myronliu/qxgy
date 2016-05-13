var React = require('react');
var TapAble = require('react-tappable');
var Loading = require('../../helper/loading.js');
var TempStorage = require('../../helper/tempstorage.js');
var Layout = require('../../components/layout_list');
var getCookie = require('../../helper/getCookie');
var EditAddress = require('../../components/editaddress');
var ApiAction = require('../../helper/apiaction');
var ApiStore = require('../../helper/apistore');
var UrlConfig = require('../../config/urlconfig');
var Toast = require('../../helper/toast');
// var Format = require('../../helper/format');

var productname={
  display: 'inline-block',
  fontSize: '20px',
  paddingLeft: '10px'
};
var price={
  display: 'inline-block',
  marginLeft: '20px'
};
var tip={
  paddingLeft: '10px'
}


module.exports = React.createClass({
    getInitialState:function(){
      return{
        showLoading: false,
        product:{
          productname:'',
          productimg:'',
          price: 0,
          unit: '',
          tip:'',
          detail:''
        }
      }
    },
    
    userCenter:function(){
      window.to('/user/usercenter')
    },

    apiSuccess:function(url,body){
      this.showLoading(false);
      switch(url){
        case UrlConfig.getproductbyid:
          this.setState({
            product:{
              productname: body.name,
              productimg: body.icon,
              price: body.price,
              unit: body.unit,
              tip: '货源充足',
              detail: body.detail
            }
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

    showLoading:function(show) {
      this.setState({showLoading: show})
    },

    componentDidMount:function(){
      
      this.showLoading(true);
      ApiAction.post(UrlConfig.getproductbyid,{id: this.props.productid})
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
      alert("test")
    },

    renderDetail: function(){
      var arr = this.state.product.detail.split(',');
      this.details = arr.map(function(item, i){
        return <img style={{width:'100%'}} src={item} />
      })
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
        this.renderDetail();
        return (
          <Layout hideBack={false} hideFooter={true} className={'index'} title={'预定'} rightItems={[rightBtn]}>
            <Loading showLoading={this.state.showLoading}/>
            <div className='center-wrap' style={{backgroundColor:"white"}}>
              <div>
                <img style={{width:'100%'}} src={this.state.product.productimg} />
              </div>
              <div style={productname}>
                {this.state.product.productname}
              </div>
              <div style={price}>
                {this.state.product.price + "元/" + this.state.product.unit}
              </div>
              <div style={tip}>
                {this.state.product.tip}
              </div>
            </div>
            <div className='section'>产品详情</div>
            <div>
              {this.details}
            </div>
          </Layout>
        )
    }
})