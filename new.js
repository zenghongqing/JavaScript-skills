function myNew() {
    var obj = new Object(),
        Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
}

function fn(name, age) {
    this.age = age;
    this.name = name;
    this.habit = 'Games';
}

fn.prototype.strength = 60;

fn.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

var person = myNew(fn, 'Kevin', 18);

console.log(person.name)