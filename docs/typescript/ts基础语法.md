---
title: typescript基础语法
tags: typescript
book: typescript
---

## 数组

可以用方法定义数组:

```ts
let list: number[] = [1, 2, 3]
let list: Array<number> = [1, 2, 3] // 数组泛型
```

## 元祖

元祖和数组不一样的地方在于:
* 长度是固定的
* 内容类型不必相同

```ts
let x: [string, number]
x = ['hello', 10] // OK
x = [10, 'hello'] // Error
```

## 枚举

提供了索引和值的双向查询

```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green
console.log(c);  // 1
```
用索引查询:

```ts
enum Color {Red, Green, Blue}
let c = Color[1]
console.log(c);  // Green
```
默认情况下，从 0 开始为元素编号,也可以手动的指定成员的数值.

```ts
enum Color {Red = 1, Green = 3, Blue} // Blue其实就是4了
```

## void

`void`表示没有任何类型,可以被赋值为 `null` 和 `undefined`.
当一个函数没有返回值时,默认返回的是`undefined`,就用`void`表示:

```ts
function warnUser(): void {
  console.log('This is my warning message')
}
```

## never

`never`是更加严格的`void`,当一个函数连`undefined`都不返回时,就用`void`代替,例如死循环或者报错的函数:

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed")
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}
```

## 类型断言

当ts判断不出来你传入的类型是什么的时候,可以手动指定类型

```ts
function getLength(param: string | number) {
  console.log(param.length);  // error 类型“number”上不存在属性“length”
  console.log((param as string).length)  // ok
  console.log((<string>param).length)  // 另一种写法 jsx中不支持
}
```

## 接口

1. 可以用来约束对象:

```ts
interface Animal {
  cat: string
  dog?: string  // ? 代表是可选参数
  readonly bird: string // 只读属性 不能被修改
  [propName: string]: any  // 还可以只宽泛的约束key的类型
  [otherPropName: string]: any  // 还可以混合索引
}
```

2. 还可以用来约束函数:

```ts
interface SearchFunc {
  (source: string, subString: string): boolean
}
let search: SearchFunc = function(s1, s2) {
  return s1 === s2
}
search('我看看', '是不是一样')
```

3. 接口可以继承:

```ts
interface man extends Biology {
  // ...
}
// 也可以继承多个
interface man extends Biology, Person {
  // ...
}
```

## 模板字符串类型

先看一个最简单的使用例子：

```ts
type World = 'World';

// "Hello World"
type Greeting = `Hello ${World}`;
```

也可以传入泛型:

```ts
type Greet<T extends string | number | boolean> = `Hello ${T}`;

type Greet1 = Greet<"linbudu">; // "Hello linbudu"
type Greet2 = Greet<599>; // "Hello 599"
type Greet3 = Greet<true>; // "Hello true"
```

在需要声明大量存在关联的字符串字面量类型时，模板字符串类型也能在减少代码的同时获得更好的类型保障.

```ts
type SKU =
  | 'iphone-16G-official'
  | 'xiaomi-16G-official'
  | 'honor-16G-official'
  | 'iphone-16G-second-hand'
  | 'xiaomi-16G-second-hand'
  | 'honor-16G-second-hand'
  | 'iphone-64G-official'
  | 'xiaomi-64G-official'
  | 'honor-64G-official'
  | 'iphone-64G-second-hand'
  | 'xiaomi-64G-second-hand'
  | 'honor-64G-second-hand';
```

优化后:

```ts
type Brand = 'iphone' | 'xiaomi' | 'honor';
type Memory = '16G' | '64G';
type ItemType = 'official' | 'second-hand';

type SKU = `${Brand}-${Memory}-${ItemType}`;
```