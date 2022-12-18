---
title: webpack跨域、resolve解析、环境变量
tags: webpack跨域 webpack解析 webpack环境变量
book: webpack
---
## 跨域设置

在根目录下新建个文件`server.js`:

```js
const express = require("express")
const app = express()
app.get("/user", (_req, res) => {
  res.json({name: "senlin"})
})
app.listen(3000)
```

在`src/index.js`中,写下请求代码:

```js
let xhr = new XMLHttpRequest()
xhr.open("GET", '/api/user', true)
xhr.onload = function() {
  console.log(xhr.response);
}
xhr.send()
```

最后配置下devServer的跨域配置:

```js
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
```

先运行`node serve.js`,再运行webpack-server.发现接口请求正常.

## 单纯的模拟数据返回

```js
module.exports = {
  devServer: {
    onBeforeSetupMiddleware(devServer) {
      devServer.app.get("/api/user", (_req, res) => {
        res.json({name: "senlin999"})
      })
    }
  }
}
```

这样就模拟了自定义数据的返回.

>因为webpack-derver服务本身就是express,所以可以无缝的使用express.  

## 让接口和项目用同一个端口

也就是把webpack作为中间件运行在服务中,需要安装middleware:

```shell
npm i webpack-dev-middleware -D
```

修改`server.js`文件:

```js
const express = require("express")
const webpack = require("webpack")
const midlle = require("webpack-dev-middleware")
const config = require("./webpack.config")

const compiler = webpack(config)
const app = express()

app.use(midlle(compiler))

app.get("/user", (_req, res) => {
  res.json({name: "senlin"})
})

app.listen(3000)
```

再次执行`node server.js`即可.

---

## resolve

[官网文档](https://webpack.docschina.org/configuration/resolve/#resolve)

日常开发感知比较明显的resolve的配置应该就是alias(别名)和extension(延伸，扩展)了.

```js
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src/'),
    },
  }
}
```

```js
module.exports = {
  resolve: {
    extensions: ['.js', '.css', '.json'],
  }
}
```

当我们`import test from './test'`时,默认找`test.js`,没有的话找`test.css`,以此类推.

## 环境变量的设置

```js
const webpack = require("webpack")
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      DEV: JSON.stringify("production")
    }),
  ]
}
```

在`index,js`中执行`console.log(DEV)`,可以正常打印production.

## 区分不同环境

通过`webpack.base.js`和`webpack.prod.js`和`webpack.dev.js`三个文件的组合,做到区分开发和正式环境.

需要安装merge:

```shell
npm i webpack-merge -D
```

以`webpack.prod.js`为例:

```js
const { merge } = require("webpack-merge")
const base = require("./webpack.base.js")
const webpack = require("webpack")

module.exports = merge(base, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      DEV: JSON.stringify("production")
    })
  ]
})
```

尝试运行`npm run dev --  --config webpack.prod.js`,可以正常输出production.

这样就可以根据不同的开发环境配置不同的webpack了.