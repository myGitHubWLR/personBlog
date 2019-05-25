//标签
var tagDao = require("../dao/TagDao")
//映射
var tagBlogMapp = require("../dao/TagBlogMappDao")
// 文章
var blogDao = require("../dao/BlogDao")
//创建时间ctime
var TimeUtil = require("../util/TimeUtil")
//response返回数据
var respUtil = require("../util/respUtil")

var url = require("url")
var path = new Map()

// 查询所有标签
function queryAllTag(request,response){
    tagDao.queryAllTag(function(result){
        // 在随机标签云中 随机排列 
        result.sort(function(){
            return Math.random() >0.5 ? true : false
        })
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功",result))
        response.end()
    })
}
path.set("/queryAllTag",queryAllTag)


function queryByTag(request,response){
    var params = url.parse(request.url,true).query
    tagDao.queryTag(params.tag,function(result){
        if(result == null || result.length == 0){
            response.writeHead(200)
            response.write(respUtil.writeResult("success","查询成功",result))
            response.end()
        }else{
            tagBlogMapp.queryByTag(result[0].id,parseInt(params.page),parseInt(params.pageSize),function(result){
        
                var blogList = []
                for(var i = 0; i < result.length; i ++){
                    blogDao.queryBlogId(result[i].blog_id,function(result){
                        blogList.push(result[0])
                   
                    })
                }
                // console.log(blogList)
                getResult(blogList,result.length,response)
                
            })
        }
    })
    
}
path.set("/queryByTag",queryByTag)

function getResult(blogList,len,response){
    if(blogList.length < len){
        setTimeout(function(){
            getResult(blogList,len,response)
        },10)
    }else{
         // 将返回文章内容中的标签，图片buse64码去掉;做截断
         for(var i = 0; i < blogList.length; i ++){
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g,"")
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*>/g,"")
            blogList[i].content = blogList[i].content.substring(0,300)
        }
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功",blogList))
        response.end()
    }
}

function queryByTagCount(request,response){
    var params = url.parse(request.url,true).query
    tagDao.queryTag(params.tag,function(result){

        tagBlogMapp.queryByTagCount(result[0].id,function(result){
            response.writeHead(200)
            response.write(respUtil.writeResult("success","查询成功",result))
            response.end()
        })
    })
    
}
path.set("/queryByTagCount",queryByTagCount)
module.exports.path = path