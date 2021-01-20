(function(){

    var type = null;
    getdetaildata()
    textstr(".intro_con",".intro_btn",150,160)

// 获取课程信息
    function getdetaildata(){
        loading();
        $.ajax({
            url: url+"/api/student/recoproducts/info/"+id,
            dataType: "json",
            type:"GET",
            success:function(data){
                $("#loading").remove();         
                var type = data.body.type;
                var str="";                  
                var title=data.body;
                str += '<video class="video" controls preload="auto">'+
                            '<source src="'+url+''+title.resUrl+'" type="video/mp4" />'+
                        '</video>'+
                        '<div class="lisDetail_cont">'+
                            '<div>'+
                                '<h3>'+ title.title+'</h3>'+      
                            '</div>'+
                            '<dl class="lisDetail_dl">'+
                                '<dt><img src="./image/listenDetail/audition_head.png" /></dt>'+
                                '<dd>'+
                                    '<h4>讲师：'+title.nickName+'</h4>'+
                                    '<p>毕业院校：'+title.universityName+'</p>'+
                                    '<p>'+
                                        '<span>大学专业：'+title.professionalName+'</span>'+
                                        '<span>学历：'+title.eduName+'</span>'+
                                    '</p>'+
                                '</dd>'+
                            '</dl>'+
                            '<div class="lisDetail_intro">'+
                                '<h4>课程简介</h4>'+
                                '<div class="intro_box">'+
                                    '<p class="intro_con">'+title.description+'</p>'+
                                    '<span class="intro_btn">>>>展开</span>'+
                                '</div>'+
                            '</div>'+
                        '</div>'                  
                $(".listenDetail").prepend(str);
                // Coll(type)
            }
        })
    } 
// 点击收藏
    function Coll(type){
        $("#Coll").click(function(){
            if(token){
                $.ajax({
                    url: url+"/api/student/putFavorite",
                    dataType: "json",
                    type:"POST",
                    data: {
                        "favoriteType": type,
                        "resource": id
                    },
                    success:function(data){
                        if(data.status == 200){
                            $("#Coll").find("img").attr("src","./image/listenDetail/audition_collection.png").next("i").text("收藏成功").css({
                                "color": "#F96F49"  
                            });
                        }else{
                            $("#Coll").children("i").text("收藏失败")
                        }
                       
                    },
                })
            }else{
                $("#Coll i").text("请先登陆")
            }
           
        })
    }
})()


