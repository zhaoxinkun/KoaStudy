// const fs = require("fs");
// module.exports = (app) => {
//     fs.readdirSync(__dirname).forEach(file => {
//         if (file === "index.js") return;
//         const route = require(`./${file}`);
//         app.use(route.routes()).use(route.allowedMethods());
//     }
// }

// 批量导入路由文件
const fs = require("fs");

module.exports = (app) => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file === "index.js") return;
        const route = require(`./${file}`);
        app.use(route.routes()).use(route.allowedMethods());
    });
};
