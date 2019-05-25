
var dbutil = require("./DBUtil")

// 文章列表 写入到数据库
//标题，内容，浏览次数，标题，时间
function insertBlog(title,content,views,tags,ctime,utime,success){
    var insertSql = "insert into blog (`title`,`content`,`views`,`tags`,`ctime`,`utime`) values(?,?,?,?,?,?);"
    var params = [title,content,views,tags,ctime,utime]
    
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

//读取文章
function queryBlog(page,pageSize,success){
    
    var querySql = "select * from blog order by id desc limit ?,?;"
    var params = [page*pageSize,pageSize]
    
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

//读取文章总数
function queryCount(success){
    var querySql = "select count(1) as count from blog;"
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

// 读取文章id
function queryBlogId(id,success){
    
    var querySql = "select * from blog where id = ?;"
    var params = [id]
    
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

//查询所有文章
function queryAllBlog(success){
    var querySql = "select * from blog order by id desc;"
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

// 浏览次数
function addViews(id,success){
    
    var querySql = "update blog set views = views + 1 where id = ?;"
    var params = [id]
    
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

// 最新热门
function queryHotBlog(size,success){
    var querySql = "select * from blog order by views desc limit ?;"
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

// 模糊查询
function queryTitleBlog(title,success){
    var querySql = "select * from blog where title like ?;"
    var params = [title]
    
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


module.exports.insertBlog = insertBlog
module.exports.queryBlog = queryBlog
module.exports.queryCount = queryCount
module.exports.queryBlogId = queryBlogId
module.exports.queryAllBlog = queryAllBlog
module.exports.addViews =addViews
module.exports.queryHotBlog =queryHotBlog
module.exports.queryTitleBlog =queryTitleBlog
