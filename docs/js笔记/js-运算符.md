---
title: js基础语法-运算符
tags: js基础语法 运算符
book: js笔记本
---
## 取余 %

```js
7%4 // 3
10%1 // 0
```

## 逗号 ,
连续运算并返回最后的值

```js
var a = (b = 1, c = 2)
console.log(a)  // 2
```

## 空值合并运算符 ??
当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。

```js
const foo = null ?? 'default string';
console.log(foo) "default string"
```
例子看起来好像和 `||` 功能是一样的,但是排除了`0`和`""`,在一些`0`和`""`是有效值的情况下用挺好的.
