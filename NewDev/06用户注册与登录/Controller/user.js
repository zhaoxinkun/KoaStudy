// 这里是关于user的控制器部分，也就是中间件

// 引入自建的用户模型
const User = require("../models/user")
// 登录时引入这个生成token
const jsonwebtoken = require("jsonwebtoken")

// 引入签名时的密码
const { secret } = require("../config")

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
            },
            password: {
                type: "string",
                required: true
            }
        });
        // 创建用户重复判断
        const { name } = ctx.request.body;
        const repeatedUser = await User.findOne({ name });
        if (repeatedUser) {
            ctx.throw(409, "用户名已存在")
        }
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
            },
            password: {
                type: "string",
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

    // 登录接口
    async login(ctx) {
        // 参数校验
        ctx.verifyParams({
            name: {
                type: "string",
                required: true
            },
            password: {
                type: "string",
                required: true
            }
        });
        // 登录判断
        const user = await User.findOne(ctx.request.body);
        if (!user) {
            ctx.throw(401, "用户名或者密码不对")
        } else {
            // 没有的话，就进行签名
            const { _id, name } = user;
            //{签名的东西}，密码，{过期时间}
            const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: "1d" })
            ctx.body = { token }
        }
    }
}

module.exports = new UserCtl();