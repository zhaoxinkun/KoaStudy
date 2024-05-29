新增以下内容:
1.链接mongodb
    安装mongosse
    加密密码：config.js
    链接登录 index.js
            // 引入数据库密码等配置
        const { connectionStr } = require("./config");
        // 引入连接数据库
        const mongoose = require("mongoose");

        // 连接数据库
        async function connectToDatabase() {
            try {
                console.time("MongoDB 连接时间");
                await mongoose.connect(connectionStr, {
                    // 以下选项可以根据需要进行调整
                    serverSelectionTimeoutMS: 5000, // 尝试连接服务器的超时时间
                    socketTimeoutMS: 45000, // 套接字操作的超时时间
                    family: 4 // 使用IPv4，IPv6: 6
                });
                console.timeEnd("MongoDB 连接时间");
                console.log("MongoDB 连接成功");
            } catch (error) {
                console.error("MongoDB 连接失败", error);
            }
        }
        connectToDatabase();

        // 打印错误信息
        mongoose.connection.on("error", console.error);
