require('./index.css');
var $ = require('jquery');

console.log('I am index');
console.log('external jQuery', jQuery.fn.jquery);

document.body.style.backgroundColor = '#ccc';

// 一个 require.ensure 即一个 Code Splitting 分离点, 即产生一个 chunk.js
// 如果延迟执行 require.ensure 即可延时加载这个js
// 通过延时来模拟按需加载模块
setTimeout(function() {
    require.ensure([], function(require) {
        var mod1 = require('./mod1.js');
        mod1.run();
    });
}, 2000);

setTimeout(function() {
    require.ensure([], function(require) {
        var mod2 = require('./mod2.js');
        mod2.run();
    });
}, 4000);