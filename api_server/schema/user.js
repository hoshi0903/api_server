// 用户信息验证规则模块

// 导入joi第三方模块
const joi = require('joi')

// 定义用户名和密码的验证规则
// string() 值必须是字符串
// alphanum() 值只能包含a-zA-Z的字符串
// min(1).max(10) 最大长度， 最小长度
// required() 值是必填项
// pattern() 值必须符合正则表达式
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}