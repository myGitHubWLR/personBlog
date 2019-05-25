
var dbutil = require("./DBUtil")

//标签与博客的映射

function insertTagBlogMapp(tag_id,blog_id,ctime,utime,success){
    var insertSql = "insert into tag_blog_mapping (`tag_id`,`blog_id`,`ctime`,`utime`) values (?,?,?,?);"
    var params = [tag_id,blog_id,ctime,utime]
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


function queryByTag(tag_id,page,pageSize,success){
    var querytSql = "select * from tag_blog_mapping where tag_id = ? limit ?, ?;;"
    var params = [tag_id,page*pageSize,pageSize]
    var connection = dbutil.createConnection()
    connection.connect()
    connection.query(querytSql,params,function(err,result){
        if(err== null) {
            success(result)
        }else{
            console.log(err)
        }
    })
    connection.end()
}

function queryByTagCount(tag_id,success){
    var querytSql = "select count(1) as count from tag_blog_mapping where tag_id = ?;"
    var params = [tag_id]
    var connection = dbutil.createConnection()
    connection.connect()
    connection.query(querytSql,params,function(err,result){
        if(err== null) {
            success(result)
        }else{
            console.log(err)
        }
    })
    connection.end()
}

module.exports.insertTagBlogMapp = insertTagBlogMapp
module.exports.queryByTag = queryByTag
module.exports.queryByTagCount = queryByTagCount