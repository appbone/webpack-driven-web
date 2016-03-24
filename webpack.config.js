var path = require('path');
var webpack = require('webpack');
// https://github.com/webpack/extract-text-webpack-plugin
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var env = process.env;

var webpackConfigIndex = {
    entry: {
        index: './src/index/index.js'
    },
    output: {
        path: './dist/index',
        filename: '[name]-1.0.0-[hash:6].js',
        // 添加 chunkFilename 规则后, 如果修改单个 chunk 文件,
        // 生成的文件改变的只有单独的 chunk.js 和 entry.js
        // 例如:   index.3316a.js, 1.b3a84.js, 2.9a17d.js
        // 修改后: index.19ede.js, 1.13061.js, 2.9a17d.js
        chunkFilename: '[name]-1.0.0-[chunkhash:6].js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            // https://github.com/webpack/css-loader
            // @import and url(...) are interpreted like require()
            // https://github.com/ai/browserslist#queries
            // https://github.com/ben-eb/cssnano/issues/69
            // TODO Disable behavior url
            loader: ExtractTextPlugin.extract(env.MODE == 'dev' ? 'css?{"sourceMap":true,"autoprefixer":{"add":true,"browsers":["last 2 versions"]}}' : 'css?{"autoprefixer":{"add":true,"browsers":["last 2 versions"]}}')
        }, {
            // test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/, loader: 'file-loader?name=[name].[ext]?[hash:6]'
            test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/, loader: 'file-loader?name=[name]-[hash:6].[ext]'
        }]
    },
    plugins: [
        new webpack.BannerPlugin('index v1.0.0 ' + new Date().toLocaleDateString() + ' | (c) 2014-2015 mydomain.com', {
            entryOnly: true
        }),
        new HtmlWebpackPlugin({
            template: './src/index/index.html',
            filename: 'index.html'
        }),
        new webpack.NoErrorsPlugin()
    ],
    // http://webpack.github.io/docs/library-and-externals.html#applications-and-externals
    // 依赖的外部 JS, 需要手工在页面中预先添加 script
    externals: {
        // 这样的模块仅仅是直接 exports 出这个全局变量而已
        // 相当于: module.exports = jQuery;
        jquery: 'jQuery'
    },
    resolve: {
        alias: {
            // 直接指定使用 min 版
            'bootstrap-css': path.resolve('node_modules', 'bootstrap/dist/css/bootstrap.min.css')
        }
    }
};

var webpackConfigAbout = {
    entry: {
        about: './src/about/about.js',
        vendor: [
            'jquery', // 由于注册成 npm commonjs 模块就无法在浏览器中全局访问 jQuery 了
            './src/lib/vendor/lib-common.js',
            './src/lib/vendor/lib-global.js',
            './src/lib/vendor/lib-jqueryplugin.js'
        ]
    },
    output: {
        path: './dist/about',
        filename: '[name]-1.0.0-[hash:6].js',
        // publicPath: 'http://yourcdn.com/about',
        chunkFilename: '[name]-1.0.0-[chunkhash:6].js'
    },
    resolve: {
        alias: {
            // 直接指定使用 min 版
            'jquery': path.resolve('node_modules', 'jquery/dist/jquery.min.js'),
            'lib': path.resolve(__dirname, 'src/lib')
        }
    },
    module: {
        noParse: ['jquery'],
        loaders: [{
            test: /lib-global\.js/,
            // http://webpack.github.io/docs/shimming-modules.html
            // imports: 将 window 依赖导入为 this
            //          .call(window);
            // exports: 将 libGlobal 导出为模块
            //          module.exports = libGlobal;
            loader: 'imports?this=>window!exports?libGlobal'
        }]
    },
    plugins: [
        // http://webpack.github.io/docs/list-of-plugins.html#bannerplugin
        new webpack.BannerPlugin('about v1.0.0 ' + new Date().toLocaleDateString() + ' | (c) 2014-2015 mydomain.com', {
            entryOnly: true
        }),
        // http://webpack.github.io/docs/list-of-plugins.html#2-explicit-vendor-chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        // http://webpack.github.io/docs/list-of-plugins.html#defineplugin
        // 相对于替换代码中的变量(左边的值)替换成右边的值, 例如 VERSION 替换成字符串 5fa3b9
        new webpack.DefinePlugin({
            VERSION: JSON.stringify('5fa3b9'), // 注意字符串一定要 stringify, 否则会被认为是 code fragment
            BROWSER_SUPPORTS_HTML5: true,
            TWO: '1+1', // code fragment
            ENV: {
                cdn1: JSON.stringify('http://cdn1'),
                cdn2: JSON.stringify('http://cdn2')
            }
        }),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: './src/about/about.html',
            filename: 'about.html'
        }),
        // http://webpack.github.io/docs/shimming-modules.html#plugin-provideplugin
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.NoErrorsPlugin()
    ]
};

var webpackConfig = [webpackConfigIndex, webpackConfigAbout];
webpackConfig.forEach(function(config) {
    if (env.MODE == 'dev') {
        config.devtool = 'source-map';
        config.output.filename = config.output.chunkFilename = '[name].js';
        config.plugins.push(new ExtractTextPlugin('[name].css'));
    } else {
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                // drop_console: true
            }
        }));
        config.plugins.push(new ExtractTextPlugin('[name]-1.0.0-[contenthash:6].css'));
    }
});

module.exports = webpackConfig;