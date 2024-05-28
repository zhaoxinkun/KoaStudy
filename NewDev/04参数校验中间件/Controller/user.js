// 这里是关于user的控制器部分，也就是中间件
// 设置一个小的数据库
const db = [{ name: "akun" }];

class UserCtl {
    // 增
    add(ctx) {
        // 增加校验参数规则
        ctx.verifyParams({
            name: {
                type: "string",
                required: true
            },
            age: {
                type: "number",
                required: false
            }
        })
        // 别忘了引入模块
        db.push(ctx.request.body);
        ctx.body = ctx.request.body;
    }
    // 删
    deletes(ctx) {
        db.splice(ctx.params.id * 1, 1);
        ctx.status = 204;
        ctx.body = "用户数据已删除"
    }
    // 查
    getAll(ctx) {
        // 设置响应体,直接给数据
        ctx.body = db;
    }
    // 改
    updata(ctx) {
        db[ctx.params.id * 1] = ctx.request.body;
        ctx.body = ctx.request.body;
    }
    // 查询id
    getId(ctx) {
        if ((ctx.params.id * 1) >= db.length) ctx.throw(412, "超出范围")

        ctx.body = db[ctx.params.id * 1];
    }

}

module.exports = new UserCtl();