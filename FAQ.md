# 常见问题答疑

## 为什么做这个工程化实践?

思考下 Web 网站一般包含些什么东西?

* 多个 html 页面(例如首页/关于页/产品介绍页等独立页面)
* 每个 html 页面包含
  - 一个或多个第三方库(js/css/res)
  - 一个或多个该网站公共的样式和资源(css/res)
  - 一个或多个该网站公共的逻辑(js)
  - 一个或多个该页面专有的样式和资源(css/res)
  - 一个或多个该页面专有的逻辑(js)

正式发布时又会是什么样子?

* 发布的目录结构与开发时最好保持一致
* 第三方库合并/压缩成一个文件或者直接引用公共 CDN
  - vendor.js
  - vendor.css
* 合并/压缩该网站公共的样式
  - app.css
* 合并/压缩该网站公共的逻辑
  - app.js
* 合并/压缩每个页面专有的样式
  - page.css
* 合并/压缩每个页面专有的逻辑
  - page.js
* 为了提升前端性能, 以上资源最好做基于文件 hash 的强缓存

因此我们理想的发布后的 Web 网站应该是这样的, 请参考[网站项目目录结构规范](https://github.com/appbone/mobile-spa-boilerplate/blob/master/directory.md)
```
网站/
├── lib/
|   |── app/
|   |   |── app.css
|   |   |── app.js
|   |   └── res/
|   |── vendor/
|   |   |── vendor.css
|   |   |── vendor.js
|   |   └── ...
|   └── cdn/
|
├── page1/
|   |── page1.html
|   |── page1.css
|   |── page1.js
|   └── res/
|       └── page1.jpg
|
└── page.../
```

我们的 `page1.html` 应该差不多是这个样子

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>page1</title>
    <link rel="stylesheet" href="../lib/vendor/vendor.css">
    <link rel="stylesheet" href="../lib/app/app.css">
    <link rel="stylesheet" href="page1.css">
</head>
<body>
    <p>page1 的内容</p>
    <script src="../lib/vendor/vendor.js"></script>
    <script src="../lib/app/app.js"></script>
    <script src="page1.js"></script>
</body>
</html>
```

或者我们使用公共 CDN 来引入第三方依赖的库

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>page1</title>
    <link rel="stylesheet" href="http://freecdn.com/vendor1.css">
    <link rel="stylesheet" href="http://freecdn.com/vendor2.css">
    <link rel="stylesheet" href="../lib/app/app.css">
    <link rel="stylesheet" href="page1.css">
</head>
<body>
    <p>page1 的内容</p>
    <script src="http://freecdn.com/vendor1.js"></script>
    <script src="http://freecdn.com/vendor2.js"></script>
    <script src="../lib/app/app.js"></script>
    <script src="page1.js"></script>
</body>
</html>
```

理想很丰满现实很骨干, 想要达到理想中开发的效果, 我们首先需要应对各种各样的依赖问题, 然后就是资源文件做 hash 强缓存后涉及的路径替换问题

* JS 依赖
  - CommonJS 模块(托管在 npm 或本地的)
  - AMD 模块
  - [UMD](https://github.com/umdjs/umd) 模块
  - 全局模块(那些直接暴露在 window 的全局变量)
  - 插件类模块(例如 jQuery 插件), 只是增强功能, 不会暴露出全局变量
* CSS 依赖
* 资源依赖

在实践了多种前端工程化方案后, 最终选择通过 webpack 来达到我的上述目标

* 支持多页面, 方便扩展
* 支持多环境模式
* 面向未来的开发模式(例如使用 `ES2015`)
* 能打包各种模块(终于不用担心全局变量了)
* Code Splitting 实现按需加载
* 方便抽离出公共部分(不再是简单的合并成一个 all in one 的 JS 文件)
* 透明的做基于文件 hash 的强缓存, 绝对不需要你手工去修改资源的路径

## 如何添加其他的页面?

约定入口模块的 JS/HTML 文件和页面同名, 例如你现在想添加一个 `page1` 页面

那么应该 `src` 目录应该为

```
src/
└── page1/
    |── page1.html -- 页面模版
    |── page1.js   -- 页面入口模块
    |── page1.css
    └── res
```

```javascript
// webpack.config.js
// 增加页面入口模块(去掉页面入口模块的 JS 文件后缀即可)
addPageEntry('page1/page1');
// 这样就相当于为 webpack 添加了入口模块为 'page1/page1': 'page1/page1.js'

// 如果是某个页面的子模块, 例如 page1/page1/subpage
addPageEntry('page1/page1/subpage');
// 这样就相当于为 webpack 添加了入口模块为 'page1/page1/subpage': 'page1/page1/subpage.js'
```

## 如何处理通过 Code Spliting 懒加载的模块中包含的 CSS?

* 方式一: 给 `ExtractTextPlugin.extract` 配置 `notExtractLoader`, 同时配置 `ExtractTextPlugin` `allChunks` 为 `false` (默认值)

  例如:
  
  ```javascript
  ExtractTextPlugin.extract('style-loader', 'css')
  new ExtractTextPlugin('style.css', {allChunks: false})
  ```

  由于 `new ExtractTextPlugin` 的默认配置只提取入口模块中的 CSS, 对于通过 Code Spliting 加载的模块,
  其中包含的 CSS 内容会作为文本待在模块中(不会被提取成单独的 CSS 文件), 因此最终没有在页面中生效(因为此时没有使用 `style-loader`).

  因此我们给 `ExtractTextPlugin.extract` 配置 `notExtractLoader`, 它的作用就是当模块中的 CSS 没有被提取出来时, 告诉 webpack 应该使用另外的什么 loader 来加载这个文件, 这里我们当然就是使用 `style-loader` 来动态的在页面中插入 style 元素来加载异步模块中的样式了

* 方式二: 配置 `ExtractTextPlugin` `allChunks` 为 `true`, 提取所有模块中的 CSS, 包括 Code Spliting 分离出来的模块

  这样通过 Code Spliting 加载的模块中的 CSS 会包含在入口模块的 CSS 中(例如 index.css). 相当于只异步加载 JS 模块, JS 模块中包含的样式合并到入口模块的 CSS 中一开始就加载了.

## 如何指定的开发模式?

通过环境变量(`MODE`)来控制, 例如在 `scripts` 中设置 `cross-env MODE=dev`, 你可以扩展出其他模式, 例如预发布模式

## 最终构建后的效果是怎样的?

开发模式下

![开发模式下的模块](https://github.com/appbone/webpack-driven-web/blob/master/src/index/res/modules.png?raw=true)

非开发模式下

```
dist/
├── index/                          -- 页面模块 
|   |── index-8ef142e.css           -- 页面 CSS
|   └── index-9f9aa74.js            -- 页面 JS
|
├── about/
|   |── about.html
|   |── about-5f5d601.css
|   |── about-0ec759d.js
|   └── foo
|       |── foo.html
|       |── foo-5f5d601.css
|       └── foo-c14261c.js
|
├── lib/                            -- 公共模块 
|   |── vendor-7595e55.js           -- 第三方 JS
|   |── app-ebb4047.js              -- 公共 JS
|   └── 3-181fa6c.js                -- 异步模块
|
├── res/                            -- 所有依赖的静态资源
|   |── what-is-webpack-0fa90f9.png
|   └── ...
|
├── vendor-6c72d88.css              -- 第三方 CSS
├── app-5f5d601.css                 -- 公共 CSS
└── index.html                      -- 首页
```

## 什么时候支持 webpack 2.x?

再等等吧, 生态还不成熟... 况且 webpack 1.x 已经解决了我的问题, 有兴趣的可以基于这个项目自己做一个 webpack 2.x 的版本

## 参考

* [Webpack 入门指迷](https://segmentfault.com/a/1190000002551952)
* [ruanyf/webpack-demos](https://github.com/ruanyf/webpack-demos)
* [webpack使用小记](http://pinkyjie.com/2016/03/05/webpack-tips)
* [PinkyJie/angular1-webpack-starter](https://github.com/PinkyJie/angular1-webpack-starter)
* [基于 webpack 搭建前端工程基础篇](https://github.com/chenbin92/react-redux-webpack-starter/issues/1)
* [webpack 使用总结](http://www.ferecord.com/webpack-summary.html)
* [webpack的几个常用loader](http://www.blogways.net/blog/2016/01/19/webpack-loader.html)
* [webpack使用优化](http://www.alloyteam.com/2016/01/webpack-use-optimization/)
* [在Webpack中使用Code Splitting实现按需加载](http://www.alloyteam.com/2016/02/code-split-by-routes/)
* [用 webpack 实现持久化缓存](https://sebastianblade.com/using-webpack-to-achieve-long-term-cache/)
* [使用 Webpack 打包单页应用的正确姿势](http://geek.csdn.net/news/detail/135599)

  > * CommonsChunkPlugin
  >   * vendor
  > * CommonsChunkPlugin
  >   * vendor
  >   * webpackruntime(manifest)
  > * 被 webpack-md5-hash 坑了
  >   * 模块文件内容没变, 但引用的模块 ID 实际上有改变的情况下 hash 却没有改变, 例如: [你用 webpack 1.x 输出的 hash 靠谱不 ？ - 如何让模块 ID 给我稳定下来?](https://github.com/zhenyong/Blog/issues/1)
  >   * 问题的根源在于Webpack使用模块的引用顺序作为模块的id，这样就不能避免新增或删除模块对其他模块的id产生影响
  > * NamedModulesPlugin
  >   * 使用模块的相对路径作为模块的 id，所以只要我们不重命名一个模块文件，那么它的id就不会变，更不会影响到其它模块了
  >   * 例如: `__webpack_require__("./node_modules/jquery/dist/jquery.js")`
  >   * 相对路径比数字id要长了很多, 因此影响到了打包后文件的大小
  > * DllPlugin 将第三方依赖和业务代码分开编译
  >   * 使用起来比较麻烦
  > * 最终解决方案
  >   * 需要使用插件替换默认的数字类型的模块 id，避免增加或删除模块对其他模块的 id 产生影响，例如使用 NamedModulesPlugin
  >   * 需要从 vendor.js 中抽离出 Webpack 的运行时代码，保证 vendor.js 的 hash 不会受到影响
  >   * [HashedModuleIdsPlugin](https://github.com/webpack/webpack/blob/master/lib/HashedModuleIdsPlugin.js) 根据模块的相对路径生成一个长度只有四位的字符串作为模块的 id，既隐藏了模块的路径信息，又减少了模块 id 的长度。虽然这个插件包含在 Webpack 2.x 中，但它也是可以直接在 Webpack 1.x 中使用的

* [Welcome to Future of Web Application Delivery](https://medium.com/@ryanflorence/welcome-to-future-of-web-application-delivery-9750b7564d9f#.pf5iadz0j)
  
  > I’ve known for years I was delivering my web application the wrong way.
  > * Dropping 9 script tags at the top of a page and blocking UI
  > * Dropping 132 script tags at the bottom of a page, screwing up the order of dependencies and flooding the network
  > * Using AMD without a build with waterfall dependency loading (oops)
  > * Using modules with a build, sending 650 kilobytes of gzipped code in a single file that the visitor probably won’t ever need to run. Also, not sending any HTML over the network but building it all with JavaScript after JavaScript loaded.

* [img-sprite 实现](http://cupools.github.io/2015/100122/ "合并精灵图工具")
* [An Introduction To PostCSS](http://www.smashingmagazine.com/2015/12/introduction-to-postcss/)
* [webpack入坑之旅](http://guowenfh.github.io/2016/03/24/vue-webpack-01-base/)
* [常用gulp插件介绍一](http://pinkyjie.com/2015/08/02/commonly-used-gulp-plugins-part-1/)[二](http://pinkyjie.com/2015/08/12/commonly-used-gulp-plugins-part-2/)
* [webpack多页应用架构系列](https://segmentfault.com/a/1190000006843916)