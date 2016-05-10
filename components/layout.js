var React = require('react');
var Navigation = require('./navigation');
var Footer = require('./footer');
// var DownLoadHeader = require('./DownLoadHeader.js');

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
    var hiddenStyle={};
    if(!this.props.isShowHeader){
      hiddenStyle.display='none';
    }
    return (
      <div className={'layout '+this.props.className}>
        <div style={hiddenStyle}>
          <Navigation {...this.props}/>
        </div>
          {this.props.children}
        <div className='first_footer' style={hiddenStyle}></div>
        <Footer  style={hiddenStyle}/>
      </div>
    )
  }
})