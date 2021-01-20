$(document).ready(function(){
(function(){
    var Swiper1 = new Swiper('#swiper1',{
        speed:800,
        grabCursor : true,
        freeMode: false,
        parallax:true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });	  
    
    var Swiper2 = new Swiper('#swiper2',{
        speed:800,
        grabCursor : true,
        parallax:true,
        pagination: {
            el:'.swiper-pagination',
            clickable :true,
        },
    });	  

})()
})
