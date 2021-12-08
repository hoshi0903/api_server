// 导入express
const express = require('express')

// 创建路由对象
const router = express.Router()

// 导入用户基本信息的处理函数模块
const userinfo_hander = require('../router_hander/userinfo')

// 挂载路由
// 获取用户基本信息
router.get('/userinfo', userinfo_hander.getUserInfo)

// 更新用户基本信息
router.post('/userinfo',userinfo_hander.updateUserInfo)

module.exports = router