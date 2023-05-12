---
title: js基础语法-数字
tags: js基础语法 object
book: js笔记本
---

## toString()
以字符串返回数值.

```js
(123).toString(); // '123'
```
## toFixed()

返回字符串值，它包含了指定位数小数的数字

```js
var x = 9.656;
x.toFixed(0); // '10'
```

## toPrecision()

返回字符串值，它包含了指定长度的数字

```js
var x = 9.656;
x.toPrecision(2); // '9.7'
```

## parseFloat()/parseInt()

解析一段字符串并返回数值。允许空格。只返回首个数字.

`parseFloat()`返回浮点数,`parseInt()`返回整数.

```js
parseFloat("10.33");     // 返回 10.33
parseFloat("10 years");  // 返回 10
parseFloat("years 10");  // 返回 NaN

parseInt("10.33");      // 返回 10
```

## Math常用方法

|方法|说明|方法示例
|--|--||--|
|`ceil()`|向上取整,有小数就整数部分加1|Math.ceil(2.1)-->3|
|`floor()`|向下取整|Math.floor(5.7)-->5|
|`round()`|四舍五入|Math.round(5.3)-->5|
|`abs()`|返回数的绝对值|Math.abs(-1)-->1|
|`random()`|返回 0 ~ 1 之间的随机数|Math.random()-->0~1|
|`max(x,y)`|返回 x 和 y 中的最大值|Math.max(1,2)-->2|
|`min(x,y)`|向上取整,有小数就整数部分加1|Math.min(1,2,3,4)-->1|
