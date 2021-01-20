$(document).ready(function(){
(function(){
    
//渲染内容  
    getdetaildata()
    // btn()

// 渲染内容
    function getdetaildata(){
        loading()
        $.ajax({
            url: url+ "/api/student/article/info/" + id,
            dataType: "json",
            data: {
                token: token,
            },
            type:"GET",
            success:function(data){
                $("#loading").remove();
                var NewcreateAt = data.body.updateAt.substring(0,11);
                var str="";
                var title=data.body;
                var NeupdateAt = title.updateAt.substring(0,11);
                str +='<div class="findDe_head">'+title.title+'</div>'+

                        '<div class="findDe_lab">'+
                            '<span>'+ title.fromSource +'</span>'+
                            '<span>'+NeupdateAt+'</span>'+
                        '</div>'+
    
                        '<div class="findDe_cont">'+ title.content +'</div>'
                $(".findDe_active").html(str);

                btn(title.type,title.id)
            }
        })
    }  

// 收藏
    function btn(type,id){
        $("#foo_sp0").click(function(){
            $(this).children("img").attr("src","./image/findDetail/audition_like2@2x.png").next().text("点赞+1").css({
                "color": "#F96F49"
            })
        })

        $("#foo_sp1").click(function(type,id){
            $.ajax({
                url: url+"/api/student/putFavorite",
                dataType: "json",
                type:"POST",
                data: {
                    token:token,
                    "favoriteType": type,
                    "resource": id
                },
                success:function(data){
                    $("#foo_sp1").children("img").attr("src","./image/findDetail/audition_like2@2x.png").next().text("点赞+1").css({
                        "color": "#F96F49"
                    })
                },
                error:function(){
                    $("#foo_sp1").children("i").text("收藏失败")
                }
            })
        })
    }
    
    })()
})