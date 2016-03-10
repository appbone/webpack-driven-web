var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfigIndex = {
    entry: {
        index: './src/index/index.js',
    },
    output: {
        path: './dist/index',
        filename: '[name].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index/index.html',
            filename: 'index.html',
            inject: false // TODO 如何通过插件自动生成最终显示用的 html, 要包含 bundle 的 hash 值
            // 现在只是用 HtmlWebpackPlugin 来移动了一下文件而已, 没有做插入 script 的操作
        })
    ]
};

var webpackConfigAbout = {
    entry: {
        about: './src/about/about.js',
    },
    output: {
        path: './dist/about',
        filename: '[name].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/about/about.html',
            filename: 'about.html',
            inject: false
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