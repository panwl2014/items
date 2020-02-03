// 导航栏显示隐藏
var $nav_show = $('#nav_show');
var $header = $('header');
var $go_top =$('#go_top');
var timer1 = null;
window.onscroll = function() {
    if (document.documentElement.scrollTop >= 150) {
        $nav_show.fadeIn(300);
        $go_top.fadeIn(300);
    } else {
    clearInterval(timer1);
        $nav_show.fadeOut(300);
        $go_top.fadeOut(300);
    }
};
