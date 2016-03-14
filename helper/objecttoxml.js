var toxml = function(object){
  var str = ""
  for(var key in object){
    if(typeof object[key] == "object"){
      str += "<"+key+">";
      str += toxml(object[key]);
      str += "</"+key+">";

    }else{
      str += "<"+key+">"+object[key]+"</"+key+">"
    }
  }
  console.log("str")
  console.log(str)
  return str;
}

var objectToXml= function(object) {
  var tempStr = "<xml>";
  tempStr += toxml(object);
  tempStr += "</xml>";
  return tempStr;
}
module.exports = objectToXml;
