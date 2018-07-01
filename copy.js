var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}];

var shallowCopy = function (obj) {
    if (typeof obj !== 'object') return
    var newObj = Array.isArray(obj) ? [] : {};
    for(var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}
var deepCopy = function (obj) {
    if (typeof obj !== 'object') return;
    var newObj = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof key === 'object' ? deepCopy(key) : obj[key];
        }
    }
    return newObj
}
console.log(deepCopy(arr))
// console.log(shallowCopy(arr))