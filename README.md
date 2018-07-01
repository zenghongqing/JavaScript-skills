### JavaScript

1. 模拟new的实现<br>
基本步骤包含：
（1）创建一个新对象
（2）将构造函数的作用域赋给新对象
（3）执行构造函数中的代码
（4）返回新对象

```
    function myNew() {
        var obj = new Object(),
            Constructor = [].shift.call(arguments);
        obj.__proto__ = Constructor.prototype;
        var ret = Constructor.apply(obj, arguments);
        return typeof ret === 'object' ? ret : obj;
    }
```
注意如果返回值是一个基本类型，就相当于没有返回值处理.

2. 模拟bind函数<br>
作用：将函数绑定至某个对象，bind方法会创建一个函数，函数体内this对象的值会绑定到传入的bind函数的值。
```
    Function.prototype.bind = function () {
        var self = this,
            context = [].shift.call(arguments),
            args = [].slice.call(arguments);
        return function () {
            self.apply(context, [].concat.call(args, [].slice.call(arguments)))
        }
    }
```
3. 模拟call函数的实现<br>
作用：使用一个指定的this值和若干个指定的参数值的条件下调用某个函数和方法。
```
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
```

4. 函数柯里化<br>
柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。<br>
为什么要使用函数柯里化？<br>
（1）延迟计算 （2）参数复用 (3) 动态创建函数
```
    // 第一版
    var curry = function (fn) {
        var args = [].slice.call(arguments, 1);
        return function () {
            var newArgs = args.concat([].slice.call(arguments));
            return fn.apply(this, newArgs)
        }
    }
    // 改进版
    var sub_curry = function (fn) {
        var args = [].slice.call(arguments, 1);
        return function () {
            var newArgs = args.concat([].slice.call(arguments));
            return fn.apply(this, newArgs)
        }
    }
    var curry = function (fn, length) {
        length = length || fn.length;
        var slice = Array.prototype.slice;
        return function () {
            if (arguments.length < length) {
                var combined = [fn].concat(slice.call(arguments))
                return curry(sub_curry.apply(this, combined), length - combined.length)
            } else {
                return fn.apply(this, arguments);
            }
        }
    }

```
5. 防抖<br>
原理：当触发事件n秒内不再触发事件，才执行。适用于如window的onsize、scroll等事件频繁触发的场景。
```
    // 第一版，其中函数func中的this指向存在问题
    function debounce (func, await) {
        var timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(func, await)
        }
    }
    // 改进版
    function debounce (func, await) {
        var timeout;
        return function () {
            var context = this,
            args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function(){
                // 解决this和参数问题
                func.apply(context, args);
            }, await);
        }
    }
```
6. 节流<br>
原理：如果你持续触发事件，每隔一段时间，只执行一次事件。
```
    // 使用时间戳
    function throttle (func, await) {
        var context, args;
        var previous = 0;
        return function () {
            var now = +new Date();
            args = arguments;
            context = this;
            if (now - previous > await) {
                func.apply(context, args);
                previous = now;
            }
        }
    }
    // 使用定时器
    function throttle (func, await) {
        var timeout, args, context;
        var previous = 0;
        return function () {
            context = this;
            args = arguments;
            if (!timeout) {
                timeout = setTimeout(function(){
                    timeout = null;
                    func.apply(context, args);
                }, await)
            }
        }
    }
    // 两者结合, 要一个有头有尾的！就是鼠标移入能立刻执行，停止触发的时候还能再执行一次！
    function throttle (func, await) {
        var timeout, context, args, result;
        var previous = 0;
        var later = function () {
            previous = +new Date();
            timeout = null;
            func.apply(context, args);
        }
        var throttled = function () {
            var now = +new Date(),
            // 下次触发func的剩余时间
            remaining = await - (now - previous),
            args = arguments,
            context = this;
            // 如果没了剩余时间或者改了系统时间, 即刚进入区域和离开区域时立即触发
            if (remaining <= 0 || remaining > await) {
                if (timeout) {
                    timeout = null;
                    clearTimeout(timeout);
                }
                func.apply(context, args);
            } else if (!timeout) {
                timeout = setTimeout(later, remaining);
            }
        }
        return throttled;
    }
    
```

7. 惰性函数<br>
惰性载入表示函数执行的分支只会在函数第一次调用时执行，在第一次调用过程中，该函数会被覆盖为另一个按照合适方式执行的函数，这样任何对原函数的调用就不用再经过执行的分支了。
```
    function createXHR(){
        var xhr=null;
        if(typeof XMLHttpRequest !='undefined'){
            xhr = new XMLHttpRequest();
            createXHR=function(){
                return new XMLHttpRequest();
            }
        }else{
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
                createXHR=function(){
                    return new ActiveXObject("Msxml2.XMLHTTP");
                }
            }
            catch (e) {
                try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    createXHR=function(){
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    }
                }
                catch (e) {
                    createXHR=function(){
                        return null;
                    }
                }
            }
        }
        return xhr;
    }
```
应用场景：<br>
(1) 应用频繁<br>
(2) 固定不变，一次判定，在固定的应用环境中不会发生改变<br>
(3) 复杂的分支判断，没有差异性，不需要应用这种模式<br>

8. 数组扁平化<br>
就是将一个嵌套多层的数组 array (嵌套可以是任何层数)转换为只有一层的数组。
```
    var arr = [1, [2, [3, 4]]];
    // 方法1
    console.log(arr.toString())         // "1,2,3,4"
    function flatten(arr) {
        return arr.toString().split(',').map((item) => {
            return +item
        })
    }
    console.log(flatten(arr))
    // 方法2
    function flatten(arr) {
        return arr.reduce(function (prev, cur) {
            return prev.concat(Array.isArray(cur) ? flatten(cur) : cur)
        }, [])
    }
```

9. 拷贝<br>
拷贝分为深拷贝和浅拷贝, 如下:
```
    // 普通的拷贝技巧
    var new_arr = arr.concat();
    var new_arr = arr.slice();
    // 不能拷贝函数
    var new_arr = JSON.parse(JSON.stringify(arr));
    // 浅拷贝
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
    // 深拷贝
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
```

10. 函数组合<br>
利用 compose 将两个函数组合成一个函数，让代码从右向左运行，而不是由内而外运行，可读性大大提升。这便是函数组合。
```
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
```

11. 模拟Vue中的watch实现
```
    class watcher {
        constructor (opts) {
            this.$data = this.getBaseType(opts.data) === 'Object' ? opts.data : {}
            this.$watch = this.getBaseType(opts.watch) === 'Object' ? opts.watch : {}
            for (var key in this.$data) {
                this.setData(key)
            }
        }
        // 获取类型
        getBaseType (target) {
            var strType = Array.prototype.toString.call(target);
            return strType.slice(8, -1);
        }
        setData (_key) {
            Object.defineProperty(this, _key, {
                get: function () {
                    return this.$data[_key]
                },
                set: function (val) {
                    var oldVal = this.$data[_key];
                    if (oldVal === val) return val;
                    this.$data[_key] = val;
                    this.$watch[_key] && typeof this.$watch[_key] === 'function'
                    & (this.$watch[_key].call(this, val, oldVal))
                    return val;
                }
            })
        }
    }

```
12. 数据分组<br>
如果JS要处理大量数据，如需要不断地插入DOM节点数据，跟新DOM节点是一个很耗费性能的工作。我们可以将大量数据分成很小的片段进行处理。如下场景：
页面上有个空的无序列表节点 ul ，其 id 为 list-with-big-data ，现需要往列表插入 10w 个 li ，每个列表项的文本内容可自行定义，且要求当每个 li 被单击时，通过 alert 显示列表项内的文本内容。
```
    const total = 100000;
        const batchSize = 4;   // 每次批量插入的节点个数，个数越多，界面越卡顿
        const batchCount = total / batchSize; // 批量处理的个数
        let batchDone = 0;      // 已经处理的个数
        function appendItems() {
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < batchCount; i++) {
                const liItem = document.createElement('li');
                liItem.innerText = batchDone * batchCount + i + 1;
                fragment.appendChild(liItem);
            }
            ulContainer.appendChild(fragment);
            batchDone++;
            doAppendBatch();
        }
        function doAppendBatch () {
            if (batchDone < batchCount) {
                // 在重绘之前，分批插入新节点
                window.requestAnimationFrame(appendItems)
            }
        }
        doAppendBatch();
```