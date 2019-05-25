// 地图
var blog_list = new Vue({
    el:"#blog_list",
    data:{
        blog_list:[]
    },
    computed: {
        
    },
    created () {
        axios({
            method:"get",
            url:"/queryAllBlog"
        }).then(function(resp){
            // console.log(resp)
            // 跳转链接
            for(var i = 0; i <resp.data.data.length; i ++){
                resp.data.data[i].link = "/blog_detail.html?bid=" + resp.data.data[i].id
            }
            blog_list.blog_list = resp.data.data
        }).catch(function(resp){
            console.log("请求错误")
        })
    }
})