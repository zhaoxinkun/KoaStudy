// 这里是关于user的控制器部分，也就是中间件

// 引入自建的用户模型
const User = require("../models/user")

class UserCtl {
    // 增
    async add(ctx) {
        // 增加校验参数规则
        ctx.verifyParams({
            name: {
                type: "string",
                required: true
            },
            age: {
                type: "number",
                required: false // age 参数不是必须的
            }
        });
        const user = new User(ctx.request.body);
        await user.save();
        ctx.body = user;
    }
    // 删
    async deletes(ctx) {
        const user = await User.findByIdAndDelete(ctx.params.id);
        if (!user) {
            ctx.throw(404, "用户不存在");
        } else {
            ctx.status = 204;
        }
    }
    // 查
    async getAll(ctx) {
        const users = await User.find();
        ctx.body = users;
    }
    // 改
    async update(ctx) {
        ctx.verifyParams({
            name: {
                type: "string",
                required: true
            },
            age: {
                type: "number",
                required: false
            }
        });
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true });
        if (!user) {
            ctx.throw(404, "用户不存在");
        } else {
            ctx.body = user;
        }
    }
    // 查询id
    async findById(ctx) {
        const user = await User.findById(ctx.params.id);
        if (!user) {
            ctx.throw(404, "用户不存在")
        } ctx.body = user;

    }

}

module.exports = new UserCtl();