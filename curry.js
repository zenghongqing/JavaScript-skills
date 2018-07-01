// 第一版
/*var curry = function (fn) {
    var args = [].slice.call(arguments, 1);
    return function () {
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs)
    }
}
function add(a, b) {
    return a + b
}

var addCurry = curry(add, 1, 2)

console.log(addCurry())
*/
// 改进版
var sub_curry = function (fn) {
    var args = [].slice.call(arguments, 1);
    return function () {
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs)
    }
}
var curry = function (fn, length) {
    length = length || fn.length
    var slice = Array.prototype.slice;
    return function () {
        if (arguments.length < length) {
            var combined = [fn].concat(slice.call(arguments))
            return curry(sub_curry.apply(this, combined), length - arguments.length)
        } else {
            return fn.apply(this, arguments);
        }
    }
}
var fn = curry(function (a, b, c) {
    return [a, b, c];
});

console.log(fn("a", "b", "c"))

console.log(fn("a", "b")("c"))

console.log(fn("a")("b", "c"))
