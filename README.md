# webpack-driven-web
wdw: 通过 webpack 来驱动 web 开发

* 通过 webpack 打包各种模块(终于不用担心全局变量了)
* 通过 webpack code splitting 实现按需加载(轻松)
* 通过 webpack xxx

## Web 网站包含些什么东西?
* 多个 html 页面(例如首页/关于页/产品介绍页等独立页面)
* 每个 html 页面包含
  - 一个或多个第三方库(js/css/res)
  - 一个或多个该网站公共的样式和资源(css/res)
  - 一个或多个该网站公共的逻辑(js)
  - 一个或多个该页面专有的样式和资源(css/res)
  - 一个或多个该页面专有的逻辑(js)

## 正式发布时会是什么样子?
* 发布的目录结构与开发时最好保持一致
* 第三方库合并/压缩成一个文件或者直接引用公共 CDN
  - vendor.js
  - vendor.css
* 合并/压缩该网站公共的样式(需要支持 CSS sprite)
  - app.css
* 合并/压缩该网站公共的逻辑
  - app.js
* 合并/压缩每个页面专有的样式(需要支持 CSS sprite)
  - page.css
* 合并/压缩每个页面专有的逻辑
  - page.js

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
```
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
```
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

## 理想很丰满现实很骨干
想要达到理想中开发的效果, 我们首先需要应对各种各样的依赖问题.

* JS 依赖
  - CommonJS 模块(托管在 npm 或本地的)
  - AMD 模块
  - [UMD](https://github.com/umdjs/umd) 模块
  - 全局模块(那些直接暴露在 window 的全局变量)
  - 插件类模块(例如 jQuery 插件), 只是增强功能, 不会暴露出全局变量
* CSS 依赖
* 资源依赖

## 如何使用 Code Splitting
```javascript
// 一个 require.ensure 即一个 Code Splitting 分离点, 即产生一个chunk.js
// 如果延迟执行 require.ensure 即可延时加载这个js
require.ensure([], function(require) {
    var mod1 = require('./mod1.js');
    mod1.run();
});
```

## 如何使用这个项目
```bash
npm install
npm run dev
npm run build
```

**通过 webpack 打包后的最终效果**
```
dist/
├── index/
|   |── index.html
|   |── index.[hash].js
|   |── 1.[chunkhash].js
|   └── 2.[chunkhash].js
|
└── about/
    |── about.html
    |── about.[hash].js
    |── 1.[chunkhash].js
    └── 2.[chunkhash].js
```

## TODO
* 如何在项目中管理 CSS(在这里引入 PostCSS)
  * 并最终打包成一个页面.css

## 参考
* [在Webpack中使用Code Splitting实现按需加载](http://www.alloyteam.com/2016/02/code-split-by-routes/)
* [Welcome to Future of Web Application Delivery](https://medium.com/@ryanflorence/welcome-to-future-of-web-application-delivery-9750b7564d9f#.pf5iadz0j)
  
  > I’ve known for years I was delivering my web application the wrong way.
  > * Dropping 9 script tags at the top of a page and blocking UI
  > * Dropping 132 script tags at the bottom of a page, screwing up the order of dependencies and flooding the network
  > * Using AMD without a build with waterfall dependency loading (oops)
  > * Using modules with a build, sending 650 kilobytes of gzipped code in a single file that the visitor probably won’t ever need to run. Also, not sending any HTML over the network but building it all with JavaScript after JavaScript loaded.
* [webpack的几个常用loader](http://www.blogways.net/blog/2016/01/19/webpack-loader.html)


* [webpack使用小记](http://pinkyjie.com/2016/03/05/webpack-tips)
* [](https://github.com/PinkyJie/angular1-webpack-starter)
* http://pinkyjie.com/2016/01/31/component-based-development-with-angular-1x/
* http://pinkyjie.com/2015/08/02/commonly-used-gulp-plugins-part-1/
* http://pinkyjie.com/2015/08/12/commonly-used-gulp-plugins-part-2/
* http://pinkyjie.com/2016/02/20/separation-of-concerns-in-unit-test/
* http://pinkyjie.com/2016/02/21/e2e-testing-in-angular/