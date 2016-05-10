var React = require('react');
var container={
  backgroundColor: '#ECECEC',
  position: 'fixed',
  width: '100%',
  bottom: '0',
  height: '45px',
};
var left={
  width: '45px',
  float: 'left',
};
var imgStyle={
  width:'45px',
};
var middle={
  marginLeft: '10px',
  display: 'inline-block',
  lineHeight: '45px',
  height: '45px',
};
var right={
  float: 'right',
  height: '45px',
  width: '80px',
  backgroundColor: '#5DC333',
  color: 'white',
  fontSize: '20px',
  textAlign: 'center',
  lineHeight: '45px',
};


module.exports = React.createClass({
  componentDidMount:function(){
    
  },
  handlerOnTouch: function(){
    this.props.handleBook();
  },
  render:function(){
    return (
      <div style={container}>
        <div style={middle}>
          {"已选择"+this.props.count+"件商品｜共"+this.props.amount+"元"}
        </div>
        <div style={right} onTouchEnd={this.handlerOnTouch}>
          提交
        </div>
      </div>
    );
  }
})