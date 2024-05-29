// 引入
const Koa = require("koa");
// 实例化koa对象
const app = new Koa();

// 安装body解析模块
const bodyParser = require("koa-bodyparser");

// 安装自己编写的路由
const routing = require("./routers/index");

// 安装错误处理模块
const error = require("koa-json-error");

// 引入数据库密码等配置
const { connectionStr } = require("./config");
// 引入连接数据库
const mongoose = require("mongoose");

// 连接数据库
async function connectToDatabase() {
    try {
        console.time("MongoDB 连接时间");
        await mongoose.connect(connectionStr, {
            // 以下选项可以根据需要进行调整
            serverSelectionTimeoutMS: 5000, // 尝试连接服务器的超时时间
            socketTimeoutMS: 45000, // 套接字操作的超时时间
            family: 4 // 使用IPv4，IPv6: 6
        });
        console.timeEnd("MongoDB 连接时间");
        console.log("MongoDB 连接成功");
    } catch (error) {
        console.error("MongoDB 连接失败", error);
    }
}
connectToDatabase();

// 打印错误信息
mongoose.connection.on("error", console.error);

// 引入参数校验中间件
const parmeter = require('koa-parameter');

// 使用错误处理中间件
app.use(error({
    postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));

app.use(bodyParser());
// 注册,传一个app是不仅可以是一个中间件,还可以添加上下文对象
app.use(parmeter(app));

routing(app);

// 设置监听端口
app.listen(1314, () => {
    console.log("port is running at 1314");
});
