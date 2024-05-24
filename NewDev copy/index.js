// 引入koa包
const koa = require("koa");
// 实例化一个新的koa对象
const app = new koa;

// 使用use方法  一个函数 参数
app.use((ctx) => {
    // 响应体设置
    ctx.body = "hello world";
});

// 监听端口设置
app.listen(8089);

// 启动
// node index.js

//  测试
// 浏览器输入 http://localhost:端口号/