var arr = [1, [2, [3, 4]]];
/*function flatten(arr) {
    return arr.reduce(function (prev, cur) {
        return prev.concat(Array.isArray(cur) ? flatten(cur) : cur)
    }, [])
}*/

console.log(arr.toString())
function flatten(arr) {
    return arr.toString().split(',').map((item) => {
        return +item
    })
}
console.log(flatten(arr))