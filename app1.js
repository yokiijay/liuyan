var express=require('express');
var app=express();
var session=require('express-session');
var fs=require('fs');

//router
var register=require('./router/register');
var login=require('./router/login')
var liuyan=require('./router/liuyan');

app.use(express.static(__dirname+'/public'));
app.set('view engine','hbs')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:10000}
}))

app.get('/',function (req,res){
    console.log(req.ip); 
    res.redirect('./login.html');
})

app.use(register)
app.use(login)
app.use(liuyan)

app.listen(80);