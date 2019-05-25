
var dbutil = require("./DBUtil")

// 写评论
function insertComment(blog_id,parent,user_name,comments,email,ctime,utime,parent_name,success){
    var insertSql = "insert into comments (`blog_id`,`parent`,`user_name`,`comments`,`email`,`ctime`,`utime`,`parent_name`) values(?,?,?,?,?,?,?,?);"
    var params = [blog_id,parent,user_name,comments,email,ctime,utime,parent_name]
    
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

// 读取评论

function queryComment(blog_id,success){
    var querySql = "select * from comments where blog_id=?;"
    var params = [blog_id]
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

// 评论总数
function queryCommentCount(blog_id,success){
        var querySql = "select count(1) as count from comments where blog_id=?;"
        var params = [blog_id]
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

// 读取最新评论
function queryNewComment(size,success){
    var querySql = "select * from comments order by id desc limit ?;"
    var params = [size]
    
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

module.exports.insertComment = insertComment
module.exports.queryComment = queryComment
module.exports.queryCommentCount = queryCommentCount
module.exports.queryNewComment = queryNewComment