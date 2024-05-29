// 引入mongoose
const mongoose = require("mongoose")

// 结构出Schema
const {
    Schema,
    model
} = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false,
        default: 18
    },
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
})


// 建造模型
module.exports = mongoose.model("User", userSchema)