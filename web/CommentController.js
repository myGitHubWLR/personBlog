// 评论

var commentDao = require("../dao/commentDao")


//创建时间ctime
var TimeUtil = require("../util/TimeUtil")
//response返回数据格式
var respUtil = require("../util/respUtil")
//生成验证码
var captcha = require("svg-captcha")
//路径
var url = require("url")

var path = new Map()

//写入评论
function insertComment(request,response){
    var params = url.parse(request.url,true).query
    // console.log(params)
//     { blog_id: '10',
//   parent: '-1',
//   user_name: 'ruguo',
//   comments: '内容很好',
//   email: '123456@qq.com' }
  
    commentDao.insertComment(parseInt(params.blog_id),parseInt(params.parent),params.user_name,params.comments,params.email,TimeUtil.getNow(),TimeUtil.getNow(),params.parent_name,function(result){
        response.writeHead(200)
        response.write(respUtil.writeResult("success","评论成功",null))
        response.end()
        // console.log(result)
    })
}
path.set("/insertComment",insertComment)

//生成验证码
function queryRandomCode(request,response){
    var img = captcha.create({width:100,height:34,fontSize:50})
    // console.log(img)
    response.writeHead(200)
    response.write(respUtil.writeResult("success","验证成功",img))
    response.end()
}

path.set("/queryRandomCode",queryRandomCode)

// 读取评论
function queryComment(request,response){
    var params = url.parse(request.url,true).query
    commentDao.queryComment(parseInt(params.blog_id),function(result){
       
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功",result))
        response.end()
    })
}
path.set("/queryComment",queryComment)

//评论总数

function queryCommentCount(request,response){
    var params = url.parse(request.url,true).query
    commentDao.queryCommentCount(parseInt(params.blog_id),function(result){
    
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功",result))
        response.end()
    })
}
path.set("/queryCommentCount",queryCommentCount)

// 最新评论
function queryNewComment(request,response){
    commentDao.queryNewComment(5,function(result){
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功",result))
        response.end()
    })
}
path.set("/queryNewComment",queryNewComment)
module.exports.path = path