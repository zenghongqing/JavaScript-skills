Function.prototype.call = function (context) {
    // 当call的第一个参数是null时，指向window
    var context = context || window;
    // 获取调用call的函数
    context.fn = this;
    var args = [];
    // 处理传入参数
    for (var i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']');
    }
    // call 是 ES3 的方法
    var result = eval('context.fn('+(args)+')')
    context.fn();
    delete context.fn;
    return result
}

// 测试

var obj = {
    value: 1
}

function bar(name, age) {
    return {
        value: this.value,
        name, name,
        age: age
    }
}
console.log(bar.call(obj, 'kevin', 18))