var express=require('express');
var router=express.Router();
var formidable=require('formidable');
var db=require('../model/db');
var md5=require('../model/md5');

module.exports=router;

router.post('/login',function (req,res){
    var form=new formidable.IncomingForm();
    form.parse(req,function (err,fields,files){
        if(err)throw err;
        db.find('registry',{username:fields.username},null,function (err,result){
            if(err)throw err;
            if(result!=0){
                if(md5(fields.password,10)==result[0].password){
                    req.session.username=fields.username;   //登录成功，保存该用户登录状态;
                    res.send({'loginStatus':1})
                }else{
                    res.send({'loginStatus':-2})
                }
            }else{
                res.send({'loginStatus':-1});
            }
        })
    })
})