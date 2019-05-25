
// 文章列表
//文章内容 标签
//blogId与tagId形成映射

//文章
var blogDao = require("../dao/BlogDao")
//标签
var tagDao = require("../dao/TagDao")
//映射
var tagBlogMapp = require("../dao/TagBlogMappDao")

//创建时间ctime
var TimeUtil = require("../util/TimeUtil")
//response返回数据
var respUtil = require("../util/respUtil")

var url = require("url")
var path = new Map()

//edit_blog.html页面通过ajax发送请求内容，request.on接收，将data传入到insertBlog函数中，写进数据库

function editBlog(request,response){
    // 读取参数
    var params = url.parse(request.url,true).query
    // 规范tags的形式
    var tags = params.tags.replace(/ /g,"").replace("，",",")

    request.on("data",function(data){
        //data为edit_blog.html页面ajax中data传入的值
    
        blogDao.insertBlog(params.title,data.toString().trim(),0,tags,TimeUtil.getNow(),TimeUtil.getNow(),function(result){
            response.writeHead(200)
            response.write(respUtil.writeResult("success","添加成功",null))
            response.end()
 
            // 每次插入文章后，数据库中tags,tag-blog-mapping对应插入，形成映射

            //blogId为每次插入文章后形成的id
            var blogId = result.insertId

            // 标签可多个
            var tagList = tags.split(",")
            for(var i= 0; i < tagList.length; i ++){
                if(tagList[i] == ''){
                    continue//如果没有tag则迭代
                }
                queryTag(tagList[i],blogId)
            }
        })
    })
}
path.set("/editBlog",editBlog)

// 查询tag,如果没有数据，则写入
function queryTag(tag,blogId){
    tagDao.queryTag(tag,function(result){
        //console.log(result) //{ id: 6, tag: 'life', ctime: 1557488519, utime: 1557488519 }
        if(result == null || result.length == 0){
            // 没有标签，写入标签数据库
            insertTag(tag,blogId)
        }else{
            // 有标签，创建标签与博客的映射
            tagBlogMapp.insertTagBlogMapp(result[0].id,blogId,TimeUtil.getNow(),TimeUtil.getNow(),function(result){
                
            })
        }
    })
}

function insertTag(tag,blogId){
    tagDao.insertTag(tag,TimeUtil.getNow(),TimeUtil.getNow(),function(result){
        //同时写入到tag_blog_mapping表中，形成映射
        //每次插入tag后的id result.insertId
        insertTagBlogMapp(result.insertId,blogId)
    })
}

function insertTagBlogMapp(tagId,blogId){
    tagBlogMapp.insertTagBlogMapp(tagId,blogId,TimeUtil.getNow(),TimeUtil.getNow(),function(result){

    })
}

// 根据page查询文章
function queryBlogByPage(request,response){
    var params = url.parse(request.url,true).query//{ page: '0', pageSize: '5' }
    // console.log(params)
    blogDao.queryBlog(parseInt(params.page),parseInt(params.pageSize),function(result){
        // 将返回文章内容中的标签，图片buse64码去掉;做截断
        for(var i = 0; i < result.length; i ++){
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g,"")
            result[i].content = result[i].content.replace(/<img[\w\W]*>/g,"")
            result[i].content = result[i].content.substring(0,300)
        }
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功",result))
        response.end()
    })
}
path.set("/queryBlogByPage",queryBlogByPage)

// 文章总数
function queryCount(request,response){
    blogDao.queryCount(function(result){
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功",result))
        response.end()
    })
}
path.set("/queryCount",queryCount)

// 文章id
function queryBlogId(request,response){
    var params = url.parse(request.url,true).query
    blogDao.queryBlogId(parseInt(params.bid),function(result){
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功",result))
        response.end()
        // 根据id来增加浏览次数
        blogDao.addViews(parseInt(params.bid),function(result){
            
        })
    })
}
path.set("/queryBlogId",queryBlogId)


// 所有文章
function queryAllBlog(request,response){
    // var params = url.parse(request.url,true).query
    blogDao.queryAllBlog(function(result){
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功",result))
        response.end()
    })
}
path.set("/queryAllBlog",queryAllBlog)

// 最新热门
function queryHotBlog(request,response){
    blogDao.queryHotBlog(5,function(result){
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功",result))
        response.end()
    })
}
path.set("/queryHotBlog",queryHotBlog)

//根据标题模糊查询
function queryTitleBlog(request,response){
    var params = url.parse(request.url,true).query

    blogDao.queryTitleBlog("%" + params.title + "%",function(result){
        // console.log(result[0].id)
        // 将返回文章内容中的标签，图片buse64码去掉;做截断
        for(var i = 0; i < result.length; i ++){
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g,"")
            result[i].content = result[i].content.replace(/<img[\w\W]*>/g,"")
            result[i].content = result[i].content.substring(0,300)
        }
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功",result))
        response.end()
 
    })
}
path.set("/queryTitleBlog",queryTitleBlog)

module.exports.path = path