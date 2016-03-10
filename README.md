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
|   |── index.bundle.js
|   |── 1.1.bundle.js
|   └── 2.2.bundle.js
|
└── about/
    |── about.html
    |── about.bundle.js
    |── 1.1.bundle.js
    └── 2.2.bundle.js
```

## TODO
* 如何在项目中引入第三方资源
  * 并最终打包成一个vendor.js和一个vendor.css
* 如何在项目中管理 CSS(在这里引入 PostCSS)
  * 并最终打包成一个页面.css
* 如何在项目中管理资源类文件

## 参考
[在Webpack中使用Code Splitting实现按需加载](http://www.alloyteam.com/2016/02/code-split-by-routes/)