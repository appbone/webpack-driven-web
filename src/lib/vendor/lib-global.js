// 全局模块
// 需要通过 imports 来导入依赖, exports 来导出模块
//
// module: {
//     loaders: [{
//         test: /lib-global\.js/,
//         // http://webpack.github.io/docs/shimming-modules.html
//         // imports: 将 window 依赖导入为 this
//         //          .call(window);
//         // exports: 将 libGlobal 导出为模块
//         //          module.exports = libGlobal;
//         loader: 'imports?this=>window!exports?libGlobal'
//     }]
// }
(function(global) {
    global.libGlobal = {
        sayHello: function() {
            console.log('mod', 'local global module');
        }
    };
})(this);