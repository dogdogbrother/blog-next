---
title: typescript操作符
tags: typescript
book: typescript
---

## keyof

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