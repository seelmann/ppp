(function(exports) {

    exports.DemoBloomFilter = DemoBloomFilter;

    function DemoBloomFilter() {
        this.a = new Array(false, false, false, false);
        // console.log(this.a);
    }

    DemoBloomFilter.prototype.add = function(val) {
        this.a[hash(val)] = true;
        // console.log(this.a);
    };

    DemoBloomFilter.prototype.test = function(val) {
        return this.a[hash(val)];
    };

    function hash(val) {
        return val.split('').reduce(function(a, b) {
            return (a + b.charCodeAt(0)) % 4
        }, 0)
    }
})(typeof exports !== "undefined" ? exports : this);



/*
var DemoBloomFilter = require("./demobloomfilter").DemoBloomFilter;
var bf = new DemoBloomFilter();
bf.add('a');
bf.add('b');
bf.add('c');
bf.test('a');
bf.test('b');
bf.test('c');
bf.test('d');
bf.test('e');

*/