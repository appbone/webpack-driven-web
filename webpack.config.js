var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfigIndex = {
    entry: {
        index: './src/index/index.js',
    },
    output: {
        path: './dist/index',
        filename: '[name].[hash:5].js',
        // 添加 chunkFilename 规则后, 如果修改单个 chunk 文件,
        // 生成的文件改变的只有这个 chunk.js 和 entry.js
        // 例如:   index.3316a.js, 1.b3a84.js, 2.9a17d.js
        // 修改后: index.19ede.js, 1.13061.js, 2.9a17d.js
        chunkFilename: '[name].[chunkhash:5].js'
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
        filename: '[name].[hash:5].js',
        chunkFilename: '[name].[chunkhash:5].js'
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