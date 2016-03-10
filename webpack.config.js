var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfigIndex = {
    entry: {
        index: './src/index/index.js',
    },
    output: {
        path: './dist/index',
        filename: '[name].[hash:5].js' // XXX 为什么 chunk 的 hash 跟 entry 是一样的, 会造成
        // 仅仅一个 chunk 修改了, 所有的 hash 都会修改, 这样不会造成资源浪费吗?
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index/index.html',
            filename: 'index.html'
        })
    ]
};

var webpackConfigAbout = {
    entry: {
        about: './src/about/about.js',
    },
    output: {
        path: './dist/about',
        filename: '[name].[hash:5].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/about/about.html',
            filename: 'about.html'
        })
    ]
};

var webpackConfig = [webpackConfigIndex, webpackConfigAbout];
webpackConfig.forEach(function(config) {
    if (process.env.MODE == 'dev') {
        config.devtool = 'source-map';
    } else {
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                // drop_console: true
            }
        }));
    }
});

module.exports = webpackConfig;