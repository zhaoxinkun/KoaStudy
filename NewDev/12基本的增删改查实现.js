//引入
const Koa = require("koa")
//安装完koa-router后，引入
const Router = require("koa-router")
// 安装body解析模块
const bodyParser = require("koa-bodyparser")

// 实例化
const app = new Koa();

// 路由实例化
const router = new Router();
//  再实例化一个前缀对象
const usersRouter = new Router({
    prefix: "/users"
});


// 设置一个小的数据库
const db = [{ name: "akun" }];


router.get("/", (ctx) => {
    ctx.body = "这是主页"
})

// 请求用户
usersRouter.get("/", (ctx) => {
    // 设置响应体,直接给数据
    ctx.body = db;
})
// 创建用户
usersRouter.post("/", (ctx) => {
    // 别忘了引入模块
    db.push(ctx.request.body);
    ctx.body = ctx.request.body;
})
// 修改用户
usersRouter.put('/:id', (ctx) => {
    db[ctx.params.id * 1] = ctx.request.body;
    ctx.body = ctx.request.body;
})
// 删除用户
usersRouter.delete('/:id', (ctx) => {
    db.splice(ctx.params.id * 1, 1);
    ctx.status = 204;
})
//  处理URL参数
usersRouter.get("/:id", (ctx) => {
    ctx.body = db[ctx.params.id * 1];
})


//  注册进app实例中
app.use(router.routes());
app.use(bodyParser());

//  再注册一下
app.use(usersRouter.routes());

//  设置监听端口
app.listen(1314)