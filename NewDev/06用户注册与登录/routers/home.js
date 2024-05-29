// 这里是关于home的路由
const Router = require("koa-router");
const { index } = require("../Controller/home")
// 实例化对象
const router = new Router();

// 关于用户的路由内容
router.get("/", index)

// 导实例化的对象
module.exports = router;