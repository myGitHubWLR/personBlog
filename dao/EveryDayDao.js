
var dbutil = require("./DBUtil")

//每日一句
// 在富文本中写下内容后提交,写入数据库
function insertEveryDay(content,ctime,success){

    var insertSql = "insert into every_day(`content`,`ctime`)values(?,?);"
    var params = [content,ctime]
    var connection = dbutil.createConnection()
    connection.connect()
    connection.query(insertSql,params,function(err,result){
        if(err == null){
            success(result)
        }else{
            console.log(err)
        }
    })
    connection.end()
}

// 读取数据库的每日一句的内容
function queryEveryDay(success){
    //根据id倒序查询第一个
    var querySql = "select * from every_day order by id desc limit 1;"
    var params = []
    var connection = dbutil.createConnection()
    connection.connect()
    
    connection.query(querySql,params,function(err,result){
        if(err== null){
            success(result)
        }else{
            console.log(err)
        }
    })
    connection.end()
}

module.exports.insertEveryDay = insertEveryDay
module.exports.queryEveryDay = queryEveryDay

