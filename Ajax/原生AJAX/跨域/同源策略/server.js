const { request } = require('express');
const express = require('express');
const app = express();
app.get('/home',(request, response)=>{
    //响应一个页面
    response.sendFile(__dirname + '/index.html')
})

app.get('/data',(request, response)=> {
    response.send('用户数据');
})

//jsonp 服务
app.all('/jsonp-server',(request, response)=>{
    // response.send('console.log("hello jsonp")');
    const data = {
        name: 'ssss',
    };
    let str = JSON.stringify(data);
    response.end(`handle(${str})`)
})
//jquery-jsonp 服务
app.all('/jquery-jsonp-server',(request, response)=>{
    // response.send('console.log("hello jsonp")');
    const data = {
        name: 'ssss',
        age: '12'
    };
    //接收 callback 参数
    let cb = request.query.callback;
    let str = JSON.stringify(data);
    response.end(`${cb}(${str})`)
})

app.listen(9000,()=>{
    console.log("服务已经启动,9000 端口监听中...");
});