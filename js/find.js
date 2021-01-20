(function(){
// 全局变量，存储国家id与底部文字
    
    var labels = "干货推荐"; //当前底部的标签
    var labelId = 1; //当前底部的标签对应的ID  1==干货  2==热门资讯  3==热点新闻
    var findScroll = null; //scroll
    var page = 0; //起初页面大小
    var countryId = ''; // 国家id
    var limit = 20; //分页大小
    var isLoadMore = false; //是否正在加载中
    var isNotMore =false; //没有更多的数据了
    var footClass = $(".find_footer span").attr("class")
// 初始渲染 导航条(点击渲染内容)与内容

// 获取国家id 给所有tab标签加ID
    getdata();
    getdetaildata();    

    // 点击底部文字渲染对应内容
    $(".find_footer span").click(function(){
        $(this).addClass(footClass).siblings().removeClass(footClass);
        labels = $(this).text()
    })
    

// 点击加载更多
    function loadData(){
        loading();
        page++
        console.log('page'+page)
        $.ajax({
            url: url+ "/api/student/article/list",
            dataType: "json",
            data: {
                token: token,
                "page": page,
                "limit": limit,
                "countryId": countryId,
                "labels":labels
            },
            type:"GET",
            success:function(data){
                if(data.status == 200){
                    $("#loading").remove();                 
                    var num = data.body.list.length;
                    var str="";
                    var str2="";          
                                                       
                    for(var i=0; i<num; i++){
                        var title=data.body.list[i];
                        var NeupdateAt = title.updateAt.substring(0,11);

                        str +='<div class="content_bg">'+
                                '<a href="'+title.content +'" >'+
                                    '<div class="find_active">'+
                                        '<div class="Bou_con">'+
                                            '<div class="Bou_con_left">'+
                                                '<h3>' + title.title + '</h3>'+
                                                '<p class="lab-p">'+
                                                    '<span class="lab1" >' + labels + '</span>'+
                                                '</p>'+
                                                '<span>' + title.fromSource +' &nbsp;&nbsp; '+ NeupdateAt + '</span>'+
                                            '</div>'+
                                            '<div class="Bou_con_right"><img src="./image/find/discover_pic1.png" /></div>'+
                                        '</div>'+
                                    '</div>'+
                                '</a>'+
                            '</div>'                          
                    }
                 
                    $(".content_Bou").append(str);
                    //刷新scroll范围
                    apiEndNeedInit(data.body.totalPage)
                    $(".lab1").map(function(val){
                        label($(this))
                    })
                } 
            }
        })
    }
//  国家及id
    function getdata(){
        console.log('获取房子ID')
        loading()
        var countryPage = 1;  
        $.ajax({
            url: url+"/api/student/country/list",
            type:"GET",
            dataType: "json",
            headers:{"token": token},
            data: {
                "page":countryPage,
                "limit":20,
            },
            success:function(data){ 
                $("#loading").remove();
                var limit = 5;
                var navid = null;
                var num = data.body.list.length;
                var str="";
                var Class = $(".find_content_hd li").attr("class");              
                var fooClass = $(".find_footer span").attr("class");
                
                for(var i=0; i<num; i++){
                    var title = data.body.list[i];
                    var dataid = data.body.list[i].id;
                    str +=  '<li data-id='+dataid+'>' + title.name + '</li>'
                }              
                $(".find_content_hd").append(str);

                // 登陆国家id渲染,高光            
                $(".find_content_hd li").each(function(){
                    if(id == $(this).attr("data-id")){
                        $(this).addClass(Class).siblings().removeClass(Class)
                        return false;
                    }
                })
                
                // 导航条点击切换 样式/对应content
                $(".find_content_hd li").click(function(){
                    $(this).addClass(Class).siblings().removeClass(Class)
                    countryId =  $(this).attr("data-id");
                    getdetaildata();
                })
                // 点击底部,获取国家id,渲染内容
                $(".find_footer span").click(function(){
                    labelId = $(this).attr("data-id");
                    switch (labelId){
                        case '1': 
                        labels = '干货推荐' 
                        break;
                        case '2':
                        labels= '热门资讯'
                        break;
                        default: 
                        labels= '热点新闻'
                    }
                    getdetaildata()
                })            
            }
        })
    }

    function tabNeedInit(){
        // 正常状态的初始化
        $('.up-loadmore').text('上拉加载')
        $('.down-refresh').text('下拉刷新')
        isLoadMore = false;//在页面切换时，或切换菜单时记得给这些值清0
        isNotMore =false;
    }

    function apiEndNeedInit(totalPage){
        console.log(totalPage)
        if(findScroll){
            findScroll.refresh();
        }
       
       tabNeedInit();
       console.log(1111,'总页数'+totalPage,'当前页数'+page)
       // 如果页面大于等于最大的页面就不用加载了
       if(page>=totalPage){
         $('.up-loadmore').text('没有更多的部分了')
         isNotMore = true;//没有更多的状态为true
       }
    //    setTimeout(() => {
    //     initScroll(); 
    //    }) 
    }

    function getdetaildata(){   
        page = 1; //起初页面大小
        tabNeedInit()
        loading();
        $.ajax({
            url: url+ "/api/student/article/list",
            dataType: "json",
            data: {
                token: token,
                "page": page,
                "limit": limit,
                "countryId": countryId,
                "labels": labels
            },
            type:"GET",
            success:function(data){
                console.log(data)
                $("#loading").remove();
                var num = data.body.list.length;              
                var str="";
                for(var i=0; i<num; i++){
                    var title=data.body.list[i];
                    var NeupdateAt = title.updateAt.substring(0,11);
                    str +='<div class="content_bg">'+
                            '<a href="'+title.content +'" >'+
                                '<div class="find_active">'+
                                    '<div class="Bou_con">'+
                                        '<div class="Bou_con_left">'+
                                            '<h3>' + title.title + '</h3>'+
                                            '<p class="lab-p">'+
                                                '<span class="lab1" >' + labels + '</span>'+
                                            '</p>'+
                                            '<span>' + title.fromSource +' &nbsp;&nbsp; '+ NeupdateAt + '</span>'+
                                        '</div>'+
                                        '<div class="Bou_con_right"><img src="./image/find/discover_pic1.png" /></div>'+
                                    '</div>'+
                                '</div>'+
                            '</a>'+
                        '</div>'                          
                }
                $(".content_Bou").html(str);  
                // dom元素挂载后对scroll进行初始化 
                // 接口执行过后的初始化
                apiEndNeedInit(data.body.totalPage)
                setTimeout(() => {
                    initScroll(); 
                },100) 
                $(".lab1").map(function(){
                    label( $(this) );
                })
            }
        })
    }  

    function label(obj){
        if(obj.text() == "干货推荐" ){
            obj.css({ 
                "background": "#FFE1D9",
                "color": "#FB7653"
            })
        }

        if(obj.text() == "热门资讯" ){
            obj.css({ 
                "background": "#E2EEFB",
                "color": "#53A2FF"
            })
        }

        if(obj.text() == "热点新闻" ){
            obj.css({ 
                "background": "#E0F2E8",
                "color": "#7AD3A0"
            })
        }
    }
   
    function initScroll(){
        findScroll = new BScroll('.find_content',{
            scrollY: true,
            click: true,
            probeType: 3
        })
        findScroll.refresh();
        // 给它进行滚动绑定事件
        findScroll.on('scroll', (pos) => {
            // 监听激动的距离
        })
        findScroll.on('scrollEnd', () => {
            // 滚动到底部
            if (findScroll.y <= (findScroll.maxScrollY + 50)) {
                // 当前没有在加载中和有更多的数据了才会加载
                if (!isLoadMore && !isNotMore){
                    console.log('上拉加载')
                    isLoadMore = true;
                    $('.up-loadmore').text('正在加载中...')
                    loadData()
                }
            }
        })
        findScroll.on('touchEnd', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
                if (!isLoadMore){
                    console.log('下拉刷新')
                    isLoadMore = true;
                    isNotMore= false;
                    page = 0;
                    $(".content_Bou").html('');
                    loadData()
                    $('.down-refresh').text('正在刷新中...')
                }
            }
        })
    }
})()


