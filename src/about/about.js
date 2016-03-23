// 如何处理多种 JS 依赖
// * CommonJS 模块(托管在 npm 或本地的)
// * AMD 模块
// * [UMD](https://github.com/umdjs/umd) 模块
// * 全局模块(那些直接暴露在 window 全局的模块)
// * 插件类模块(例如 jQuery 插件), 只是增强功能, 不会暴露全局对象
// npm commonjs
var $ = require('jquery');
// local commonjs
var libCommon = require('lib/vendor/lib-common');
// local global module
var libGlobal = require('lib/vendor/lib-global.js');
// local jquery plugin
require('lib/vendor/lib-jqueryplugin.js');
// 公共模块
var app = require('lib/app/app.js');

console.log('I am about');
console.log('mod', 'npm commonjs', 'jQuery', $.fn.jquery);
libCommon.sayHello();
libGlobal.sayHello();
$.ajqueryplugin();
app.sayHello();

// DefinePlugin
console.log(VERSION, BROWSER_SUPPORTS_HTML5, TWO, ENV);

document.body.style.backgroundColor = '#eee';

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