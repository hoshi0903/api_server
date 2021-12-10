// 导入express
const express = require('express')

// 创建路由对象
const router = express.Router()

// 导入用户基本信息的处理函数模块
const userinfo_hander = require('../router_hander/userinfo')

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要验证规则的对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

// 挂载路由
// 获取用户基本信息
router.get('/userinfo', userinfo_hander.getUserInfo)

// 更新用户基本信息
// expressJoi(update_userinfo_schema) 调用验证规则的中间件
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_hander.updateUserInfo)

// 重置密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_hander.updatePassword)

// 更新用户头像的路由
router.post('/update/avatar',expressJoi(update_avatar_schema), userinfo_hander.updateAtatar)


module.exports = router