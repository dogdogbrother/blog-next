---
title: webpack样式和js的处理
tags: webpack
book: webpack
---
## 基本的样式

`index.js`文件下写入代码`require('./index.css')`,`index.css`文件内容入下:

```css
@import './a.css';
html {
  background-color: red;
}
```

尝试dev或者build,会失败,这涉及到2个问题:
* webpack不识别css的`@import`.
* webpack无法把css插入到html中.

所以需要2个loader解决这俩问题,先安装下:

```sh
npm i css-loader style-loader -D
```

再在`webpack.config.js`中编写module相关配置,在webpack官网中,是这么描述[module](https://webpack.docschina.org/configuration/module/)的:这些选项决定了如何处理项目中的不同类型的模块。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
}
```

`css-loader`负责css的模块化引入,例如解析`@import`语法,`style-loader`负责把css引入到html中.

### loader的一些注意事项

* loader的特点是功能单一.  
* loader可以是字符串,也可以是对象,是对象的话可以传入更多的参数作为配置.[官网的style-loader的options实例](https://webpack.docschina.org/loaders/style-loader/#options)
* loader的执行顺序是从右到左执行的.

## 使用less

先安装less:

```sh
npm i less less-loader -D
```

```js
module.exports = {
  module: {
    rules: [
      // ...刚才写的对css解析
      {
        test: /\.less$/,
        use: [
          "style-loader", 
          "css-loader",
          "less-loader"
        ]
      }
    ]
  }
}
```

在最下面的加上`less-loader`,先把less语法转换成css,再依次向上处理.

---

## 转换高版本语法

es6语法因为兼容问题,很多浏览器是不支持的,所以打包的时候需要使用babel对高版本语法降级.  
在`index.js`文件中加入写es6的语法:

```js
const fn = () => {
  console.log(1)
}
fn()
```

安装转换的相应的babel和配置:

```sh
npm i babel-loader @babel/core @babel/preset-env -D
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env"
            ]
          }
        }
      },
      // ...
    ]
  }
}
```

再尝试打包,就发现箭头函数变成了`var = function fn () {...}`.

## 处理js语法

给`index.js`中写下如下内容:

```js
require("./b.js")
class a {
  constructor() {
    console.log("a");
  }
}
new a()

function * gen() {
  yield 1;
}

console.log(gen().next());
```
```js
// b.js
class b {
  constructor() {
    console.log("b");
  }
}
new b()
```

打包后查看`build.js`文件,发现有2个问题:
* class语法被函数`_classCallCheck`实现,但是`_classCallCheck`却被声明了2次,属实浪费.
* Generator函数被转换成`regeneratorRuntime`函数,但是此函数却没有实现,导致报错.

解决问题需要安装两个插件:

```shell
npm i @babel/plugin-transform-runtime --D
npm i @babel/runtime
```

[babel官网](https://babeljs.io/docs/en/babel-plugin-transform-runtime):一个插件，可以重用 Babel 注入的辅助代码以节省代码大小。  
给`babel-loader`添加插件:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env"
            ],
            plugins: [
              "@babel/plugin-transform-runtime"
            ]
          }
        }
      },
      // ...
    ]
  }
}
```

再次打包或者运行尝试,上述2问题被解决.

## polyfill

如果我们使用`"aaa".includes("a")`等语法,打包和运行的时候都没有问题,但是低版本浏览器有可能不支持此方法,所以还要想办法兼容,这就用到了`@babel/polyfill`工具.([官网](https://babeljs.io/docs/en/babel-polyfill))

使用方法可以在`index.js`头部引入`require("@babel/polyfill")`,也可以修改项目入口的配置`entry: ["@babel/polyfill", "./src/index.js"]`.

## eslint

可以先去[eslint官网](https://eslint.org/)转一转,下载`.eslintrc.json`文件放到根目录下:

下载插件:

```shell
npm i eslint eslint-loader -D
```

配置rules:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "eslint-loader",
          options: {
            enforce: "pre"
          }
        }
      },
    ]
  }
}
```

作为代码检测,应该是最优先执行的,可以加上`enforce(实施,强制)`,属性为`pre(previous 以前的)`,意为所有的loader中最先执行.

也可以是`post`,意为最后执行.

## 全局变量的引用

假如安装个jquery,`npm i jquery`.然后在`index.js`中去使用他.

```js
import $ from 'jquery'

console.log($);
```

这样是没问题的,但是如果我想让这个$作为全局变量,也就是挂载到window上怎么处理呢?  

需要`expose-loader`来暴露方法:

```shell
npm i expose-loader -D
```

[webpack官网的expose-loader文档](https://webpack.docschina.org/loaders/expose-loader/#root)

```js
import $ from "expose-loader?exposes=$,jQuery!jquery";

console.log($);
console.log(window.$);
console.log(window.jQuery)
```

这三个log输出的是一样的内容,这是内联loader的用法.当然,正常用法是config配置的:

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        }
      }
    ]
  }
}
```

尝试下输出:

```js
console.log($) // eslint-disable-line
console.log(window.$) // eslint-disable-line
```
发现`$`是正常输出的,`window.$`输出的是 undifend.这是因为`expose-loader`为我们每一个模块注入一个变量,而每个模块被打包后其实是个闭包变量.并不是挂在window上的.

如果想挂载到window上,就要用到`webpack`插件上的功能:
```js
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery"
    })
  ]
}
```

> 此时就可以不用`expose-loader`了.

## externals 外部扩展

如果为了加载迅速,在`index.html`中用CDN形式引入了全局的JQ:

```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
```

那么`console.log(window.$)`和`console.log($)`都是没问题的,不过如果假如我因为代码洁癖,一定要引入`import $ from 'jquery'`的话,打包时会把jq打包进去,体积会变大,而html的CDN资源也会加载,导致浪费.

这种情况下可以使用`externals`参数,告诉webpack哪些资源不要打包:

```js
module.exports = {
  externals: {
    jquery: "$"
  }
}
```

[externals的文档](https://webpack.docschina.org/configuration/externals/)
