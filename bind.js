Function.prototype.bind = function () {
    var self = this,
        context = [].shift.call(arguments),
        args = [].slice.call(arguments);
    return function () {
        self.apply(context, [].concat.call(args, [].slice.call(arguments)))
    }
}

var a = {};

Array.prototype.push.bind(a, 'hello', 'world')('123');

console.log(a)