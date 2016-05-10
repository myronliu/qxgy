var React = require('react');
var TitleInput = require('./titleinput');
var container={
  padding:'10px'
};
var item={
  marginBottom: '10px'
};

module.exports = React.createClass({
  getInitialState:function(){
    return {
      buyerName: this.props.buyerName,
      buyerAddress: this.props.address,
      buyerTel: this.props.tel
    }
  },
  componentDidMount:function(){
    
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      buyerName: nextProps.buyerName,
      buyerAddress: nextProps.address,
      buyerTel: nextProps.tel
    });
  },
  onChangeName: function(value){
    this.setState({
      buyerName: value
    })
  },
  onChangeAddress: function(value){
    this.setState({
      buyerAddress: value
    })
  },
  onChangeTel: function(value){
    this.setState({
      buyerTel: value
    })
  },
  render:function(){
    return (
      <div style={container}>
        <div className='center_input'>
          <TitleInput title={'姓名'} value={this.state.buyerName} ref='name' inputWidth={'70%'} placeholder={'请输入姓名'} onChange={this.onChangeName}/>
          <br />
          <TitleInput title={'地址'} value={this.state.buyerAddress} ref='address' inputWidth={'70%'} placeholder={'请输入地址'} onChange={this.onChangeAddress}/>
          <br/>
          <TitleInput title={'电话'} value={this.state.buyerTel} ref='tel' inputWidth={'70%'} placeholder={'请输入电话'} onChange={this.onChangeTel}/>
        </div>
      </div>
    );
  }
})