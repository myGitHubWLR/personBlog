
var dbutil = require("./DBUtil")

// 文章标签

function insertTag(tag,ctime,utime,success){
    var insertSql = "insert into tags(`tag`,`ctime`,`utime`)values(?,?,?);"
    var params = [tag,ctime,utime]
    var connection = dbutil.createConnection()
    connection.connect()
    connection.query(insertSql,params,function(err,result){
        if(err== null) {
            success(result)
        }else{
            console.log(err)
        }
    })
    connection.end()
}

function queryTag(tag,success){
    var querySql = "select * from tags where tag = ?;"
    var params = [tag]
    var connection = dbutil.createConnection()
    connection.connect()
    connection.query(querySql,params,function(err,result){
        if(err == null){
            success(result)
        }else{
            console.log(err)
        }
    })
    connection.end()
}

// 所有标签
function queryAllTag(success){
    var querySql = "select * from tags;"
    var params = []
    var connection = dbutil.createConnection()
    connection.connect()
    connection.query(querySql,params,function(err,result){
        if(err == null){
            success(result)
        }else{
            console.log(err)
        }
    })
    connection.end()
}
module.exports.insertTag = insertTag
module.exports.queryTag = queryTag
module.exports.queryAllTag = queryAllTag