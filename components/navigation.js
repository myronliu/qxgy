var React = require('react');

module.exports = React.createClass({
    // static propTypes = {
    //     title:React.PropTypes.string,
    //     rightItems:React.PropTypes.array,//[{title:登录,icon:'',func：login}，]
    //     hideBack:React.PropTypes.bool,
    //     backTo:React.PropTypes.func
    // }
  getDefaultProps: function(){
    return{
      title : '',
      rightItems:[],
      hideBack:false
    }
  },

  back: function(){
    console.log('--------'+window.history.length)
    if(this.props.backTo){
        this.props.backTo();
    }else if(window.history.length<=2){
        window.to('/financing/index');
    }
    else{
        window.history.back();
    }
  },

  componentDidMount: function(){
    document.title = this.props.title;
  },

  render:function(){
    var  rightItems=this.renderItem();
    var backStyle={}
    if(this.props.hideBack){
      backStyle={display:'none'}
    }
    return (
      <div className='navigetion'>
        <div style={backStyle} className='back' onTouchEnd={this.back}>
            <i className="jianTou icon-angle-left icon-2x"></i>
        </div>
        <div className='title'>
            {this.props.title}
        </div>
        <div className='right'>
            {rightItems}
        </div>
      </div>
    );
  },

  renderItem:function(){
    var returnItem= this.props.rightItems.map(function(item,i){
      if(item.icon){
        return <img
          className='icon'
          src={item.icon}
          onTouchEnd={item.func}
          key={i}
          />
      }else{
        return <span
          onTouchEnd={item.func}
          key={i}
          className='item'>
           {item.title}
          </span>
      }
    });
    return returnItem;
  }
})
