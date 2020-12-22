// 1.引入express

const { request, response, json } = require("express");
const express = require("express");

//2.创建应用对象

const app = express();

//3.创建路由规则
/*
    request: 对请求报文的封装
    response： 对响应报文的封装
*/
app.get('/server', (request, response)=>{
    //设置响应头 设置允许跨域
    response.setHeader("Access-Control-Allow-Origin","*");
    //设置响应体
    response.send("Hello Express GET");
});

// 可以接受任意类型的请求
app.all('/server', (request, response) => {
     //设置响应头 设置允许跨域
     response.setHeader("Access-Control-Allow-Origin","*");
     //响应头，如不设置则自定义的请求头发不过来
     response.setHeader("Access-Control-Allow-Headers","*");
     
     //设置响应体
     response.send("Hello Express POST");
})

// 可以接受任意类型的请求
app.all('/json-server', (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader("Access-Control-Allow-Origin","*");
    //响应头，如不设置则自定义的请求头发不过来
    response.setHeader("Access-Control-Allow-Headers","*");
    const data = {
        name: "chengwei"
    }
    //对对象转换
    let str = JSON.stringify(data)
    //设置响应体
    response.send(str);
})

app.get('/ie', (request, response)=>{
    //设置响应头 设置允许跨域
    response.setHeader("Access-Control-Allow-Origin","*");
    //设置响应体
    response.send("Hello ie");
});

//延时响应
app.all('/delay', (request, response)=>{
    //设置响应头 设置允许跨域
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader("Access-Control-Allow-Headers","*");
    //设置响应体
    setTimeout(()=> {
        response.send(JSON.stringify({name: 'chengwei'}));
    },1000);
});

//jquery 服务
app.all('/jquery-server', (request, response)=>{
    //设置响应头 设置允许跨域
    response.setHeader("Access-Control-Allow-Origin","*");
    //设置响应体
    const data = {name: "Hello jquery AJAX"}
    response.send(JSON.stringify(data));
});


//axios
app.all('/axios-server', (request, response)=>{
    //设置响应头 设置允许跨域
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader("Access-Control-Allow-Headers","*");
    
    //设置响应体
    const data = {name: "Hello jquery AJAX"}
    response.send(JSON.stringify(data));
});

//fetch 服务
app.all('/fetch-server', (request, response)=>{
    //设置响应头 设置允许跨域
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader("Access-Control-Allow-Headers","*");
    
    //设置响应体
    const data = {name: "Hello jquery AJAX"}
    response.send(JSON.stringify(data));
});


//4. 监听端口，启动服务

app.listen(8000,()=>{
    console.log("服务已经启动,8000 端口监听中...");
});