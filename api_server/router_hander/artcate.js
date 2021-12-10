// 导入数据库操作模块
const db = require('../db/index')

exports.getArticleCates = (req, res) => {
    // 定义SQL语句 查询所有未被删除的分类列表数据
    // is_delete:0 表示没有被删除的数据
    // order by id asc  把查询到的结果通过order by 子句 进行查询 把id 从小到大排序
    const sql = 'select * from my_db_01.ev_article_cate where is_delete=0 order by id asc'

    // 执行 sql 语句
    db.query(sql, (err, results) => {
        // 执行 sql语句失败
        if(err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results
        })
    })
}