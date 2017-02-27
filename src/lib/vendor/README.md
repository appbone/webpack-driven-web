# vendor 目录用途

没有通过 `npm` 来管理的第三方库, 不限 js, css, font, img 等等第三方资源, 统统放这里.
注意不要直接修改第三方库(方便升级), 如果有特殊情况需要修改的, 必须移动到 app 目录.

例如放置如下内容
```
vendor/
├── foojqueryplugin.js
├── barjqueryplugin/
|   |── bar.css
|   |── bar.png
│   └── bar.js
└── foobar.js
```