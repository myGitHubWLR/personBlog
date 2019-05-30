// 当下时间 ctime

function getNow(){
    var d = parseInt(Date.now()/1000)
    return d
}


module.exports.getNow = getNow

var moment = require("moment");
// 时间格式
// function getNow() {
  
//     return moment(new Date()).format('YYYY-MM-DD');
   
// }


// module.exports.getNow = getNow;
