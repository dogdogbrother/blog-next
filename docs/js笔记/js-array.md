---
title: js基础语法-数组
tags: js基础语法 array
book: js笔记本
---
## concat() 连接两个数组

连接两个或更多的数组，并返回结果

该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本

```js
const newArray = arrayObject.concat(arrayX,arrayX,......,arrayX)
```
|参数|说明|
|--|:--:|
|arrayX|必需。该参数可以是具体的值，也可以是数组对象。可以是任意多个。|

## join() 数组变成字符串

把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。

## pop() 尾部添加元素

方法用于删除并返回数组的最后一个元素。

## reverse() 翻转数组

用于颠倒数组中元素的顺序。

该方法会改变原来的数组，而不会创建新的数组。

## shift() 删除并返回头元素

shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值.

## unshift() 添加头元素

向数组的开头添加一个或更多元素，并返回新的长度。

## slice() 选择返回指定位置的元素

从某个已有的数组返回选定的元素.

```js
arrayObject.slice(start,end)
```
参数|说明|
--|:--:|
start|必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。|
end|可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。|

返回一个新的数组，包含从 `start` 到 `end` （不包括该元素）的 `arrayObject` 中的元素。

您可使用负值从数组的尾部选取元素,如果 end 未被规定，那么 `slice()` 方法会选取从 `start` 到数组结尾的所有元素.

## sort() 排序

方法用于对数组的元素进行排序。

```js
arrayObject.sort(sortby)
```
参数|说明
|--|:--:|
|sortby|可选。规定排序顺序。必须是函数。|

请注意，数组在原数组上进行排序，不生成副本。

```js
[1,3,4].sort((a,b) => {
  return a - b
})
// 结果为 [1, 3, 4]
```
如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序，说得更精确点，是按照字符编码的顺序进行排序.

## splice() 删除或删除,并返回

向/从数组中添加/删除项目，然后返回被删除的项目。

**该方法会改变原始数组。**

```js
arrayObject.splice(index,howmany,item1,.....,itemX)
```
参数|说明
|--|:--:|
|index|必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。|
|howmany|必需。要删除的项目数量。如果设置为 0，则不会删除项目。|
|item1, ..., itemX|可选。向数组添加的新项目。|

返回值是一个`Array`,包含被删除项目的新数组，如果有的话。
>请注意，splice() 方法与 slice() 方法的作用是不同的，splice() 方法会直接对数组进行修改。

## toString() 数组变成字符串

可把数组转换为字符串，并返回结果.等同于没有参数的 `join()` 方法.

数组中的元素之间用逗号分隔。
***
>**ES5的数组方法**

## indexOf() 查找数组中是否有此值

```js
array.indexOf(searchElement[, fromIndex])
```
参数|说明
|--|:--:|
|isearchElementndex|必需。需要查找的内容。|
|fromIndex|可选，表示从这个位置开始搜索，若缺省或格式不合要求，使用默认值0|


## lastIndexOf() 反向查找

和`indexOf()`完全一致,只是从字符串的末尾开始查找，而不是从开头。

`fromIndex`的默认值是`array.length - 1`。


## every() 每一项都满足返回true

判断数组中每一项都是否满足所给条件，当所有项都满足条件，才会返回true。

```js
array.every(callback,[ thisObject]);
```

## some() 一项满足即返回true

判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true。

```js
array.some(callback,[ thisObject]);
```

## reduce() 数组累加器

相当于一个累加器的概念,通过遍历数组，获取上一个值与当前值，通过回调函数处理，返回一个新值。而该值将会当做下一次执行的prev返回。

```js
arr.reduce(function(prev,cur,index,originArray){
	...
},initValue)
```
参数|说明
|--|:--:|
|prev|必需。指上一次传入的返回值。|
|cur|必需，指当前对应下标传入的值.|
|index|选填，当前数组下标.|
|originArray|选填，原始数组.|
|initValue |选填，指首次传入的初始值.|
这个API不是很常见,但是挺灵活强大的,我用几个示例来说明用法.
1. 实现一个累加器

```js
const arr = [1, 2, 3, 4, 5]
// 累加器
let sum = arr.reduce((prev, cur) => {
  return prev + cur
}, 0)
// sum 15
```
2. 实现一个获取数组最大值的方法

```js
const arr = [1, 9, 3, 4, 5]
// 数组求最大值
let max = arr.reduce((prev, cur) => {
  return Math.max(prev, cur)
}, [])
// max 9
```
3. 合并二维数组

```js
const arr = [[1, 9], [3, 4], 5]
// 数组合并
let merge = arr.reduce((prev, cur) => {
  return prev.concat(cur)
}, [])
// merge [1,9,3,4,5]
```
4. 统计重复字符出现次数

```js
const string = 'aabbbccddd'
let arr = string.split('')
// 统计字符出现重复次数
let merge = arr.reduce((obj, key) => {
  if (key in obj) {
    obj[key]++
  } else {
    obj[key] = 1
  }
  return obj
}, {})
// merge {a: 2, b: 3, c: 2, d: 3}
```
5. 解析URL参数

```js
// 获取参数字符串
let search = location.search
if (search.indexOf('?') > -1) {
  // 截断
  search = search.slice(search.indexOf('?') + 1)
  // 拆分
  search = search.split('&').reduce((prev, cur) => {
    let key = cur.split('=')[0]
    let val = cur.split('=')[1]
    // 拼接
    prev[key] = val
    return prev
  }, {})
  console.log('search', search)
}
```

## reduceRight() 数组反向累加器

顾名思义,和`reduce()`是一样的,只是从尾部开始执行.

## isArray() 是否为数组

```js
var a = [1,2,3];
Array.isArray(a);   //true
```
***
>**ES6的数组方法**

## Array.from() 把对象变成数组

用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```
Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```js
Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```

## Array.of() 把值变成数组

用于将一组值，转换为数组.

```js
Array.of(3, 11, 8) // [3,11,8]
```

## copyWithin() 交换位置

```js
array.copyWithin(target, start = 0, end = this.length);
```
参数|说明
|--|:--:|
|target|必需。从该位置开始替换数据。如果为负值，表示倒数。|
|start|可选，从该位置开始读取数据，默认为 0。如果为负值，表示倒数.|
|end|可选，到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数.|

```js
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]
```

## fill() 替换某个元素

用于将一个固定值替换数组的元素。

```js
array.fill(value, start, end)
```
参数|说明
|--|:--:|
|value|必需。填充的值。|
|start|可选，开始填充位置.|
|end|可选，停止填充位置 (默认为 array.length).|

```js
// 填充 "Runoob" 到数组的最后两个元素：
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.fill("Runoob", 2, 4);
// 输出结果 Banana,Orange,Runoob,Runoob
```
## includes() 判断是否包含某个值
用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。

```js
arr.includes(searchElement, fromIndex)
```
参数|说明
|--|:--:|
|searchElement|必需。需要查找的元素值。|
|start|可选，从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0.|

```js
var arr = ['a', 'b', 'c'];
 
arr.includes('c', 3);   //false 如果是 2 的话就是true
```
>这个地方我原来一直用错了,我一直以为includes的参数是回调函数..

## entries()，keys() 和 values()
用来遍历数组。它们都返回一个遍历器对象，可以用`for...of`循环进行遍历，唯一的区别是`keys()`是对数组的键名的遍历、`values()`是对数组键值的遍历，`entries()`方法是对数值的键值对的遍历。

```js
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
entries.next()  // {value: [0, 'a'], done: false}
entries.next().value; // [1, 'b']
entries.next().value; // [2, 'c']
```
## flat 扁平化数组
```js
[1, 2, [3, 4, [5, 6]]].flat(1)
// 输出[1, 2, 3, 4, [5, 6]]
```
参数是`Number`,表示需要扁平化的层级数,如果不知道有多少层,可以用`Infinity`: `flat(Infinity)`.

## flatMap 返回扁平化数组

回调函数返回的如果是个数组,会被`flat(1)`包装下返回.

```js
[[1], [2], [3]].flatMap(item => item)
// [1, 2, 3]
```
从需求上看,似乎应该用`map(item => ...item)`实现,但是如果 item 并不是数组,那么`...`扩展运算就会报错.而`flatMap`只会处理数组,其他数据类型不处理,包括对象.