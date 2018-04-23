var express=require('express');
var router=express.Router();
var db=require('../model/db');

module.exports=router;

router.get('/chatroom',function (req,res){
    var oluss=require('../app1.js').oluss;
    if(oluss.indexOf(req.session.username)!=-1){
        res.send('您的账户已在其他客户端登陆，请稍后重试~!~!');
        return;
    }
    if(req.session.username){
        res.cookie('username',req.session.username);
        db.sort('chatroom',{},{'_id':-1},function (err,result){
            if(err)throw err;
            res.render('chatroom',{list:result});
        })
    }else{
        res.clearCookie('username')
        res.send('测试阶段，我们网站只保留3分钟登录状态，之后需要重新登录哦~！~');
    }
})