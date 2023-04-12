---
title: js文档注释
book: js笔记本
---

## 常规注释

先写一个带有文档注释的函数:

```js
/**
 * 函数防抖
 * @description 这是防抖函数的描述信息
 * @author 森林 <gougewh@sina.com>
 * @param {Function} func 目标函数
 * @param {number} [duration] 延迟执行时间,默认1秒
 * @return {Function} 防抖的函数
 * @example
 * debounce(()=> {}, 100)
 */ 
function debounce(func, duration = 1000) {}

debounce()
```

这样的文档有几个好处:
1. 在调用此函数时,鼠标移上去,注释内容会以文档形式展示.
![js-doc1](/docImg/js-doc1.png)
2. author下用分号`<>`的邮箱,可以点击发送邮件.
3. 声明了参数类型为`Function`或其他类型后,在函数内部使用形参时,有会对应的类型方法提示.
![js-doc2](/docImg/js-doc2.png)
4. 对于选填参数可以用中括号`[]`包裹.
5. 实例代码可以有多行,在提示时,都是有正常代码高亮的.

## 参数为对象的注释

```js
/**
 * 网络请求
 * @param {object} options 配置对象
 * @param {string} options.url 请求地址
 * @param {'GET' | 'POST'} options.method 请求地址
 * @param {object} options.headers 请求头部
 * @param {string} options.headers.token 请求头部中携带token
 */ 
function request(options) {}

request()
```

效果如下:

![js-doc3](/docImg/js-doc3.png)


