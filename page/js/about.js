var send_comments = new Vue({
    el: "#send_comments",
    data: {
        vcode:"",
        rightCode:""
    },
    computed: {
        sendComment: function () {
            
            return function () {
                // 判断验证码是否正确
                var code = document.getElementById("comment_code").value
                if(send_comments.rightCode !== code){
                    alert("验证码错误")
                    return
                }

                var bid = -1
               
                var replay = document.getElementById("comment_replay").value
                var replayName = document.getElementById("comment_replay_name").value
                var name = document.getElementById("comment_name").value
                var email = document.getElementById("comment_email").value
                var content = document.getElementById("comment_content").value
                axios({
                    method:"get",
                    url:"/insertComment?blog_id=" + bid + "&parent=" + replay + "&user_name=" + name + "&comments=" + content + "&email=" + email +"&parent_name="+replayName
                }).then(function(resp){
                    // console.log(resp)
                    alert(resp.data.msg)
                }).catch(function(resp){
                    console.log("请求错误")
                })
            }
        },
        // 切换验证码
        changeCode:function(){
            return function(){
                axios({
                    method:"get",
                    url:"/queryRandomCode"
                }).then(function(resp){
                    // console.log(resp.data)
                    send_comments.vcode = resp.data.data.data
                }).catch(function(resp){
                    console.log("请求错误")
                })
            }
        }
    },
    created(){
        axios({
            method:"get",
            url:"/queryRandomCode"
        }).then(function(resp){
            // console.log(resp.data.data.text)
            send_comments.vcode = resp.data.data.data
            send_comments.rightCode = resp.data.data.text
        }).catch(function(resp){
            console.log("请求错误")
        })
    }
})

// 留言
var blog_comments = new Vue({
    el:"#blog_comments",
    data:{
        id:"",
        user_name:"",
        comments:"",
        ctime:"",
        count:0,
        options:"",

        commentList:[]
    },
    computed:{
       
    },
    methods: {
        // 点击回复
        replay(commentId,commenUserName){
            document.getElementById("comment_replay").value = commentId
            document.getElementById("comment_replay_name").value = commenUserName
            location.href="#send_comments"
        }
    },
    created(){
        // 关于页面：bid默认为-1
            var bid = -1
        axios({
            method:"get",
            url:"/queryComment?blog_id=" + bid
        }).then(function(resp){
            blog_comments.commentList = resp.data.data
            for(var i = 0; i < blog_comments.commentList.length; i++){
                blog_comments.commentList[i].ctime = new Date(blog_comments.commentList[i].ctime*1000).toLocaleDateString()
            }
            for(var i = 0; i < blog_comments.commentList.length; i ++){
                // 点击回复
                if(blog_comments.commentList[i].parent > -1){
                    blog_comments.commentList[i].options = "回复@ " + blog_comments.commentList[i].parent_name
                }
            }
        }).catch(function(resp){
            console.log("请求错误")
        }),
        axios({
            method:"get",
            url:"/queryCommentCount?blog_id=" + bid
        }).then(function(resp){
            blog_comments.count = resp.data.data[0].count
            // console.log(resp)
        }).catch(function(resp){
            console.log("请求错误")
        })
    }
})