---
title: typescript关键字
tags: typescript
book: typescript
---

## typeof

`typeof` 操作符可以用来获取一个**变量的声明**，或是**对象的类型**。

```ts
//例子1
interface People {
  name: string;
  age: number;
}
​
const variableDai: People = { name: 'coolFish', age: 24 };
type formDai= typeof variableDai; // -> People
​
//例子2
function toArray(x: number): Array<number> {
  return [x];
}
​
type Func = typeof toArray; // -> (x: number) => number[]
```

## keyof

`keyof`操作符可以用来一个对象中的所有`key`值, 返回的是这些`key`值的联合类型。

```ts
interface Person {
    name: string;
    age: number;
}
​
type allKey = keyof Person; // "name" | "age"
```

## in

`in` **用来遍历枚举类型**.

```ts
type Keys = "a" | "b" | "c"
​
type Obj =  {
  [p in Keys]: any
} 
//{ a: any, b: any, c: any }
```

## infer

**在条件类型语句中**，可以用i`nfer`声明一个类型变量，并且对它进行使用。

```ts
//返回数组的第一项
type Head<T extends Array<any>> =  T extends [head : infer H, ...rest : any[]] ? H : never;
​
// 测试用例
type H0 = Head<[]> // never
type H1 = Head<[1]> // 1
type H2 = Head<[3, 2]> // 3
```

## extends

`extends`最常见的是用在`interface`的继承上.

```ts
// 多重继承，逗号隔开
interface Prop extends Prop2, Prop3 {
  // ...
}
```

### 条件三元判断下的 extends

```ts
// 示例1
interface Animal {
  eat(): void
}

interface Dog extends Animal {
  bite(): void
}

// A的类型为string
type A = Dog extends Animal ? string : number

const a: A = 'this is string'
```

这里就是个三元,`Dog`包含了`Animal`的内容,所以为`true`.

### 联合类型下泛型的 extends

先看个代码示例:

```ts
type A1 = 'x' extends 'x' ? string : number; // string
type A2 = 'x' | 'y' extends 'x' ? string : number; // number

type P<T> = T extends 'x' ? string : number;
```

从这个示例上看,和上面的三元条件判断是没啥不同的,`P<'x'>`的类型是`string`,传入的其他类型的泛型则推断出为`number`.

但是,当我们泛型为联合类型的时候,返回的却是个联合类型.

```ts
type A3 = P<'x' | 'y'>  // A3的类型是 string | number
```

这是因为,`extends`遇到**联合类型泛型**,会触发**分配条件类型**规则.

**当传入该参数的是联合类型，则使用分配律计算最终的结果。分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。**

`'x' | 'y'`下的`x`返回`string`,`y`返回`number`,组合起来就是`string | number`.

> 真反直觉啊,就挺恶心的.

ts操作符`Exclude`的源码实现`type Exclude<T, U> = T extends U ? never : T;`就是利用这个特性,具体的可以看我[另一篇讲到Exclude的文章](https://freetoplay.netlify.app/typescript-path-ts%E6%93%8D%E4%BD%9C%E7%AC%A6)

## 不想被反直觉的分配条件支配的 extends

把联合类型用`[]`包裹起来就好了.

```ts
type P<T> = [T] extends ['x'] ? string : number;
type A1 = P<'x' | 'y'> // number
type A2 = P<never> // string
```