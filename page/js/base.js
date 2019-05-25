// 搜索框
var inp = new Vue({
    el:"#inp",
    data:{
        val:""
    },
    methods:{
        btn(){
            location.href = "/?title=" + this.val
        }
    }
})

// 随机标签云
var tags = new Vue({
    el:"#tags",
    data:{
        tagList:[]
    },
    computed: {
        // computed计算属性会缓存，而每次缓存下一个函数，对应执行

        // colorRandom:function(){
        //     return function(){
        //         var red = Math.random() *255
        //         var green = Math.random() *255
        //         var blue = Math.random() *255
        //         return "rgb(" +red+"," +green+"," +blue+")"
        //     }
        // },
        
        sizeRandom:function (){
            return function(){
                var size = (Math.random() *20 + 12) + "px"
                return size 
            }
            
        }
    },
    methods: {
        // 颜色，字体随机生成
        colorRandom:function(){
            var red = Math.random() *255
            var green = Math.random() *255
            var blue = Math.random() *255
            return "rgb(" +red+"," +green+"," +blue+")"
        },
    },
    created () {
        axios({
            method:"get",
            url:"/queryAllTag"
        }).then(function(resp){
            // console.log(resp)
            var result = []
            for(var i = 0; i < resp.data.data.length; i ++){
                result.push({text:resp.data.data[i].tag,link:"/?tag="+resp.data.data[i].tag})
            }
            tags.tagList = result
        }).catch(function(resp){
            console.log("请求错误")
        })
    }
})

// 最近热门
var newHot = new Vue({
    el:"#new_hot",
    data:{
        titleList:[
           
        ] 
    },
    computed:{

    },
    created(){
        axios({
            method:"get",
            url:"/queryHotBlog"
        }).then(function(resp){
            // console.log(resp)
            var result = []
            for(var i = 0; i < resp.data.data.length; i++){
                var temp = {}
                temp.title = resp.data.data[i].title
                temp.link = "/blog_detail.html?bid=" + resp.data.data[i].id
                result.push(temp)
            }
            newHot.titleList = result
        }).catch(function(resp){
            console.log("请求错误")
        })
    }
})
// 最新评论
var newComment = new Vue({
    el:"#comment",
    data:{
        commentList:[
        ]
    },
    computed:{

    },
    created(){
        axios({
            method:"get",
            url:"/queryNewComment"
        }).then(function(resp){
            // console.log(resp)
            var result = []
            for(var i = 0; i < resp.data.data.length; i++){
                var temp = {}
                temp.name = resp.data.data[i].user_name
                temp.date = resp.data.data[i].ctime
                temp.content = resp.data.data[i].comments
                // temp.link = "/blog_detail.html?bid=" + resp.data.data[i].id
                result.push(temp)
            }
            newComment.commentList = result
        }).catch(function(resp){
            console.log("请求错误")
        })
    }
})
