var React = require('react');
var CheckBox = require('../components/checkbox');
var Loading = require('../helper/loading.js');
var Progress = require('../components/progress.js');
var TitleInput = require('../components/titleinput.js');

module.exports = React.createClass({
    getInitialState:function(){
      return {
        showMore: false,
        checked:true
      }
    },
    propTypes: {
        data: React.PropTypes.object,
        userData:React.PropTypes.object,
        buyButtonFun:React.PropTypes.func
    },
    getDefaultProps:function(){
      return{
        data:{},
        userData:{}
      }
    },
    openMore:function(event){
        this.setState({showMore: !this.state.showMore});
    },
    toDetail:function(){
        window.to('/financing/detail?bId='+this.props.data.id)
    },
    handlerCheckboxChange:function(isCheck){
        this.setState({
            checked:isCheck
        })
    },

    toBuyButton:function(){
        console.log('toBuyButton')
        var buyEnbale=false;
        if(this.props.data.bidStatus==='TBZ'){
            buyEnbale=true;
        }
        if(this.props.buyButtonFun&&buyEnbale){
            this.refs.buyAccount.refs.input.blur();
            var amount = this.refs.buyAccount.state.value;

            var useLcj=this.props.data.useLcj;
            var isCheck=this.state.checked;
            if(useLcj!='S'){
                isCheck=false;
            }
            this.props.buyButtonFun(amount,this.props.data,isCheck);
        }

    },

    render:function() {
        var displayMore={};
        var jiantouClass='icon-angle-up';
        if(!this.state.showMore){
            displayMore={display:'none'};
            jiantouClass='icon-angle-down'
        }
        var time='';
        if(this.props.data.isDay==='S'){
            time=this.props.data.borrowingPeriodDays+'天';
        }else{
            time=this.props.data.borrowingPeriod+'月';
        }

        var amount='';
        if(this.props.data.minCount>=10000){
            amount=(this.props.data.minCount/10000.00).toFixed(2)+'万';
        }else if(this.props.data.minCount<0){
            amount='购买不受限制';
        }else{
            amount=Number(this.props.data.minCount).toFixed(2)+'元';
        }
        var progress=(this.props.data.loanAmount-this.props.data.mayCast)/this.props.data.loanAmount;
        if(progress*100 > 0 && progress*100 < 1){
            progress = 0.01;
        }else if (progress*100 > 99 && progress*100 < 100){
            progress = 0.99;
        }

        var mayCast=this.props.data.mayCast>=10000?((this.props.data.mayCast/10000.00).toFixed(2)+'万'):(this.props.data.mayCast+'元')
        var placeHolder=this.props.data.stepCount>0?'每'+this.props.data.stepCount+'元累加':'购买不受限制'
        var useLcj=this.props.data.useLcj;

        var iconImg='/images/h5/home_icon_hairongyi.png';
        switch (this.props.data.bidType) {
            case 11:    /** 新客专享 */
            iconImg = "/images/h5/home_icon_xinkezhuanxiang.png";
                break;
            case 7:     /** 融易发 */
            iconImg = "/images/h5/home_icon_rongyifa.png";
                break;
            case 14:    /** vip专区 */
            iconImg = "/images/h5/home_icon_vipzhuanxiang.png";
                break;
            case 8:     /** 小金票 */
            iconImg = "/images/h5/home_icon_xiaojinpiao.png";
                break;
            case 12:    /** 小金链 */
            iconImg = "/images/h5/home_icon_xiaojinlian.png";
                break;
            case 9:     /** 海赚 */
            iconImg = "/images/h5/home_icon_haizhuan.png";
                break;
            default:
                iconImg = "/images/h5/home_icon_hairongyi.png";
                break;
        }
        var reXiaoImg='/images/h5/home_icon_rexiao.png';
        var buyEnbale=true;
        var buttonTitle='立即投资';
        switch (this.props.data.bidStatus) {
            case 'SQZ':
            case 'DSH':
            case 'DFB':
            case 'YFB':
                reXiaoImg='/images/h5/home_icon_yushou.png';
                buyEnbale=false;
                buttonTitle='预售'
                break;
            case 'TBZ':
                reXiaoImg='/images/h5/home_icon_rexiao.png';
                buttonTitle='立即投资';
                buyEnbale=true;
                break;
            case 'DFK':
            case 'HKZ':
            case 'YJQ':
            case 'YLB':
            case 'YDF':
            case 'YZF':
                reXiaoImg='/images/h5/home_icon_shouqing.png';
                buyEnbale=false;
                buttonTitle='售罄';
                progress=1;
                mayCast='0.00元'
                break;
            default:
                reXiaoImg='/images/h5/home_icon_rexiao.png';
                break;
        }
        var licaijinBalance=0;
        var financialAccountBalance=0.00;
        var noLiCaiJinStyle={};
        var checkLiCaiJinStyle={};
        var ttjStyle={};
        if(this.props.userData&&this.props.userData.licaijinBalance){
            licaijinBalance=this.props.userData.licaijinBalance;
            financialAccountBalance=this.props.userData.financialAccountBalance;
            if(Number(licaijinBalance)===0){
                noLiCaiJinStyle={display:'none'};
                checkLiCaiJinStyle={display:'none'};
            }else{
                if(useLcj==='S'){
                    noLiCaiJinStyle={display:'none'};
                }else{
                    checkLiCaiJinStyle={display:'none'};
                }
            }
        }else{
            noLiCaiJinStyle={display:'none'};
            checkLiCaiJinStyle={display:'none'};
            ttjStyle={display:'none'};
        }
        return (
            <div className="productlist">
                    <div className='productlist_header'>
                        <TapAble onTap={this.openMore.bind(this)}>
                        <div className="title">&nbsp;&nbsp;&nbsp;<img className="hot-logo" src={iconImg}/>&nbsp;{this.props.data.title} <img className="rexiao" src={reXiaoImg}/></div>
                        <div className="item">
                        <span className="item-summary rate">
                        <span className="ratenum priceColor">{(this.props.data.interestRate*100).toFixed(1)}</span><span className='priceColor'>%</span><br /><span className='miaoshu'>年化收益率</span></span>
                            <span className="item-summary">{time} <br /><span className='miaoshu'>投资期限</span></span>
                            <span className="item-summary">{amount}<br /><span className='miaoshu'>起投金额</span></span>
                            <span className="item-summary"><i className={jiantouClass+' icon-2x jianTou'}></i></span>
                        </div>
                            <div className='progress-div'>
                                <div className='first-progress'>
                                    <Progress percent={(progress*100).toFixed(0)+'%'}/>
                                </div>
                                <div className='second-progress'></div>
                            </div>

                        </TapAble>
                    </div>
                <div className='itemmore' style={displayMore}>
                    <div className='itemmore_center'>
                    <span className="itemore-summary">可投金额：{mayCast}</span>
                    <span className="itemore-summary">
                        <div className='itemmore-input'>
                            <TitleInput title={'购买金额：'} ref='buyAccount' type={'number'} titleWidth={'70px'} inputWidth={'60%'} placeholder={placeHolder}/>
                        </div>
                    </span>
                        <div className='licaiDiv'>
                            <div style={noLiCaiJinStyle} className='miaoshu'>该产品不支持理财金支付</div>
                            <div style={checkLiCaiJinStyle} className='licai'>
                                <div className='checkboxStyle'>
                                    <CheckBox ref="RACheckBox"
                                              imgWidth={"20"}
                                              defaultChecked={true}
                                              disabled={false}
                                              onTouchEnd={this.handlerCheckboxChange}/>
                                </div>
                                <div className='protocolStyle'>
                                    <span>理财金</span>
                                    <span>{licaijinBalance}</span>
                                    <span>元</span>
                                </div>

                            </div>
                            <div className='miaoshu' style={ttjStyle}>天天聚余额：{financialAccountBalance}元付款</div>

                        </div>

                     <span className="itemore-summary option">
                         <input className="optionbut opt1" onTouchEnd={this.toDetail} type="button" value="查看更多"/>
                         <input className="optionbut opt2" style={buyEnbale?{}:{backgroundColor:' #969696'}}  onTouchEnd={this.toBuyButton}  type="button" value={buttonTitle}/>
                    </span>
                </div>
                </div>
            </div>
        );
    }
})