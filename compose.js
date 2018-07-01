function compose() {
    var args = arguments,
        start = args.length - 1;
    return function () {
        var i = start;
        var result = args[start].apply(this, arguments);
        while(i--) {
            result = args[i].call(this, result)
        }
        return result
    }
}

// 先定义基本运算，这些可以封装起来复用
var toUpperCase = function(x) { return x.toUpperCase(); };
var hello = function(x) { return 'HELLO, ' + x; };

var greet = compose(hello, toUpperCase);
console.log(greet('kevin'));