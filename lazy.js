// 一般的Dom事件添加，为了兼容现代浏览器和IE浏览器，需要对浏览器环境进行判断

// 简化写法，缺点： 每次绑定监听，都会对能力做一次检测
function addEvent(type, el, fn) {
    if (window.addEventListener) {
        el.addEventListener(type, fn, false)
    } else if (window.attachEvent) {
        el.attachEvent('on' + type, fn);
    }
}

// 利用惰性函数

var addEvent = (function(type, el, fn) {
    if (window.addEventListener) {
        return function (type, el, fn) {
            el.addEventListener(type, fn, false)
        }
    } else if (window.attachEvent) {
        return function (type, el, fn) {
            el.attachEvent('on' + type, fn);
        }
    }
})();