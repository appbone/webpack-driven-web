// 3rd
import $ from 'jquery';
import bootstrap from 'bootstrap';

// app 公共逻辑
import app from 'lib/app/app.js';

// 模块样式
import css from './index.css';
// 如果不使用 CSS Modules, 可以简单的 import 或者 require 这样就不需要定义一个无聊的变量了
// import './index.css';
// require('./index.css');

// 引用文件路径
import imgUrl from './res/github-publish.png';

// webpack.DefinePlugin
console.log(__ENV__);

console.log('index.js', $.fn.jquery, bootstrap, css, app, imgUrl);

$('[data-toggle="tooltip"]').tooltip();

// code splitting 相当于异步按需加载模块
// http://webpack.github.io/docs/code-splitting.html#defining-a-split-point
// 一个 require.ensure 即一个 Code Splitting 分离点, 即产生一个 chunk.js
// 这里例举延迟执行 require.ensure 即可延时加载这个js
setTimeout(function() {
    require.ensure(['./lazy-mod.js'], function() {
        // es2015 module
        // https://github.com/webpack/webpack/issues/1680
        // function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
        var lazyMod = require('./lazy-mod.js').default;
        console.log('lazyMod', lazyMod);
    });
}, 3000);

export default 'index.js';