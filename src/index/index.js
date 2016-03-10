document.body.style.backgroundColor = '#ccc';
console.log('I am index');

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