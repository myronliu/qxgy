var React = require('react');
var Navigation = require('./navigation');
var Footer = require('./footer');
// var DownLoadHeader = require('./DownLoadHeader.js');
var hiddenStyle={
  display:'none',
}
var showStyle={
  display:''
}
var headerStyle={
  position: 'fixed',
  width: '100%'
};
module.exports = React.createClass({
  // static propTypes = {
  //     isShowHeader:React.PropTypes.bool,
  //     title: React.PropTypes.string,
  //     rightItems: React.PropTypes.array//[{title:登录；func：login}，]

  // }
  getDefaultProps:function(){
    return {
      isShowHeader:true,
      title: '',
      rightItems: []
    }
  },

  render:function() {
    
    return (
      <div className={'layout '+this.props.className}>
        <div style={this.props.hideBack ? hiddenStyle : headerStyle}>
          <Navigation {...this.props}/>
        </div>
        <div style={{marginTop:'44px',marginBottom: '45px'}}>
          {this.props.children}
        </div>
        <div className='first_footer' style={this.props.hideFooter ? hiddenStyle : showStyle}></div>
        <Footer  style={this.props.hideFooter ? hiddenStyle : showStyle}/>
      </div>
    )
  }
})