var React = require('react');
module.exports = React.createClass({
  getDefaultProps:function(){
    return {
      isShowJianTou:true,
      isShowIcon:true,
      icon: '',
      title: '',
      detail: '',
      subDetail: ''
    }
  },
  onTouchEnd:function(e){
    if(this.props.onTouchEnd){
      this.props.onTouchEnd();
    }
  },
  render:function() {
    var iconStyle={
      background: 'url('+this.props.icon+') no-repeat',
      backgroundSize: 'contain'
    }
    var jianTouStyle={};
    if(!this.props.isShowIcon){
      iconStyle.display='none';
    }
    if(!this.props.isShowJianTou){
      jianTouStyle.display='none';
    }
    return (
      <div className="icontitlecell" onTouchEnd={this.onTouchEnd}>
        <p className="left"><i style={iconStyle}></i>{this.props.title}</p>
        <span className="right">
          <span>
            <span className="moneycolor">{this.props.detail}</span>{this.props.subDetail}&nbsp;
          </span>
            <i className="jianTou icon-angle-right icon-2x" style={jianTouStyle}></i>
          </span>
      </div>
    )
  }
})