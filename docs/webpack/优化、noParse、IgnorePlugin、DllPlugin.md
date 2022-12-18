---
title: webpack优化、noParse、IgnorePlugin、DllPlugin
tags: webpack-noParse webpack-IgnorePlugin webpack-DllPlugin
book: webpack
---
## noParse 忽略解析

[官网的文档](https://webpack.docschina.org/configuration/module/#modulenoparse)说的有点模糊.其实就是说,有些库例如`jqury`,`lodash`等工具库并没有使用模块化的形式,直接引入即可,不需要通过webpack对他们进行呢递归解析处理.这样就能提升构建速度.

```js
import jquery from "jquery"
import lodash from "lodash"
console.log(jquery)
console.log(lodash);
```

```js
module.exports = {
  module: {
    noParse: /jquery|lodash/,
  },
};
```

经过测试,没有设置noParse的打包速度为**640ms**左右,设置优化后为**450ms**左右.

## IgnorePlugin 忽略引入

假如使用了momen工具:

```js
import moment from "moment"
console.log(moment().endOf("day").fromNow());
```
会输出`in 8 hours`,如果想要其输出中文,加上`moment.locale("zh-cn")`即可.

但是问题来了,`moment`支持很多种语言,而我们只需要使用中文,其他语言包的引入就很浪费,可以优化一下.

观察得知语言包的引入位置是在`node_modules/moment/locale`文件夹,可以配置:

```js
module.exports = {
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ]
};
```

[这是官网给的案例](https://webpack.docschina.org/plugins/ignore-plugin/#root)这样,当我们需要设置中文包的时候,手动引入下就好了:

```js
import 'moment/locale/zh-cn'
moment.locale("zh-cn")
```

经过测试打包,没有IgnorePlugin的`build.js`为742kb,优化后的为186kb.

## DllPlugin

>dll是动态链接库的意思,是Dynamic Link Library的缩写.

[DllPlugin文档解释](https://webpack.docschina.org/plugins/dll-plugin/)

### 案例

假如给项目安装`react`和`react-dom`,和解析react语法用的`@babel/preset-react`:

```shell
npm i react react-dom @babel/preset-react
```

`webpack.config.js`加上对应的loader配置:

```
presets: [
  "@babel/preset-env",
  "@babel/preset-react"
]
```

在`index.js`中写react内容:

```js
import React from "react"
import { render } from "react-dom"

render(<h1>react-demo</h1>, window.root)
```

`window.root`指的是挂载的dom节点,所以`public/index.html`中增加对应的节点:

```html
<body>
  <div id="root"></div>
</body>
```

尝试`npm run dev`,没问题.

### 痛点

`react`和`react-dom`是不会经常变动的,而每次修改或是打包,都会把这两个库的内容打包进`build.js`中.

`DllPlugin`的作用就是把某些库从bundles中抽离出来,提升构建速度.

### 开始解决

1. 新建个`webpack.config.react.js`文件:

```js
const path = require("path")
const webpack = require("webpack")

module.exports = {
  mode: "production",
  entry: {
    react: ["react", "react-dom"]
  },
  output: {
    filename: "_dll_[name].js",
    path: path.resolve(__dirname, "public"),
    library: "_dll_[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      name: "_dll_[name]",
      path: path.resolve(__dirname, "public", "manifest.json")
    })
  ]
} 
```

先把需要抽离的内容打包,利用`DllPlugin`插件生成个映射文件.

2. 运行`npx webpack --config webpack.config.react.js`,生成对应的文件.

3. 在`index.html`中引入打包好的react内容:

```html
<script src="./_dll_react.js"></script>
```

4. 修改`webpack.config.js`内容:

```js
module.exports = {
  // ...
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "public", "manifest.json")
    })
  ]
}
```

用`DllReferencePlugin`指定映射的文件.再次尝试打包,发现`build.js`体积少了不少.

### 几个关键点

1. `DllPlugin`的name属性,对应的是`output.library`的值.
2. `DllPlugin`和`DllReferencePlugin`是配套的.
3. 这套代码只是为了构建速度,也就是说开发环境比较适用.
