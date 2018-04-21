var express=require('express');
var router=express.Router();
var formidable=require('formidable');
var db=require('../model/db');
var md5=require('../model/md5')

module.exports=router;

router.post('/register',function (req,res,next){
    var form=new formidable.IncomingForm();
    form.parse(req,function (err,fields,files){
        if(err)throw err;
        db.find('registry',{username:fields.username},null,function (err,result){
            if(err)throw err;
            if(result!=0){
                res.send({'registerStatus':-1});
            }else{
                fields.password=md5(fields.password,10); //用户密码加密 ！！机密代码
                db.insertOne('registry',fields,function (err,result){
                    if(err)throw err;
                    res.send({'registerStatus':1});
                })
            }
        })
    })
})