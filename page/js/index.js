
// 绑定每日一句
var every_day = new Vue({
    el: "#every_day",
    data: {
        content: ""
    },
    computed: {
        getContent: function () {
            return this.content
        }
    },
    created: function () {
        // axios请求数据库数据，返回到页面
        axios({
            method: "get",
            url: "/queryEveryDay",
        }).then(function (resp) {
            every_day.content = resp.data.data[0].content
        }).catch(function (resp) {
            console.log("请求错误")
        })
    }

})
// 绑定文章列表
var articleList = new Vue({
    el: "#articleList",
    data: {
        page: 1,
        pageSize: 5,
        count: 10,
        pageNumList: [],
        articleList: []
    },
    computed: {
        // getPage:function(){
        //     return function(page,pageSize){
        //         axios({
        //             method:"get",
        //             url:"/queryBlogByPage?page=" + (page -1) + "&pageSize=" + pageSize,
        //         }).then(function(resp){
        //             // console.log(resp)
        //             var result = resp.data.data
        //             // console.log(result)
        //             var list = []
        //             for(var i = 0; i < result.length; i ++){
        //                 var temp = {}
        //                 temp.title = result[i].title
        //                 temp.content = result[i].content
        //                 // 时间的转换？
        //                 temp.date = result[i].ctime
        //                 temp.views = result[i].views
        //                 temp.tags = result[i].tags
        //                 temp.id = result[i].id
        //                 temp.link ="" +  result[i].id
        //                 list.push(temp)
        //             }
        //             articleList.articleList = list
        //             articleList.page = page
        //         }).catch(function(resp){
        //             console.log("请求错误")
        //         }),
        //         axios({
        //             method:"get",
        //             url:"/queryCount",
        //         }).then(function(resp){
        //             // console.log(resp)
        //             articleList.count = resp.data.data[0].count
        //             articleList.generatePageTool
        //         }).catch(function(resp){
        //             console.log("请求错哦")
        //         })

        //     }
        // },

        // // 页码
        // generatePageTool:function(){
        //     var nowPage = this.page
        //     var pageSize = this.pageSize
        //     var count = this.count

        //     var result = []
        //     result.push({text:"<",page:1})
        //     // 显示当前页的左右两页
        //     if(nowPage > 2){
        //         result.push({text:nowPage - 2,page:nowPage -2})
        //     }
        //     if(nowPage > 1){
        //         result.push({text:nowPage - 1,page:nowPage - 1})
        //     }
        //     result.push({text:nowPage,page:nowPage})

        //     if(nowPage + 1 <= parseInt((count + pageSize -1) / pageSize)){
        //         result.push({text:nowPage + 1,page:nowPage + 1})
        //     }
        //     if(nowPage + 2 <= parseInt((count + pageSize -1) / pageSize)){
        //         result.push({text:nowPage + 2,page:nowPage + 2})
        //     }
        //     result.push({text:">",page:parseInt((count + pageSize -1) / pageSize)})
        //     this.pageNumList = result
        //     return result
        // },
        jumpTo() {
            return function (page) {
                this.getPage(page, this.pageSize)
            }
        }
    },
    methods: {
        getPage(page, pageSize) {
            // 查看地址参数
            var serachUrl = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : ""
            var tag = ""
            var title = ""
            for (var i = 0; i < serachUrl.length; i++) {
                if (serachUrl[i].split("=")[0] == "tag") {
                    try {
                        tag =serachUrl[i].split("=")[1]
                    } catch (e) {
                        console.log(e)
                    }
                }else if(serachUrl[i].split("=")[0] == "title"){
                    try {
                        title =serachUrl[i].split("=")[1]
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
            if(tag == "" && title ==""){//tag为空，input为空，则是全部查询
                axios({
                    method: "get",
                    url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize,
                }).then(function (resp) {
                    var result = resp.data.data
                    // console.log(result)
                    // 根据id倒序 根据偏移量展现文章
                    var list = []
                    for (var i = 0; i < result.length; i++) {
                        var temp = {}
                        temp.title = result[i].title
                        temp.content = result[i].content
                        temp.date =new Date(result[i].ctime*1000).toLocaleDateString()
                        temp.views = result[i].views
                        temp.tags = result[i].tags
                        temp.id = result[i].id
                        //根据id进入文章详情页
                        temp.link = "/blog_detail.html?bid=" + result[i].id
                        list.push(temp)
                    }
                    articleList.articleList = list
                    articleList.page = page
                    // console.log(articleList.page)
                }).catch(function (resp) {
                    console.log(resp)
                })
                // 请求到文章总数
                axios({
                    method: "get",
                    url: "/queryCount"
                }).then(function (resp) {
                    // console.log(resp)
                    articleList.count = resp.data.data[0].count
                    // articleList.generatePageTool
                }).catch(function (resp) {
                    console.log("请求错误")
                })
            }else if(tag !== "" && title == ""){
                //则是根据tag查询相对应的文章
                axios({
                    method: "get",
                    url: "/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize +"&tag=" + tag,
                }).then(function (resp) {
                    var result = resp.data.data
                    // console.log(result)
                    // 根据id倒序 根据偏移量展现文章
                    var list = []
                    for (var i = 0; i < result.length; i++) {
                        var temp = {}
                        
                        temp.title = result[i].title
                        temp.content = result[i].content
                        temp.date = new Date(result[i].ctime*1000).toLocaleDateString()
                        temp.views = result[i].views
                        temp.tags = result[i].tags
                        temp.id = result[i].id
                        //根据id进入文章详情页
                        temp.link = "/blog_detail.html?bid=" + result[i].id
                        list.push(temp)
                    }
                    articleList.articleList = list
                    articleList.page = page
                    // console.log(articleList.page)
                }).catch(function (resp) {
                    console.log(resp)
                })
                // 请求到文章总数
                axios({
                    method: "get",
                    url: "/queryByTagCount?tag="+tag
                }).then(function (resp) {
                    // console.log(resp)
                    articleList.count = resp.data.data[0].count
                    articleList.generatePageTool()
                }).catch(function (resp) {
                    console.log(resp)
                })
            }
            else if(tag == "" && title !== ""){
                axios({
                    method: "get",
                    url: "/queryTitleBlog?page=" + (page - 1) + "&pageSize=" + pageSize +"&title=" + title,
                }).then(function (resp) {
                    var result = resp.data.data
                    var list = []
                    if(result.length ==0){
                        // alert('此文章待更新')
                        var result = window.confirm("此文章待更新，请返回")
                        if(result){
                            location.href = "/"
                        }
                    }
                    // 根据id倒序 根据偏移量展现文章
                    else{
                        for (var i = 0; i < result.length; i++) {
                            var temp = {}
                            temp.title = result[i].title
                            temp.content = result[i].content
                            temp.date = new Date(result[i].ctime*1000).toLocaleDateString()
                          
                            temp.views = result[i].views
                            temp.tags = result[i].tags
                            temp.id = result[i].id
                            //根据id进入文章详情页
                            temp.link = "/blog_detail.html?bid=" + result[i].id
                            list.push(temp)
                        }
                        articleList.articleList = list
                        articleList.count=list.length
                        articleList.generatePageTool()
                        articleList.page = page
                    }
                    
                    
                }).catch(function (resp) {
                    console.log(resp)
                })
            }
        },
        // 分页
        generatePageTool(page, pageSize) {
            var nowPage = this.page
            var pageSize = this.pageSize
            var count = this.count

            var result = []

            result.push({ text: "<", page: 1 })
            if (nowPage > 2) {
                result.push({ text: nowPage - 2, page: nowPage - 2 })
            }
            if (nowPage > 1) {
                result.push({ text: nowPage - 1, page: nowPage - 1 })
            }
            result.push({ text: nowPage, page: page })

            if (nowPage + 1 <= parseInt((count + pageSize - 1) / pageSize)) {
                result.push({ text: nowPage + 1, page: nowPage + 1 })
            }
            if (nowPage + 2 <= parseInt((count + pageSize - 1) / pageSize)) {
                result.push({ text: nowPage + 2, page: nowPage + 2 })
            }
            result.push({ text: ">", page: parseInt((count + pageSize - 1) / pageSize) })
            this.pageNumList = result
            return result
        },
    },
    created() {
        this.getPage(this.page, this.pageSize)
        this.generatePageTool(this.page, this.pageSize)
    }
})
