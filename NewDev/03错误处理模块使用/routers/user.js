// 这里是关于home的路由
const Router = require("koa-router");

// 实例化对象
const router = new Router({
    prefix: "/users"
});

// 导入控制器
const {
    add,
    deletes,
    getAll,
    updata,
    getId,
} = require("../Controller/user")

// 请求用户
router.get("/", getAll)
// 创建用户
router.post("/", add)
// 修改用户
router.put('/:id', updata)
// 删除用户
router.delete('/:id', deletes)
//  处理URL参数
router.get("/:id", getId)

module.exports = router;