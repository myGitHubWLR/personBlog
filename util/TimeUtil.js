// 当下时间 ctime

// function getNow(){
//     return parseInt(Date.now()/1000)
// }
// module.exports.getNow = getNow

var moment = require("moment");
// 时间格式
function getNow() {
    return parseInt(moment(new Date()).format('YYYY-MM-DD'));
}
// getNow()

module.exports.getNow = getNow;
