// 1.导入数据库操作模块
const db = require('../db/index.js')

// 2.导入bcryptjs 加密用户密码的包
const bcrypt = require('bcryptjs')
// 注册新用户的处理函数
exports.regUser = (req, res) => {

    // 检测用户名是否合法
        const userinfo = req.body

        // 对表单中的数据进行合法性的校验
        // 当userinfo.username 或者 userinfo.username = false
        // 没有对应数据或者属性时则显示false
        // if(!userinfo.username || !userinfo.username) {
        // return res.send({
        //     status: 1,
        //     message: '用户用户名或密码不合法!'
        // })
        // }

    // 检测用户名是否被占用
        // 1.定义SQL语句，检测用户名是否被占用
        const sqlStr = 'select * from my_db_01.dv_users where username=?'

        // 2.执行SQL语句
        db.query(sqlStr, userinfo.username, (err, results) => {
        if(err) {
            // return res.send({
            //     status: 1,
            //     message: err.message
            // })
            return res.cc(err)
        }
        // 当userinfo.username的长度大于0，说明当前用户名已存在
        if(results.length > 0) {
            // return res.send({
            //     status: 1,
            //     message: '用户名被占用，请选择其他用户名！'
            // })
            return res.cc('用户名被占用，请选择其他用户名！')
        }
        // TODO:使用bcryptjs对用户密码进行加密处理
            // 1.下载包 npm i bcryptjs@2.4.3
            // 2.导入包
            // 3.调用bcrypt.hashSync()的方法对密码进行加密,10能提高密码安全 性，把加密后的结果再赋值给userinfo.password
            console.log(userinfo);
            // password: '000000'
            userinfo.password = bcrypt.hashSync(userinfo.password, 10)
            console.log(userinfo);
            //   password:  '$2a$10$H75J0rWlVeiQh4yhQfsrWumWmcEEQgHZ9HvMMXqvL.n.ZpXP8Tj1y'
        
        
        // 插入新用户
            // 1.定义SQL语句
            const sql = 'insert into my_db_01.dv_users set ?'
            // 2.执行SQL语句
            db.query(sql,{username: userinfo.username, password: userinfo.password}, (err, results) => {
            if(err) 
                // res.send({
                //     status: 1,
                //     message: err.message
                // })
                return res.cc(err)

            if(results.affectedRows !== 1)
                // res.send({
                //     status: 1,
                //     message: '插入新用户失败，请稍后再试！'
                // })
                return res.cc('插入新用户失败，请稍后再试！')
            // 注册用户成功
            // res.send({
            //         status: 0,
            //         message: '插入新用户成功！'
            // })
            res.cc('插入新用户成功！',0)
        })
        
    })
}

// 登陆的处理函数
exports.login = (req, res) => {
    res.send('login ok')
}