//引入
const Koa = require("koa")
//安装完koa-router后，引入
const Router = require("koa-router")


// 实例化
const app = new Koa();

// 路由实例化
const router = new Router();
//  再实例化一个前缀对象
const usersRouter = new Router({
    prefix: "/users"
});

// 编写路由
//  实例对象.请求方式("路由位置", (中间件参数) => {
//      操作
//  })

router.get("/", (ctx) => {
    ctx.body = "这是主页"
})

// 请求用户
usersRouter.get("/", (ctx) => {
    // 设置 Content-Type 响应头设置响应头
    ctx.set('Content-Type', 'application/json');
    // 设置响应体
    ctx.body = [{ name: "akun" }, { name: "akun02" }]
})
// 创建用户
usersRouter.post("/", (ctx) => {
    ctx.body = { name: "akun003" }
})
// 修改用户
usersRouter.put('/:id', (ctx) => {
    ctx.body = { name: "akun003" }
})
// 删除用户
usersRouter.delete('/:id', (ctx) => {
    // 设置响应码
    ctx.status = 204;
})
//  处理URL参数
usersRouter.get("/:id", (ctx) => {
    ctx.body = { name: "akun003" }
})


//  注册进app实例中
app.use(router.routes());
//  再注册一下
app.use(usersRouter.routes())

// 编写allowedMethods  ,相应options的预检请求
app.use(usersRouter.allowedMethods())


//  设置监听端口
app.listen(1314)

// 启动
// node index.js

//  测试
// 浏览器输入 http://localhost:端口号/