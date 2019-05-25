// 每日一句

// 用map存储，loader引入
var path = new Map()

var everyDayDao = require("../dao/EveryDayDao")
//创建时间ctime
var TimeUtil = require("../util/TimeUtil")
//response返回数据
var respUtil = require("../util/respUtil")

// 每日一句
//edit_everyday.html页面通过ajax发送请求内容，request.on接收，将data传入到insertEveryDay函数中，写进数据库
function editEveryDay(request,response){
    request.on("data",function(data){
        everyDayDao.insertEveryDay(data.toString().trim(),TimeUtil.getNow(),function(result){
        
            response.writeHead(200)
            response.write(respUtil.writeResult("success","添加成功",null))
            response.end()
        })
    })
}
path.set("/editEveryDay",editEveryDay)

//从queryEveryDay中根据id读取到数据库中every_day的数据,首页index.html根据axios请求到，渲染到页面
function queryEveryDay(request,response){
    everyDayDao.queryEveryDay(function(result){
       
        response.writeHead(200)
        response.write(respUtil.writeResult("success","添加成功",result))
        response.end()
    })
}

path.set("/queryEveryDay",queryEveryDay)

module.exports.path = path



