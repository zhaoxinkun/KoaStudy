//引入
const Koa = require("koa")

const app = new Koa();

// 安装body解析模块
const bodyParser = require("koa-bodyparser");

// 安装自己编写的路由
const routing = require("./routers/index");

// 安装错误处理模块
const error = require("koa-json-error")

//  引入参数校验中间件
const parmeter = require('koa-parameter');
//使用错误处理中间件
app.use(error({
    postFormat: (e, {
        stack,
        ...rest
    }) => process.env.NODE_ENV === 'production' ? rest : {
        stack,
        ...rest
    }
}))


app.use(bodyParser());
//  注册,传一个app是不仅可以是一个中间件,还可以添加上下文对象
app.use(parmeter(app));

routing(app);
//  设置监听端口
app.listen(1314, () => {
    console.log("port is runing at 1314")
})