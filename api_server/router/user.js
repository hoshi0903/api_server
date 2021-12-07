// 导入 express 模块
const express = require('express')

// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要验证规则的对象
const { reg_login_schema } = require('../schema/user')


// 创建路由对象
const userRouter = express.Router()

// 导入用户路由处理函数模块
const user_hander = require('../router_hander/user')

// 挂载路由 注册新用户
// 在路由中,声明局部中间件,对当前请求中携带的数据进行验证
// 数据验证通过后,会把这次请求流转给后面的路由处理函数
// 数据验证失败后,终止后续代码的执行,并跑出一个全局Error错误，进入全局错误级别中间件中进行处理
userRouter.post('/reguser', expressJoi(reg_login_schema), user_hander.regUser)

// 挂载路由 登陆
userRouter.post('/login', expressJoi(reg_login_schema), user_hander.login)

// 共享出去router模块
module.exports = userRouter