var React = require('react');
var Platform = require('../helper/Platform.js');

module.exports = React.createClass({
  propTypes:{
   title:React.PropTypes.string,
   placeholder:React.PropTypes.string,
   titleWidth:React.PropTypes.string,
   inputWidth:React.PropTypes.string,
   type:React.PropTypes.string,
   onChange:React.PropTypes.func,
   value:React.PropTypes.string,
   disabled:React.PropTypes.bool
  },
  getDefaultProps:function(){
    return{
      title : '',
      placeholder:'',
      inputWidth:'70%',
      titleWidth:'26%',
      type:'text',
      value:'',
      disabled:false
    }
  },
  getInitialState:function(){
    return {
      value: this.props.value
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: nextProps.value
    });
  },
  textChange:function(event){
    if(this.props.onChange){
      this.props.onChange(event.target.value)
    }
    this.setState({
      value:event.target.value
    });
  },
  render:function(){
    var type=this.props.type;
    if(type==='number'){
        type='number';
    }
    var inputStyle={width:this.props.inputWidth};
    var titleStyle={width:this.props.titleWidth};
    return (
      <div className='title_input'>
        <span className='title' style={titleStyle}>
          {this.props.title}
        </span>
        <input className='input'
           ref='input'
           type={type}
           onChange={this.textChange}
           value={this.state.value}
           style={inputStyle}
           placeholder={this.props.placeholder}
           disabled={this.props.disabled}
        />
      </div>
    );
  }
})
