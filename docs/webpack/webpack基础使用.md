---
title: webpack基础使用
tags: webpack
book: webpack
---
## 安装初使用 webpack

```sh
npm init -y
npm i webpack webpack-cli -D
```

在src目录下新建`index.js`文件,内容为`console.log(1)`.

执行`npx webpack`,会发现多出个文件`/dist/main.js`,内容就是打包后的内容.

---

webpack可以**0配置**,在没有配置的情况下,webpack提供了2个功能:
* 打包.  
* 模块化.(虽然没有写demo,但是是支持的,`index.js`引入其他文件是可以被打包的)

## 手动配置webpack

默认配置文件的名字 `webpack.config.js`:

```js
const path = require("path")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist")
  }
}
```

`mode`一般有2中模式,`production`(压缩代码)和`development`(具有调试能力).

如果不想用默认的文件名,也可以文件改名为`webpack.my.js`,执行命令`webpack --config webpack.my.js`.

当然可以也可以写`package.json`脚本命令:

```json
"scripts": {
  "build": "webpack --config webpack.my.js"
}
```

> 测试完了就改回`webpack.config.js`吧.

## webpack-dev-server 服务

`webpack-dev-server` 我webpack内置的静态服务器.

```sh
npm i webpack-dev-server -D
```

运行下试下`npx webpack-dev-server`,根据提示可以得知,默认开启的是8080端口,默认指向的是根目录下的`public`目录.

### 配置 webpack-dev-server

先添加个`scripts`脚本`"dev": "webpack-dev-server"`,再`webpack.config.js`修改:

```js
module.exports = {
  devServer: {
    port: 3000,
    compress: true,
    static: {
      directory: path.join(__dirname, 'build'),
    },
    client: {
      progress: true,
    },
  },
  // ... 其他配置
}
```

尝试运行`npm run dev`,就会发现服务内容是打包后的`build/index.html`文件,当然,没有没有build目录就会失败.  
目前来看,html和js文件的关联性还不紧密,可以通过插件去优化,并且改善上树没有build目录导致服务失败的问题.

## HTML 插件

打包只打包js文件,如何让HTML文件自动引入打包好的js文件,就需要借助webpack的插件机制了.

```sh
npm i html-webpack-plugin -D
```

```js
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  // ... 其他配置
  plugins: [
    new HtmlWebpackPlugin({ 
      template: "./public/index.html",
      filename: "index.html"
    })
  ]
}
```

新建`public/index.html`文件:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>test</title>
  </head>
</html>
```

这时再次执行`npm run build`,或者`npm run dev`,都会有打开title为test的html文件,并且控制台都会打印`1`.

> build会打包出dist目录,而`webpack-dev-server`则会创建个看不见的build目录.

### html-webpack-plugin 一些其他的配置

```js
module.exports = {
  // ... 其他配置
  plugins: [
    new HtmlWebpackPlugin({ 
      // ...
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      },
      hash: true
    })
  ]
}
```

* minify是`使其变小`的意思.
  * `removeAttributeQuotes`会让HTML的属性的双引号去掉.
  * `collapseWhitespace`打包后HTML内容为一行.
* `hash`是在html文件引入打包js文件时加上hash,以做到文件改变,禁止缓存的目的,如下:
```html
<script defer=defer src=bundle.js?452c5185f5120fc1066b></script>
```

## 总结知识点

* webpack 0配置支持打包和模块化.
* webpack 模式有开发和生产环境.
* html-webpack-plugin 插件会让打包和server服务打包时起作用,让其用自己配置的模板html作为输出的最终载体.
* webpack-dev-server 会开启本地服务,打包后的内容放在缓存中.