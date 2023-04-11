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

## Partial

`Partial<T>` 的作用就是将某个类型里的属性全部变成可选，该方法是联合了 `keyof` 和 `in` 实现的。

```ts

interface User {
  name:string,
  age:number,
  department:string
}
type optional = Partial<User>
/**type optional = {
    name?: string | undefined;
    age?: number | undefined;
    department?: string | undefined;
}**/

// 实现原理
type Partial<T> = {
    [P in keyof T]?: T[P];   
};
```

## Required

`Required<T>` 的作用就是将某个类型中的属性全部变为必选，具体实现和 `Partial` 类似.

```ts
// 实现
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

## Readonly

`Readonly<T>` 的作用是将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋值。

```ts
// 实现
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

## Record

以 `typeof` 格式快速创建一个类型，此类型包含一组指定的属性且都是必填.

```ts
type Coord = Record<'x' | 'y', number>;

// 等同于
type Coord = {
	x: number;
	y: number;
}
```

`Record`的实现原理是这样的:

```ts
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

首先要先理解`keyof any`是啥:

```ts
type KEY =  keyof any //即 string | number | symbol
```

因为不管什么类型，它的`key`总是`string`，`number`，`symbol`中的一种。

```ts
let a: any;
a['a'] //ok
a[0] // ok
a[Symbol()] //ok
a[{}] // error
```

最后,`[P in K]`的意思是对象的`key`可以取`string`，`number`，`symbol`.

## Pick

`Pick`的作用是将某个类型的子属性拿出来当个新类型.

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
​
type TodoPreview = Pick<Todo, "title" | "completed">;
​
const todo: TodoPreview = {
  title: "Clean room",
  completed: false
};

// 实现原理
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

## Exclude

`Exclude<T,U>`的作用是将某个类型中属于另一个的类型移除掉.

```ts
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

源码实现:

```ts
type Exclude<T, U> = T extends U ? never : T;
```

如果这个源码看不明白是啥意思的话,可以去看另一篇[讲extends的文章]().

大体来说,就是把左侧的联合类型`in`了下,反向`filter`,把符合的`key`剔除掉.
