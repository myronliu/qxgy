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
          productname:'护眼霜',
          productimg:'http://img3.3lian.com/2013/s1/20/d/57.jpg',
          price: 10,
          unit: '瓶',
          tip:'已售10份',
          detail:''
        },
        ordercount: 0,
        orderamount: 0
      }
    },

    userCenter:function(){
        window.to('/user/usercenter')
    },

    apiSuccess:function(url,body){
        // this.setState({showLoading: false})
        // var investeId=0;
        // if(this.state.currentBuyData.data){
        //     investeId=this.state.currentBuyData.data.id;
        // }
        // switch(url){
        //     case UrlConfig.homeHots:
        //         this.setState({data:body});
        //         break;
        //     case UrlConfig.memberCheckAccount:
        //         var result =buyCondition(true,true,true,body);
        //         if(result.url.length>0){
        //             this.setState({
        //                 isShowAlert:true,
        //                 checkData:result
        //             })
        //         }else{
        //             this.setState({showLoading: true})
        //             ApiAction.post(UrlConfig.balanceCheck,{amount:'0'})
        //         }
        //         break;
        //     case UrlConfig.balanceCheck:
        //         console.log('balanceCheck');
        //         if(body.hasFundAccount==='1'){
        //             this.setState({
        //                 userData:body
        //             })
        //             if(this.state.currentBuyData.data){
        //                 this.toBuy();
        //             }

        //         }else{
        //             this.setState({showLoading: true})
        //             ApiAction.post(UrlConfig.openFundAccount,{})
        //         }
        //         break;
        //     case UrlConfig.openFundAccount:
        //         this.setState({showLoading: true})
        //         ApiAction.post(UrlConfig.balanceCheck, {amount: '0'})
        //         break;
        //     case UrlConfig.bidInveste(investeId):


        //         var amount=this.state.currentBuyData.amount;
        //         var isCheckLiCai=this.state.currentBuyData.isCheckLiCai;

        //         var licai='0';
        //         if(isCheckLiCai){
        //             var licaijinBalance=this.state.userData.licaijinBalance;
        //             if(Number(licaijinBalance)>= Number(amount)){
        //                 licai=amount;
        //             }else{
        //                 licai=licaijinBalance;
        //             }
        //         }

        //         var message='您可以在个人中心查看您的投资信息';
        //         if(Number(licai)>0){
        //             message='使用理财金'+licai+'元';
        //         }
        //         window.to(WebUrl.paySuccess('成功购买'+amount+'元',message))
        //         break;
        // }

    },

    apiFail:function(url,status,message,body){
        // this.showLoading(false)
        // if(status==1004||status==1088){//1004为用户在其他地方登录， 1088为用户升级未完成
        //     cleanUserCache();
        //     // this.gotoLoginPage();
        // }else if((status==1021||status==1022)&&url===UrlConfig.balanceCheck){

        // }else{
        //     Toast.show(message, 1500);
        // }
    },

    componentWillMount:function(){
        // var data= this.setClientData(UrlConfig.homeHots);
        // this.setState({
        //     data:data
        // });
    },

    componentDidMount:function(){
        // super.componentDidMount()
        // if(!!this.props.timestamp && (!TempStorage.get("timestamp") || TempStorage.get("timestamp") != this.props.timestamp)){
        //     TempStorage.save("timestamp", this.props.timestamp);
        //     if(this.props.auth){
        //         document.cookie = 'auth' + '='+ this.props.auth+';path=/';
        //     }
        //     if(this.props.ssoToken){
        //         document.cookie = 'ssoToken' + '='+ this.props.ssoToken+';path=/';
        //     }
        // }
        // console.log('=======----------');

        // this.setState({showLoading: true})
        // ApiAction.post(UrlConfig.homeHots,{})

        // var auth=getCookie('auth')
        // console.log('=======----------');
        // if(auth&&auth.length>10){
        //     this.setState({showLoading: true})
        //     ApiAction.post(UrlConfig.balanceCheck, {amount: '0'})
        // }else{
        //     this.setState({userData:null});
        // }

        // var ordercount = 0;
        // var orderamount = 0;
        // for (var i = 0; i < this.state.productlist.length; i++) {
        //   var co = parseInt(TempStorage.getFromLocalStorage("productId_"+this.state.productlist[i]) || 0);
        //   ordercount += co;
        //   for(var j=0; j< this.state.data.products.length;j++){
        //     if(this.state.productlist[i].toString() == this.state.data.products[j].productid.toString()){
        //       orderamount += co * this.state.data.products[j].price;
        //     }
        //   }
        // };
        var co = parseInt(TempStorage.getFromLocalStorage("productId_"+this.props.productid) || 0);

        this.setState({
          ordercount:co,
          orderamount:co * this.state.product.price
        })
    },

    componentWillUnmount:function(){
    },

    gotoLoginPage:function(){

    },

    handleBook:function(){
      alert("test")
    },

    render:function(){
        var rightBtn={title:'登录',func:this.gotoLoginPage.bind(this)};
        if(process.browser)
        {
            var auth=getCookie('auth');
            console.log(auth);

            if(auth&&auth.length>10){
                rightBtn={icon:'/images/h5/user.png',func:this.userCenter}
            }
        }

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
              {this.state.product.detail}
            </div>
            <Book count={this.state.ordercount} amount={this.state.orderamount} handleBook={this.handleBook}/>
          </Layout>
        )
    }
})