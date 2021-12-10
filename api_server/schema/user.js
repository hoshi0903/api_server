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

// 定义id, nickname, emial的验证规则
// integer() 整数
// min(1)最小值是1
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 定义用户表单的规则对象
exports.update_userinfo_schema = {
    body:{
        id,
        nickname,
        email
    }
}


// 定义验证 重置密码 的规则对象
exports.update_password_schema = {
    body: {
        oldPwd: password,
        // joi.ref('oldPwd') 和原密码保持一致。 joi.not(joi.ref('oldPwd'))：和原密码不能保持一致
        // concat(password) 合并规则：符合password并且和原密码不能保持一致
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}


// 定义验证头像的规则
// dataUri()指的是如下格式的字符串数据 data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
// 就是说VALUE中一定要填：data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()

// 验证规则对象——更新头像
exports.update_avatar_schema = {
    body :{
        avatar
    }
}