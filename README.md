# webpack-driven-web
wdw: 通过 webpack 来驱动 Web 开发

* webpack 前端工程化应用
* 基于 webpack 的多页应用架构

![wdw-snapshot](https://github.com/appbone/webpack-driven-web/blob/master/src/about/res/wdw-snapshot.png?raw=true)

## 功能

[webpack-driven-web 功能演示](http://rawgit.com/appbone/webpack-driven-web/master/dist/index.html)

* 基于 `webpack@1.x` 的前端工程化实践
  * 没有任何魔法, 便于扩展出适合自己的前端工程化方案, 例如单页, react, vue 等
* 使用 `ES2015` 来开发
  * 使用 `ES2015` 模块来写标准的代码
* 支持多页面的架构
* 区分开发模式
  * 开发模式下不做压缩
  * 开发模式下不做文件 hash
  * 开发模式下开启 sourcemap
* 抽离出独立的 CSS 文件
  * 第三方 CSS(vendor.css)
  * 项目公共 CSS(app.css)
  * 页面 CSS(page.css)
* 提取出公共模块
  * 第三方 JS(vendor.js)
  * 项目功能 JS(app.js)
* 考虑了前端项目开发过程中的一般问题
  * 图片优化(`image-webpack`)
  * inline manifest(`InlineManifestWebpackPlugin`)
  * 生成稳定的模块ID(`HashedModuleIdsPlugin`)
  * 使用 `webpack-dev-server` 作为开发时的服务器, 并配置了代理

## 使用方法

首先 `npm install` 来安装项目依赖, 然后执行 `npm start` 启动 `webpack-dev-server` 来开始开发

### 其他命令

| 命令                | 作用 |
|---------------------|------|
| `npm run watch`     | 执行 `webpack` 构建并处于 `watch` 模式, 便于脱离 `webpack-dev-server` 来开发 |
| `npm run build`     | 清理构建文件, 重新执行一次构建, 一般用于发布版本的时候 |
| `npm run mockserver`| 启动 [puer-mock](https://github.com/ufologist/puer-mock) 作为 mockserver |
| `npm run analyzer`  | 分析项目中的依赖 |

## 目录说明

```
webpack-driven-web/
├── src/                         -- 项目源码
├── dist/                        -- 构建生成(前端部署的目录)
├── config/
|   |── webpack.base.config.js   -- webpack 基础配置
|   |── project-config.js        -- 项目配置和环境配置
|   └── HashedModuleIdsPlugin.js -- 用于生成稳定的模块ID(源自 webpack2)
|── _mockserver.json             -- puer-mock 接口配置文件
|── _apidoc.html
|── _mockserver.js
|── package.json
└── webpack.config.js
```

## 常见问题答疑

* [为什么做这个工程化实践?](https://github.com/appbone/webpack-driven-web/blob/master/FAQ.md#为什么做这个工程化实践)
* [如何添加其他的页面?](https://github.com/appbone/webpack-driven-web/blob/master/FAQ.md#如何添加其他的页面)
* [如何处理通过 Code Spliting 懒加载的模块中包含的 CSS?](https://github.com/appbone/webpack-driven-web/blob/master/FAQ.md#如何处理通过-code-spliting-懒加载的模块中包含的-css)
* [如何指定的开发模式?](https://github.com/appbone/webpack-driven-web/blob/master/FAQ.md#如何指定的开发模式)
* [最终构建后的效果是怎样的?](https://github.com/appbone/webpack-driven-web/blob/master/FAQ.md#最终构建后的效果是怎样的)
* [如何扩展为支持 Vue 的项目?](https://github.com/appbone/webpack-driven-web/blob/master/FAQ.md#如何扩展为支持-vue-的项目)
* [如何扩展为支持 React 的项目?](https://github.com/appbone/webpack-driven-web/blob/master/FAQ.md#如何扩展为支持-react-的项目)
* [什么时候支持 webpack 2.x?](https://github.com/appbone/webpack-driven-web/blob/master/FAQ.md#什么时候支持-webpack-2x)
* [参考](https://github.com/appbone/webpack-driven-web/blob/master/FAQ.md#参考)