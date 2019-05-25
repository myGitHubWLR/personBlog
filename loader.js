
//获取web层下的文件

var fs = require("fs")

var globalConf = require('./config')
//读取路径
var files = fs.readdirSync(globalConf["web_path"])


//path集合
var pathMap = new Map()

var controller = []

for(var i = 0; i < files.length; i ++){
    var temp = require("./"+ globalConf["web_path"]+ "/" + files[i])
    // console.log(temp)
    if(temp.path){
        for(var [key,value] of temp.path){
            if(pathMap.get(key) == null){
                pathMap.set(key,value);
            }else{
                throw new Error("url path异常")
            }
            controller.push(temp)
        }
    }
    
}

module.exports = pathMap