var React = require('react');

module.exports = React.createClass({
  componentDidMount:function(){
    //埋点代码
    // (function(){
    //     var ma = window.document.createElement('script');
    //     ma.type = 'text/javascript';
    //     ma.async = true;
    //     ma.src ='https://data.kjtpay.com:8082/js/tj.js';
    //     var s = window.document.getElementsByTagName('script')[0];
    //     s.parentNode.insertBefore(ma, s);
    // })();
  },
  render:function(){
    return (
      <div className='footer' style={this.props.style}>
        <div className='copyright'>
            Copyright ©2016 清新果园 版权所有<br/>
        </div>
      </div>
    );
  }
})