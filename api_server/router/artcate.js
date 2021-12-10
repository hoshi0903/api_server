// 导入express
const express = require('express')

// 创建路由对象
const router = express.Router()

// 挂载路由
// 获取文章分类的列表数据

// 导入文章分类的路由处理函数模块
const artcate_handler = require('../router_hander/artcate')
router.get('/cates',artcate_handler.getArticleCates)

// 向外共享路由
module.exports = router