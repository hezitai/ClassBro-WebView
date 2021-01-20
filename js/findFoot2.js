(function(){
// 全局变量，存储国家id与底部文字

    var labels = "热门资讯";
    var limit = 5;
    var footClass = "find_footer_active"
// 初始渲染 导航条(点击渲染内容)与内容
    getdata();
    getdetaildata({ "id": id,"limit": limit,"labels":labels});    
    conBtn({ "limit": limit,"labels":labels });

    // 点击底部文字渲染对应内容
    $(".find_footer span").click(function(){
        $(this).addClass(footClass).siblings().removeClass(footClass);
        labels = $(this).text()
    })
    

// 点击加载更多
    function conBtn(options){  
        var page = 1;
        $(".content_btn").click(function(){
            loading();
            page++
            $.ajax({
                url: url+ "/api/student/article/list",
                dataType: "json",
                data: {
                    token: token,
                    "page": page,
                    "limit": limit,
                    "countryId": id,
                    "labels": options.labels
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

                        $(".lab1").map(function(val){
                            label($(this))
                        })
        
                        if( num < options.limit){
                            $(".content_btn").hide();
                        }else{
                            $(".content_btn").show();
                        }
                    } 
                }
            })
        })
    }
//  国家及id
    function getdata(){
        loading()
        var page = 1;  
        $.ajax({
            url: url+"/api/student/country/list",
            type:"GET",
            dataType: "json",
            headers:{"token": token},
            data: {
                "page":page,
                "limit":20,
            },
            success:function(data){ 
                $("#loading").remove();
                page++
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

                    navid = $(this).attr("data-id");

                    getdetaildata({"id":navid,"limit":limit,"labels":labels});
                })
                // 点击底部,获取国家id,渲染内容
                $(".find_footer span").click(function(){
                    var id = $(".hd_active").attr("data-id");
                    getdetaildata({"id":id,"limit":limit,"labels":labels})
                })            
            }
        })
    }

    function getdetaildata(options){   
        loading();
        var page = 1;
        $.ajax({
            url: url+ "/api/student/article/list",
            dataType: "json",
            data: {
                token: token,
                "page": page,
                "limit": options.limit,
                "countryId": options.id,
                "labels": options.labels
            },
            type:"GET",
            success:function(data){
                $("#loading").remove();
                page++
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

                $(".lab1").map(function(){
                    label( $(this) );
                })

                if(num < options.limit){
                    $(".content_btn").hide();
                }else{
                    $(".content_btn").show();
                }
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

})()

