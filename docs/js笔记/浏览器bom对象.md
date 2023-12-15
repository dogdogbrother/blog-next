---
title: 浏览器bom对象
tags: 浏览器bom对象
book: 浏览器bom对象
---

## location对象

location对象是浏览器提供的原生对象，可以通过`window.location`或者`document.location`来拿到这个对象,提供以下属性：

* location.href 打印当前页面的url
* location.protocol 当前页面的协议，包括冒号
* location.host 主机名,如果默认端口号不是80或433，还会打印端口号
* location.hostname 主机名，不含端口号
* location.port 端口号
* location.pathname 路径
* location.search 查询字符串？后面的参数
* location.hash 片段字符串#开始的内容
* location.username 域名前面的用户名
* location.password 域名前面的密码
* location.origin 端口、协议、主机名 （三者一致代表同源）

`location.hash ='#id'`可以实现让网页跳转到锚点

### 方法

* `location.assign('https://baidu.com')`,页面跳转,和`location.href ='xxxxx'`功能一样.
* `location.replace("https://baidu.com")`,页面跳转,但是没有返回.
* `location.reload()`,重新加载当前网址，相当于按下浏览器的刷新按钮。接受布尔值,`true`的话,浏览器将向服务器重新请求这个网页，并且重新加载后，网页将滚动到头部(即scrollTop === 0).如果参数是false或为空，浏览器将从本地缓存重新加载该网页，并且重新加载后，网页的视口位置是重新加载前的位置。

## url解码

* `encodeURI`和`encodeURIcomponent`
* `decodeURI`和`decodeURIcomponent`



