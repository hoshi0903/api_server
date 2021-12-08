// 导入数据库操作模块
const db = require('../db/index')

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    // 定义查询用户信息的 SQL 语句
    const sql = 'select id, username, nickname, user_pic from my_db_01.dv_users where id=?'

    // 执行 SQL 语句
    // req对象的user属性是token解析成功后，express-jwt中间件帮我们挂载上去的
    db.query(sql, req.user.id, (err, results) => {
        // 执行 SQL 语句失败
        if(err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询的结果可能为空
        if(results.length !== 1) return res.cc('获取用户信息失败！')

        // 获取用户信息成功
        res.send({
            status: 0,
            message:'获取用户信息成功',
            date: req.user
        })
    })
}

// 更新用户信息的处理函数
exports.updateUserInfo = (req, res) => {
    res.send('OK')
}