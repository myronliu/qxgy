var Page  = {
  title: "赚乐",
  componentDidMount:function(){
    document.title = this.title;
  },
  header: {}
};
// Page.componentDidMount = function(){
//   document.title = this.title;
// };
// Page.prototype.header = {
//   back:function(){},
//   title:function(){},
//   action:function(){}
// };

module.exports = Page;