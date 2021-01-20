$(document).ready(function(){
(function(){
    Tab({
        tab : $(".paper_con ul").find("li"),
        list : $(".list").children("div"),
    });

    Show({
        showBtn : $(".paper_show").find("img"),
        show : "./image/paper/paper_open@2x.png",
        showImg : "./image/paper/paper_state4@2x.png",
        hide : "./image/paper/paper_back@2x.png",
        hideImg : "./image/paper/paper_state3@2x.png"
    }) 
})()
})