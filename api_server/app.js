// 导入 express 模块
const express = require('express')

const joi = require('joi')
// 创建服务器的实例
const app = express()

// 导入cors并配置cros中间件
const cors = require('cors')
app.use(cors())

// 配置解析application x-www-form-urlencoded 模式的表单数据 的中间件
app.use(express.urlencoded({ extended: false}))

// 优化res.send()代码
// 在处理函数中需要多次调用res.send()向客户端响应处理失败的结果，为了简化代码可以手动分装一个res.cc()函数
// 在路由之前，声明一个全局中间件，为res对象挂载一个res.cc()函数
app.use(function(req, res, next){
    res.cc = function(err, status = 1) {
        res.send({
            status,
            // 判断err是否为错误对象(构造函数中的实例对象) true 则返回err.message，false则说明它是个字符串，直接返回err
            message: err instanceof Error ? err.message: err,
        })
    }
    next()
})

// 导入并注册路由模块
const userRouter = require('./router/user')
const expressJoi = require('@escook/express-joi')
app.use('/api',userRouter)

//定义错误级别的中间件
app.use((err, reg, res, next) => {
    if(err instanceof joi.ValidationError) return res.cc(err) 
        // 未知的错误
        res.cc(err)
})

// 启动服务器
app.listen(3007,(req, res) => {
    console.log('api server running at http://127.0.0.1:3007');
})