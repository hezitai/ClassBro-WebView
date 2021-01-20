$(document).ready(function(){
(function(){

    var limit = 5;

// 初始渲染
    getdetaildata( {"type": 3} )

// 根据课程渲染页面
    var Class = $(".coll_content_hd li").attr("class");

// 点击切换
    $(".coll_content_hd").find("li").click(function(){
        $(this).addClass(Class).siblings().removeClass(Class);

        if($(this).index() == 0){
            getdetaildata( {"type": 3, "limit": limit} )
        }else if($(this).index() == 1){           
            getdetaildata( {"type": 1, "limit": limit} )            
        }else{         
            getdetaildata( {"type": 2, "limit": limit} )                        
        }
    })
    
// 渲染内容
    function getdetaildata(options){
        var page = 1;
        $.ajax({
            url: url+"/api/student/queryStudFavorite",
            dataType: "json",
            data: {
                token: token,
                "type": options.type,
                "page": page,
                "limit": limit,
            },
            type:"GET",
            success:function(data){
                page++;
                var num = data.body.list.length;
                var str="";
                for(var i=0; i<num; i++){
                    var title=data.body.list[i];
                    str +='<div class="content_bg">'+
                                '<div class="find_active">'+
                                    '<div class="Bou_con">'+
                                        '<div class="Bou_con_left">'+
                                            '<h3>' + title.createAt + '</h3>'+
                                            '<span>' + title.title + '</span>'+
                                            '<span>' + title.updateAt + ' &nbsp;&nbsp; ' + title.updateAt+ '</span>'+
                                        '</div>'+
                                        '<div class="Bou_con_right"><img src="./image/find/discover_pic1.png" /></div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'
                }
                $(".content_bgfather").html(str);
                if(num < options.limit){
                    $(".content_btn").hide();
                }else{
                    $(".content_btn").show();                    
                }
            }
        })
    } 

})()
})
