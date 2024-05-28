//引入
const Koa = require("koa")

const app = new Koa();

// 安装body解析模块
const bodyParser = require("koa-bodyparser");


const routing = require("./routers/index");

// 自定义错误处理中间件
app.use(async (ctx, next) => {
    try {
        await next();
    }
    catch (err) {
        ctx.status = err.status || err.statusCode;
        ctx.body = {
            message: err.message
        }
    }
}
)


app.use(bodyParser());



routing(app);
//  设置监听端口
app.listen(1314, () => {
    console.log("port is runing at 1314")
})