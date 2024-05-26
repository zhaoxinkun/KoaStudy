// 这里是关于home的路由
const Router = require("koa-router");

// 实例化对象
const router = new Router({
    prefix: "/users"
});

// 设置一个小的数据库
const db = [{ name: "akun" }];

// 请求用户
router.get("/", (ctx) => {
    // 设置响应体,直接给数据
    ctx.body = db;
})
// 创建用户
router.post("/", (ctx) => {
    // 别忘了引入模块
    db.push(ctx.request.body);
    ctx.body = ctx.request.body;
})
// 修改用户
router.put('/:id', (ctx) => {
    db[ctx.params.id * 1] = ctx.request.body;
    ctx.body = ctx.request.body;
})
// 删除用户
router.delete('/:id', (ctx) => {
    db.splice(ctx.params.id * 1, 1);
    ctx.status = 204;
})
//  处理URL参数
router.get("/:id", (ctx) => {
    ctx.body = db[ctx.params.id * 1];
})

module.exports = router;