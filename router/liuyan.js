var express=require('express');
var router=express.Router();

module.exports=router;

router.get('/liuyan',function (req,res){
    if(req.session.username){
        res.render('liuyan')
    }else{
        res.send('测试阶段，我们网站只保留10秒登录状态，之后需要重新登录哦~！~');
    }
})