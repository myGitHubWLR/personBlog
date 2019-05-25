

//引入express框架
var express = require("express")

var globalConfig = require("./config.js")
var loader = require("./loader.js")

var app = new express()

app.use(express.static("./page/"))

//每日一句
app.post("/editEveryDay",loader.get("/editEveryDay"))
app.get("/queryEveryDay",loader.get("/queryEveryDay"))

//文章列表
app.post("/editBlog",loader.get("/editBlog"))
app.get("/queryBlogByPage",loader.get("/queryBlogByPage"))
app.get("/queryCount",loader.get("/queryCount"))
app.get("/queryBlogId",loader.get("/queryBlogId"))
app.get("/queryAllBlog",loader.get("/queryAllBlog"))

// 文章标签
app.get("/queryAllTag",loader.get("/queryAllTag"))

// 根据随机云标签出现对应文章
app.get("/queryByTag",loader.get("/queryByTag"))
app.get("/queryByTagCount",loader.get("/queryByTagCount"))

// 评论
app.get("/insertComment",loader.get("/insertComment"))
app.get("/queryComment",loader.get("/queryComment"))
app.get("/queryCommentCount",loader.get("/queryCommentCount"))
app.get("/queryNewComment",loader.get("/queryNewComment"))

//验证码
app.get("/queryRandomCode",loader.get("/queryRandomCode"))

// 最新热门
app.get("/queryHotBlog",loader.get("/queryHotBlog"))

// input模糊查询
app.get("/queryTitleBlog",loader.get("/queryTitleBlog"))


app.listen(globalConfig.port,function(){
    console.log('服务已启动')
})