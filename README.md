# webpack-driven-web
wdw: 通过 webpack 来驱动 web 开发
* 通过 webpack 来做模块化(一个字爽)
* 通过 webpack code splitting 实现按需加载(两个字轻松)
* 通过 webpack xxx

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
* 如何在项目中引入第三方资源
  * 并最终打包成一个vendor.js和一个vendor.css
* 如何在项目中管理 CSS(在这里引入 PostCSS)
  * 并最终打包成一个页面.css
* 如何在项目中管理资源类文件

## 参考
* [在Webpack中使用Code Splitting实现按需加载](http://www.alloyteam.com/2016/02/code-split-by-routes/)
* [Welcome to Future of Web Application Delivery](https://medium.com/@ryanflorence/welcome-to-future-of-web-application-delivery-9750b7564d9f#.pf5iadz0j)
  
  > I’ve known for years I was delivering my web application the wrong way.
  > * Dropping 9 script tags at the top of a page and blocking UI
  > * Dropping 132 script tags at the bottom of a page, screwing up the order of dependencies and flooding the network
  > * Using AMD without a build with waterfall dependency loading (oops)
  > * Using modules with a build, sending 650 kilobytes of gzipped code in a single file that the visitor probably won’t ever need to run. Also, not sending any HTML over the network but building it all with JavaScript after JavaScript loaded.