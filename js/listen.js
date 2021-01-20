(function(){
// 全局变量,limit为拿数据时最多拿多少
    let type = 1;
    let professId = [] ;
    let scrNum = 0;
    let limit = 5;
    
// 初始渲染内容
    getdetaildata({"limit":limit})
// 筛选-上拉下拉
    scrClass()
// 专业
    scrMajro()
// tab点击渲染内容 - 切换样式
    tabget()
// 加载更多 
    conBtn({"limit":limit})

// tab点击渲染内容 - 切换class样式
    function tabget(){

        var Class = $(".listen_tab").find("span").attr("Class")       
        $(".listen_tab").find("span").not(".tab_screen").click(function(){

            // class样式
            var index = $(this).index();
            $(this).addClass(Class).siblings().removeClass(Class);
            $(".listen_content").children("div").eq(0).children("div").hide().eq(index).show()

            // 渲染数据
            type = index+1;               
            if(type == 1){
                getdetaildata({"limit":limit})
            }else{
                getdetailData({"limit":limit})
            }            
        })
    }

// 筛选- 下拉上拉切换
    function scrClass(){
        let className = "check_active";

        $(".tab_screen").click(function(){
            if(scrNum %2 == 0){
                $(".content_screen").slideDown(500)
                scrNum++
            }else{
                $(".content_screen").slideUp(500)  
                setTimeout(function(){
                    $(".content_screen_check").children("span").removeClass(className)
                },500) 
                scrNum++
            }    
        })
    }

// 刷选- 专业 -渲染
    function scrMajro(){
        loading();
        $.ajax({
            url: url + "/api/student/professionalCourses/list",
            dataType: "json",
            data: {
                "page": 1,
                "limit": 200,
            },
            type:"GET",
            success:function(data){
                $("#loading").remove();
                var num = data.body.list.length;
                var str="";
                for(var i=0; i<num; i++){
                    var title=data.body.list[i];
                    str += '<span data-id='+title.id+'>'+title.name+'</span>'
                }
                $(".content_screen_check").html(str);

                // 改变-筛选里的选项class
                scrConta()
            }
        })
    }

// 筛选-多选-提交 
    function scrConta(){

        let className = "check_active";

        // 多选-获取删除的index 
        Array.prototype.contains = function(obj) { 
            var i = this.length; 
            while (i--) { 
                if (this[i] === obj) { 
                    return i;  // 返回的这个 i 就是元素的索引下标，
                } 
            } 
            return false; 
        }  

        // 多选-删除对应内容
        $(".content_screen_check").children("span").click(function(){
            var i = $(this).index();
            if($(this).attr("class") != className){
                $(this).addClass(className)
                professId.push($(this).attr("data-id"))
            }else{
                $(this).removeClass(className);
                professId.splice(professId.contains($(this).text()),1);
            }
        })

        // 多选-提交
        $(".content_screen_btn").click(function(){   
            if(type == 1 ){
                getdetaildata({"limit":limit})                    
            }else{
                getdetailData({"limit":limit})                   
            }
            $(".content_screen").slideUp(500)
            scrNum++
            $(".content_screen_check").children("span").removeClass(className)
            professId.splice(0,professId.length)
        })
    }

//  精品接口-渲染内容
    function getdetaildata(options){
        loading();
        var page = 1;
        var profess = professId.join(",");
        $.ajax({
            url: url + "/api/student/recoproducts/list" ,
            dataType: "json",          
            data: {
                "token": token,
                "type": type,
                "page": page,
                "limit": limit,
                "professId": profess,
                "key": options.key
            },
            type:"GET",
            success:function(data){
                $("#loading").remove();
                page++
                var num = data.body.list.length;
                var str="";       
                for(var i=0; i<num; i++){
                    var title=data.body.list[i];
                    str +='<div class="Bou_con">'+
                            '<div class="Bou_con_left"><a href="listenDetail.html?id='+title.id+'"><img src="'+url+''+title.pic+'"/></a></div>'+
                            '<div class="Bou_con_right">'+
                                '<h3><a href="listenDetail.html?id='+title.id+'">'+title.title+'</a></h3>'+
                                '<span class="right-span">'+title.subTitle+'</span>'+
                                '<span>讲师：' +title.nickName+ '</span>'+
                            '</div>'+
                          '</div>'
                }
                $(".listen_style .content_Bou").html(str);

                if($(".right-span").text() == "" ){
                    $(".right-span").css({ "display": "none" })
                }
                if( num < options.limit){
                    $(".content_btn").hide();  
                }else{
                    $(".content_btn").show();                       
                }
            }
        })
    }

//  资源接口-渲染内容
    function getdetailData(options){
        loading();
        var page = 1;
        var profess = professId.join(",");
        $.ajax({
            url: url+"/api/student/recoproducts/list" ,
            dataType: "json",
            data:{
                token: token,
                "type": type,
                "page": page,
                "limit": limit,
                "professId": profess,
                "key": options.key
            },
            type:"GET",
            success:function(data){
                $("#loading").remove();
                page++;
                var num = data.body.list.length;
                var str="";
                for(var i=0; i<num; i++){
                    var title=data.body.list[i];
                    str +='<div class="Bou_con">'+
                                '<div class="Bou_con_left"><a href="https://view.officeapps.live.com/op/view.aspx?src='+url+''+title.resUrl+'"><img src="'+url+''+title.pic+'" /></a></div>'+
                                '<div class="Bou_con_right">'+
                                    '<h3><a href="https://view.officeapps.live.com/op/view.aspx?src='+url+''+title.resUrl+'">'+title.title+'</a></h3>'+
                                '</div>'+
                        '</div>'
                }
                $(".listen_style .content_res").html(str);
                
                if(num < options.limit){
                    $(".content_btn").hide()
                }else{
                    $(".content_btn").show()  
                }
            }
        })
    }

//  点击加载
    function conBtn(options){
        var page = 1;
        $(".content_btn").click(function(){
            loading();
            page++
            var profess = professId.join(",");
            if(type == 1){              
                $.ajax({
                    url: url + "/api/student/recoproducts/list" ,
                    dataType: "json",
                    data: {
                        "token": token,
                        "type": type,
                        "page": page,
                        "limit": limit,
                        "professId": profess,
                        "key": options.key
                    },
                    type:"GET",
                    success:function(data){
                        $("#loading").remove();
                        page++
                        var num = data.body.list.length;
                        var str="";
                        for(var i=0; i<num; i++){
                            var title=data.body.list[i];
                            str +='<div class="Bou_con">'+
                                    '<div class="Bou_con_left"><a href="listenDetail.html?id='+title.id+'"><img src="'+url+''+title.pic+'"/></a></div>'+
                                    '<div class="Bou_con_right">'+
                                        '<h3><a href="listenDetail.html?id='+title.id+'">'+title.title+'</a></h3>'+
                                        '<span>'+title.subTitle+'</span>'+
                                        '<span>讲师：' +title.nickName+ '</span>'+
                                    '</div>'+
                                  '</div>'
                        }
                        $(".listen_style .content_Bou").append(str);
                        if(num < options.limit){
                            $(".content_btn").hide();                                     
                        }else{
                            $(".content_btn").show();
                        }
                    }
                })
            }else{
                $.ajax({
                    url: url+"/api/student/recoproducts/list" ,
                    dataType: "json",
                    data:{
                        token: token,
                        "type": type,
                        "page": page,
                        "limit": limit,
                        "professId": profess,
                        "key": options.key
                    },
                    type:"GET",
                    success:function(data){
                        $("#loading").remove();
                        page++;
                        var num = data.body.list.length;
                        var str="";
                        for(var i=0; i<num; i++){
                            var title=data.body.list[i];
                            str +='<div class="Bou_con">'+
                                        '<div class="Bou_con_left"><a href="https://view.officeapps.live.com/op/view.aspx?src='+url+''+title.resUrl+'"><img src="'+url+''+title.pic+'" /></a></div>'+
                                        '<div class="Bou_con_right">'+
                                            '<h3><a href="https://view.officeapps.live.com/op/view.aspx?src='+url+''+title.resUrl+'">'+title.title+'</a></h3>'+
                                        '</div>'+
                                '</div>'
                        }
                        $(".listen_style .content_res").append(str);
                        if(num < options.limit){
                            $(".content_btn").hide()       
                        }else{
                            $(".content_btn").show()                                       
                        }              
                    }
                })
            }
        })
    }
    
})()    
