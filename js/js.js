// 搜索框 获取焦点
var search = document.getElementById('search');
var seaBar = document.getElementById('sea_bar');
// console.log(seaBar);
seaBar.onfocus = function() {
    search.style.border = '1px '+'solid'+" #1ABC9C";
    console.log(1)
}
seaBar.onblur = function() {
    search.style.border = '1px '+'solid'+" #c4c4c4";
    console.log(1)
}
// 导航栏鼠标移入
// banner 轮播*****************************************************
// var $contnet = $('.banner .left li .contnet')
// console.log($contnet)