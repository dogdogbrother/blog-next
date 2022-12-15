---
title: koa开发之环境搭建
tags: koa node 后端
book: koa
---
## 插件和基本使用

先把最基础需要的插件都安装上:

```sh
npm i koa --save
npm i nodemon --save-dev
npm i koa-router --save
npm i koa-bodyparser --save
npm i koa-json-error --save
npm i cross-env --save-dev
npm i koa-parameter --save
npm i sequelize  // mysql
npm i mongoose  // mongoDB
```

### koa

非常极简的一个服务器,进入`locahost:3000`就能看到输出:

```js
const Koa = require('koa')
const app = new Koa()
app.use((ctx)=>{
  ctx.body = 'hello word'
})
app.listen(3000)
```

### nodemon

监听本地文件的变化,自动重启服务.修改`package.josn`文件的`scripts`脚本,用**nodemon**启动项目:

```json
"start": "nodemon index.js"
```

### koa-router 路由

基本使用:

```js
const Router = require('koa-router')
const router = new Router()
router.get('/users/:id',(ctx)=>{
  // 操作 ctx 就行了 ctx.params.id 就是传进来的id
})
app.use(router.routes())
```

`koa-router`有一个比较常用的功能,**`路由前缀`**,可以更好的规划模块.

```js
const usersRouter = new Router({prefix:'/users'})
usersRouter.get('/:id',(ctx)=>{})
app.use(usersRouter.routes())
```

#### options请求和allowedMethods

`koa-router`还封装了处理`options`请求的方法`allowedMethods`.

假如我们对一个没做`options`方法的接口使用`options`请求,会404.

如果用了`allowedMethods`,返回内容中则会在 `Allow` 字段中列出 `OPTIONS,GET,HEAD,POST` 等允许方法.

```js
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const usersRouter = new Router({prefix:'/users'})

app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())
```
> 需要注意的是,要`use`三次才能把三个功能都注册上.

#### 405和501状态码

405和501状态码是`allowedMethods`封装好的,这两个的意思其实都是未实现的,但是还是有区别的.

假如`http://example.org`接口只有 **GET** 和 **POST** 请求,当你用 **DELETE** 去请求的时候,理论上应该是 404,但是`allowedMethods`帮你很机智的返回了 **405**,意思是 **DELETE** 的功能我们还没有写,暂时实现不了你想要的功能.

但是如果你用 **LINK** 方法去请求,就会返回 501.因为`koa2`只能实现一些常规的method,不支持 **LINK** 方法,无法显示.

所以405和501的区别就是一个是我还没写,一个是我写不了.

### koa-bodyparser 请求体

用户请求接口携带的参数很容易就能获取到,例如`ctx.query`/`ctx.header`/`ctx.params`.

但是,拿不到post的请求体,这是因为`koa2`就不支持接收请求体,一定要安装中间件才行.

```js
const bodyparser = require('koa-bodyparser')
app.use(bodyparser())
```

使用 `ctx.request.body` 就能拿到数据对象了.

> 注意,最好是在尽量前面的位置去使用`bodyparser`

### koa-json-error 错误格式返回

在http请求错误时,除了**404**/**500**等状态码的返回,还会附带JSON格式的相关数据,便于快速的错误定位.

```js
const error = require("koa-json-error")
app.use(error())
```

#### 错误堆栈 stack

举个服务器代码错误导致的500的返回信息:

```json
{
    "name": "ReferenceError",
    "message": "a is not defined",
    "stack": "ReferenceError: a is not defined\n at find(D:\\code\\zhihu\\app..)",
    "status": 500
}
```
**stack** 字段会把具体的报错信息都返回给客户端,这样虽然便于调试,但是不安全(把目录信息都暴露了),所以线上环境是一定要禁止返回 **stack** 字段的.

用自带的API参数配置和**环境变量**相互配合即可实现:

```js
app.use(error({
  postFormat: (e, {stack, ...rest})=> process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}))
```
利用解构语法剔除掉 `stack` 字段.

### cross-env 环境变量

因为mac和window的环境变量的设置方法是不一样的,所以需要个 `cross-env` 插件做兼容处理.

```json
{
  "dev": "cross-env NODE_ENV=dev nodemon app.js",
}
```

### koa-parameter 参数校验

```js
const parameter = require('koa-parameter')
app.use(parameter(app))
```

**2个注意点**
1. 因为parameter是对参数体进行校验,所以在注册的时候最好放在bodyparser注册下面.  
2. parameter有个参数是app,这个其实是因为提供了一些全局方法,用来需要修改程序的全局实例.

```js
 ctx.verifyParams({
    name: { type: 'string', required: true },
    age: { type: 'number', required: false }
})
```
如果你传参格式有误的话,就会报**422**错误,并且会有非常详细的JSON格式的报错信息.

---

## 目录分层

开发目录要分层级,结构优化,让项目代码更清晰,写个伪需求,用户的注册登录功能.

* **routes** 文件夹存放接口和中间件.
* **controllers** 文件夹作为对应的逻辑处理和响应.
* **models** 文件夹作为定义数据库mongodb/mysql的模型Schema(这里用mysql做示例).

### routes目录

有两个文件, `user.js`用于注册接口,`index.js`用于汇总所有其余的路由文件.

```js
// user.js
const { login, register } = require('../controllers/users')
const router = new Router()

router.post('/login',login)
router.post('/register',register)

module.exports = router
```

`index.js`整合文件用的是fs模块循环加载:

```js
// index.js
const fs = require('fs')

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return
    const route = require(`./${file}`)
    app.use(route.routes())
  })
}
```

### controllers目录

`controllers`暴露的方法和路由是对应的,写的是具体的业务逻辑:

```js
// controllers/users.js
const User = require('../models/users');

class UsersCtl {
    async login(ctx) {
      // ctx...
    }
    async register(ctx) {
      // ctx...
    }
}

module.exports = new UsersCtl()
```

### models目录

所有的数据库的读取操作,都是要通过 `Schema` 的实例操作的.

```js
// models/users.js
const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建表的名字user，数据库会默认变成 users
const User = seq.define('user', {
  // id 会自动创建，并设为主键，自增
  userName: {
    type: Sequelize.STRING, // 对应的是 varchar(255)
    allowNull: false // 是否允许为空
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nickName: {
    type: Sequelize.STRING,
    comment: '昵称' // 注释
  }
  // 会自动创建 createdAt 和 updateAt
})

module.exports = {
  User
}
```

### 数据库相关的配置文件

`models/users.js`中引入的`./seq.js`文件,用于登录数据库,内容如下:

```js
const Sequelize = require('sequelize')

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

const seq = new Sequelize('test', 'root', '数据库密码', conf)

seq.authenticate().then(() => {
  console.log('连接成功')
}).catch((err) => {
  console.log('连接失败',err)
})

module.exports = seq
```

`Schema`对应的就是数据库里面字段列的属性,定义好了,要和数据库同步的话,还需要个同步`sync.js`文件:

```js
const seq = require('./seq')

require('./model')

// 测试连接
seq.authenticate().then(() => {
  console.log('连接成功')
}).catch((err) => {
  console.log('连接失败',err)
})

// 执行同步
seq.sync({force: true}).then(() => {
  console.log('同步成功');
  process.exit()
})
```

执行`node ./src/sync.js`就可以了.