// 这里是关于home的路由
const Router = require("koa-router");

// 实例化对象
const router = new Router();

// 关于用户的路由内容
router.get("/", (ctx) => {
    ctx.body = "这里是主页"
})

// 导实例化的对象
module.exports = router;