class watcher {
    constructor (opts) {
        this.$data = this.getBaseType(opts.data) === 'Object' ? opts.data : {}
        this.$watch = this.getBaseType(opts.watch) === 'Object' ? opts.watch : {}
        for (var key in this.$data) {
            this.setData(key)
        }
    }
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


// export default watcher

let wm = new watcher({
    data:{
        a: "",
    },
    watch:{
        a(newVal,oldVal){
            // document.getElementById('id').innerHTML = newVal;
            console.log(newVal, oldVal)
        }
    }
})

wm.a = 'aaa'

wm.a = 'bbb'