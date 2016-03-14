var sha1 = require('sha1');

var CheckSignature= function(token, signature, timestamp, nonce) {
  var array = [token, timestamp, nonce];
  array.sort();
  var tempStr = sha1(array.join(''));
  if(tempStr === signature){
    return true;
  }else{
    return false;
  }
}
module.exports = CheckSignature;