// 这里是关于home的控制器部分，其实就是中间件
class HomeCtl {
    index(ctx) {
        ctx.body = "这是主页"
    }
}


module.exports = new HomeCtl();