// 导入数据库操作模块
const db = require('../db/index')

// 导入处理密码的模块
const bcrypt = require('bcryptjs')

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
    req.body.id = req.user.id
    // 定义SQL语句
    const sql = `update my_db_01.dv_users set ? where id=?`

    // 调用db.query() 执行SQL语句并传递参数
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行SQL语句失败
        if(err) return res.cc(err)
         // 执行SQL语句成功，但是影响行数不等于1
         if(results.affectedRows !== 1) return res.cc('更新用户的基本信息失败！')
         res.cc('更新用户信息成功！')
    })
}

// 重置密码的处理函数
exports.updatePassword = (req, res) => {
    
    // 根据id查询用户是否存在
    // 定义sql查询语句
    const sql = 'select * from my_db_01.dv_users where id=?'

    // 执行sql语句
    db.query(sql, req.user.id, (err, results) => {
        // 执行SQL语句失败
        if(err) return res.cc(err) 
         // 执行SQL语句成功 判断结果是否存在
         if(results.length !== 1) return res.cc('用户不存在！')
         
        //  判断密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
         if(!compareResult) return res.cc('原密码错误')
        
         
        //  更新数据库的密码
        // 定义更新用户密码的 SQL 语句
        const sqlStr = 'update my_db_01.dv_users set password=? where id=?'
        
        // 对数据进行加密
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

        // 执行 SQL 语句
        db.query(sqlStr, [newPwd, req.user.id], (err, results) => {
            if(err) return res.cc(err) 
            // 执行SQL语句成功 判断结果是否存在
            if(results.affectedRows !== 1) return res.cc('更新密码失败！')
            })
        return res.send('更新密码成功')
    })
}

// 更新用户头像的处理函数
exports.updateAtatar = (req, res) => {
    
    // 定义SQL语句 修改用户头像
    const sql = 'update my_db_01.dv_users set user_pic=? where id=?'

    // 执行SQL语句
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        // 执行SQL语句失败
        if(err) return res.cc(err) 
         // 执行SQL语句成功 判断结果是否存在
         if(results.affectedRows !== 1) return res.cc('更新头像不成功！')

        //  更新头像成功
        return res.cc('更新用户头像成功', 0)
    })
}