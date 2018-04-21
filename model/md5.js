var crypto=require('crypto');

//外部使用：md5('需要加密的字符串值',md5加密次数)；
module.exports=function codeEncode(code,i){
    if(i<1)return code;
    var code=crypto.createHash('MD5').update(code).digest('hex');
    return codeEncode(code,i-1);
}