var express=require('express');
var app=express();
var session=require('express-session');
var fs=require('fs');
var db=require('./model/db');

//router
var register=require('./router/register');
var login=require('./router/login')
var chatroom=require('./router/chatroom');

app.use(express.static(__dirname+'/public'));
app.set('view engine','hbs')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:180000}
}))

app.get('/',function (req,res){
    console.log(req.ip); 
    res.redirect('./login.html');
})

// socket.io
var http=require('http').Server(app);
var io=require('socket.io')(http);
var oluss=[]; // online users

io.on('connection',function (socket){   //  io.on 表示所有room  与所有room的客户端保持通信
    socket.on('online',function (data){
        socket.name=data;
        oluss.push(data);
        io.emit('online',[oluss,socket.name]);
    })
    socket.on('disconnect',function (){
        oluss.splice(oluss.indexOf(socket.name),1);
        socket.broadcast.emit('offline',[oluss,socket.name])
    })
    socket.on('send',function (data){
        db.insertOne('chatroom',data,function (err,result){
            if(err)throw err;
            io.emit('send',data)
        })
    })
})

app.use(register)
app.use(login)
app.use(chatroom)

http.listen(3000,'192.168.2.246');

exports.oluss=oluss;