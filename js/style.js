// var url = "http://192.168.1.178:8088/";
var url = "http://www.classbro.ca/";

var id = null;
var token = "";

var request = new Object();
request = GetRequest();

id = request["id"]
token = request["token"]

loading()

// ios交互
$(".fo_btn").click(function() {
    $(function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            //这个是安卓操作系统
            searchArd();
        }
        if (isIOS) {　　　　
            //这个是ios操作系统
            search(1);
        }
    });
})
$(".fo_btn2").click(function() {
    search(2)
})

function search(data) {
    window.nativeInterface.executeMethod(data);
}

function searchArd() {
    window.WebViewJavascriptBridge.callHandler(
        'executeMethod', {
            'param': 'consult'
        },
        function(responseData) {
            
        }
    );
}

// 拿url携带数据
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function Tab(options) {
    let index = 0;
    let tabClass = options.tab.attr("class")
    let listClass = options.list.attr("class")
    // 2- tab切换
    options.tab.click(function() {
        index = $(this).index();
        options.tab.removeClass(tabClass).eq(index).addClass(tabClass);
        options.list.removeClass(listClass).eq(index).addClass(listClass);
    })
}

function Show(options) {
    let num = -1;
    options.showBtn.click(function() {
        if (num % 2 == 0) {
            ++num
            options.showBtn.parent().siblings().attr("src", options.hideImg);
            options.showBtn.attr("src", options.show);
        } else {
            ++num
            options.showBtn.parent().siblings().attr("src", options.showImg);
            options.showBtn.attr("src", options.hide);
        }
    })
}

function textstr(obj, btn, initFontNum, initTextHeight) {
    // let initFontNum = 60;            // 初始化字数限制
    // let initTextHeight = 60;         // 初始化高度px 
    let didiText = $(obj).text() //获取完整内容
    let didiHeight = $(obj).height(); // 获取完整内容的高度

    if (didiText.length >= initFontNum && didiHeight > initTextHeight) {
        $(obj).text($(obj).text().substring(0, initFontNum)) // 截取内容,并赋值
        $(obj).html($(obj).html() + "......") // 超过部分加省略号
        $(btn).parent().css({ // 显示最外层容器,最外层容器解决一开始整个文字出现的BUG
            "opacity": "1"
        })
        $(obj).css({
            "height": initTextHeight / 100 + "rem"
        })

        $(btn).click(function() {
            let curText = $(obj).text()
            if (curText.length == initFontNum + 6) {
                $(obj).css({
                    "height": didiHeight / 100 + "rem",
                    '-moz-transition': '0.6s',
                    '-webkit-transition': '0.6s',
                    'transition': '0.6s'
                })
                $(btn).text("<<<收起")
                $(obj).text(didiText)

            } else {
                $(obj).css({
                    "height": initTextHeight / 100 + "rem",
                    '-moz-transition': '0.6s',
                    '-webkit-transition': '0.6s',
                    'transition': '0.6s'
                })
                $(btn).text(">>>展开")
                setTimeout(function() {
                    $(obj).text($(obj).text().substring(0, initFontNum))
                    $(obj).html($(obj).html() + "......")
                }, 500)
            }

        })
    } else {
        $(btn).hide();
        $(btn).parent().css({
            "opacity": "1"
        })
    }
}

// 轮播
function swiper(SwiCon, SwiPag) {
    var mySwiper1 = new Swiper(SwiCon, {
        speed: 1000,
        observer: true,
        grabCursor: true,
        parallax: true,
        autoplayDisableOnInteraction: false,
        disableOnInteraction: true,
        centeredSlides: true,
        pagination: {
            el: SwiPag,
            clickable: true,
        },
    });
}

// loading动画
function loading() {
    return null;
    // var str = 
    //     '<div id="loading">'+
    //         '<span> <img src="./image/5-121204193R7.gif" /> </span>'+
    //         '<p>加载中，请稍后</p>'+
    //     '</div>'
    //     $("body").prepend(str);
}

window.onload = function() {
    $("#loading").remove()
}