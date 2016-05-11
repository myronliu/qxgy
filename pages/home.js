var React = require('react');
// var ProductList =  require('../components/productlist');
var ReactSwipe = require('../components/swiper/react-swipe.js');
var HomeBanner = require('../components/HomeBanner.js');
var TapAble = require('react-tappable');
var Loading = require('../helper/loading.js');
var TwoBtnAlert = require('../components/twobtnalert.js');
var TitleInputWithAlert = require('../components/alert/titleinputwithalert.js');
var TempStorage = require('../helper/tempstorage.js');
var Layout = require('../components/layout');
var getCookie = require('../helper/getCookie');
var ShopItem = require('../components/shopitem');
var ApiAction = require('../helper/apiaction');
var ApiStore = require('../helper/apistore');
var UrlConfig = require('../config/urlconfig');
var Toast = require('../helper/toast');

module.exports = React.createClass({
    getInitialState:function(){
      return{
        showLoading: false,
        pageData:{},
        data:{
          topBanners:[
            {
              image: 'http://7xlnmo.com1.z0.glb.clouddn.com/145396576168090468692267313600',
              type: 0,
            },
            {
              image: 'http://7xlnmo.com1.z0.glb.clouddn.com/145396645627348451797384768730',
              type: 0,
            }
          ],
        },
        shops: [
          // {
          //   shopBacksImg:'http://img1.imgtn.bdimg.com/it/u=743657958,2658206245&fm=21&gp=0.jpg',
          //   _id:'1',
          //   name:'韩国化妆品代购',
          //   shopAvatarImg:'http://tx.haiqq.com/uploads/allimg/150327/2115411L5-8.jpg',
          //   type:'化妆品',
          //   self:false,
          //   shoper: '刘永鹏',
          //   tel: '18621989466',
          //   address: '上海市青浦区华新镇新府中路1288号 西郊国际',
          //   detail: '清新果园，我们只奉献最新鲜的水果',
          // },
          // {
          //   shopBacksImg:'http://pic.58pic.com/58pic/13/88/59/60J58PICCcV_1024.jpg',
          //   _id:'2',
          //   name:'清新果园',
          //   shopAvatarImg:'/images/h5/qxgy.jpg',
          //   type:'水果',
          //   self:true,
          //   shoper: '刘永鹏',
          //   tel: '18621989466',
          //   address: '上海市青浦区华新镇新府中路1288号 西郊国际',
          //   detail: '清新果园，我们只奉献最新鲜的水果',
          // }
        ],
        userData:{},
        checkData:{
            url:'',
            message:''
        },
        isShowAlert:false,
        currentBuyData:{},
        isShowPayAlert:false
      }
    },

    userCenter:function(){
        window.to('/user/usercenter')
    },

    apiSuccess:function(url,body){
      switch(url){
        case UrlConfig.getshops:
          this.showLoading(false)
          this.setState({shops:body});
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
      this.showLoading(true);
      ApiAction.post(UrlConfig.getshops,{})
    },

    componentWillUnmount:function(){
    },

    showLoading:function(show) {
      this.setState({showLoading: show})
    },

    renderBanner:function(){
        if(this.state.data&&this.state.data.topBanners){
            var count=this.state.data.topBanners.length;
            if(!process.browser&&count>0){
                var item=this.state.data.topBanners[0];
                return <HomeBanner data={item} count={count}/>
            }else{
                return this.state.data.topBanners.map(function(item,i){
                    return <HomeBanner key={i} data={item} count={count}/>
                }.bind(this));
            }
        }
    },

    rendScrolBanner:function(){
        if(this.state.data&&this.state.data.topBanners){
            return <ReactSwipe continuous={true} speed={400} auto={2000}>
                {this.renderBanner()}</ReactSwipe>
        }
    },

    gotoLoginPage:function(fromUrl){
        if(!fromUrl||(fromUrl instanceof Object)){
            fromUrl=window.location.pathname+window.location.search
        }
        window.to('/user/login?fromUrl='+fromUrl);
    },

    renderProducts:function(){
      if(this.state.shops) {
        return this.state.shops.map(function (item, i) {
          return <ShopItem key={i} data={item}/>
        }.bind(this));
      }
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
          <Layout hideBack={true} className={'index'} title={'首页'} rightItems={[rightBtn]}>
            <Loading showLoading={this.state.showLoading}/>
            {this.rendScrolBanner()}
            <div className='section'>热门推荐</div>
            <div className='center-wrap'>
              {this.renderProducts()}
            </div>
          </Layout>
        )
    },

    toNew:function(){
        console.log('toNew');
        window.to('/financing/newuserbuy')
    },

    toList:function(){
        console.log('toNew');
        window.to('/financing/list')
    }
})