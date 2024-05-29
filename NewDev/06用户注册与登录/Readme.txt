修改了以下文件：
1.修改models用户模型，添加密码字段。
    // 新增密码
    password: {
        type: String,
        required: true,
        // select: false
        // 隐藏密码
    },
    __v: {
        type: Number,
        select: false
    }
2.控制器中的user，新增了注册时需要填密码的校验，并验证用户名密码是否存在
 password: {
                type: "string",
                required: true
            }
// 创建用户重复判断
        const { name } = ctx.request.body;
        const repeatedUser = await User.findOne({ name });
        if (repeatedUser) {
            ctx.throw(409, "用户名已存在")
        }
3.修改用户信息接口由怕put变为patch
4.新建用户登录接口
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
密码在config.js中。
路由中：
    // 用户登录
router.post("/login", login)