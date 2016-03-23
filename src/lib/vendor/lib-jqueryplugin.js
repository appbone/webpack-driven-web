// 插件类模块
// 假如我是一个第三方 jQuery 插件
// 可以通过以下任意一种方式来引入这样的依赖, 推荐使用第 1 种方式
// 
// 1. ProvidePlugin
// 全局有效
// plugins: [
//     // This plugin makes a module available as variable in every module.
//     // The module is required only if you use the variable.
//     // Example: Make $ and jQuery available in every module without writing require("jquery").
//     // 即只要文件中使用了这样的变量名, 都可以自动获得该依赖模块
//     new webpack.ProvidePlugin({
//         '$': 'jquery',
//         'jQuery': 'jquery',
//         'window.$': 'jquery',
//         'window.jQuery': 'jquery'
//     })
// ]
// 
// 2. import-loader
// 只针对某个模块有效
// module: {
//     loaders: [{
//         test: /lib-jqueryplugin\.js/,
//         // imports: 将依赖的 jquery require 到该文件中, 即在该模块前加入如下语句
//         //          var jQuery = require('jquery');
//         loader: 'imports?jQuery=jquery'
//     }]
// }

(function($) {
    $.ajqueryplugin = function() {
        console.log('mod', 'jQueryPlugin');
    };
})(jQuery);