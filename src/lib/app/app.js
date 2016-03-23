// 项目公共模块
// 
// http://webpack.github.io/docs/list-of-plugins.html#1-commons-chunk-for-entries
// Generate an extra chunk, which contains common modules shared between entry points.
// 
// TODO 如何在多份 webpack 配置的 entry 中抽离出公共模块?
// 是否也重新做一份 webpack 配置, 将公共模块作为一个 entry
// 然后在各个页面中引用?
module.exports = {
    sayHello: function() {
        console.log('mod', 'CommonsChunk');
    }
};