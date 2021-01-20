$(document).ready(function(){
(function(){

    var mySwiper = new Swiper('.swiper-container',{
        speed:1000,
        grabCursor : true,
        parallax:true,	
        pagination: {
            el:'.swiper-pagination',
            clickable :true,
        },
    });	  
})()
})