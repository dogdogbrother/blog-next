---
title: react晋级hook
tags: react hook
book: react
---
## useLayoutEffect

绝大数情况下,`useEffect` 都是可以实现需求的,什么情况下要用到 `useLayoutEffect` 呢?看个例子:

```js
import { useState, useEffect } from "react"
export default () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (count === 0) {
      setCount(10 + Math.random()*200)
    }
  }, [count])
  return (
    <div onClick={() => setCount(0)}>{count}</div>
  )
}
```

每次点击时,屏幕中的 `count` 会显示为0,然后再显示随机数,跳了一下.  
可以发现`useEffect`并不会堵塞页面渲染,先渲染成0,又执行了内部代码,再次渲染成新内容.  

如果此时用的是 `useLayoutEffect`,就不会有闪烁的现象,`useLayoutEffect`会把自己内部的逻辑走完在渲染.

## useImperativeHandle

> `Imperative` 是必要的意思,`ImperativeHandle` 必要的方法.

此 hook 是要和 `ref` 和 `forwardRef` 配合使用的([看前面useRef的介绍](/front/react/react基础.md#useref)),作用就是让父组件用 `ref.方法` 的方式去调用子组件的内部方法.

> 如果熟悉`vue`或者`react的class`开发,对这种调用方法应该很熟悉.

```js
import { forwardRef, useImperativeHandle } from 'react'
export default forwardRef(function Child(props, ref) {
  function fn() {
    // ...
  }
  useImperativeHandle(ref, () => ({
    fn: () => fn(),
  }))
})
```

这样父级就可使用`childRef.current.fn()`来操作子组件内部的逻辑.

```js
import { useRef } from "react"
export default () => {
  const childRef = useRef(url)
  return <Child ref={childRef} />
}
```

## useMemo

`useMemo` 是种优化手段,通过缓存手段减少一些不必要的渲染开销,有2个参数,为函数和依赖项数组.

要通过三个例子来讲解`useMemo`的使用.

#### 未使用`useMemo`

```js
import { useState } from "react"
export default () => {
  const [count, setCount] = useState(0);
  function getTotal() {
    return count * 2
  }
  const info = getTotal()
  return <></>
}
```

这个组件每次视图更新都会执行`getTotal`函数,然而我们根本就没有改变过`count`,`getTotal`函数中的计算是在多余的重复执行.

#### `useMemo`实现缓存优化

```js
import { useState, useMemo } from "react"
export default () => {
  const [count, setCount] = useState(0);
  const info = useMemo(
    () => count * 2,
    [count]
  )
  return <></>
}
```

这个组件中,只要 `count` 值没有变化,`count * 2`的运算就不会第二次运行.

#### `useMemo`实现组件减少渲染

```js
import { useState, useMemo } from "react"
import Child from './child'

export default () => {
  const [count, setCount] = useState(0);

  const memoCount = useMemo(
    () => <Child count={count}/>,
    [count]
  )

  return <>
    {memoCount}
  </>
}
```

用 `useMemo` 包裹组件,只有当 `count` 更新时,此组件才会二次渲染.

## useCallback

和 `useMemo` 用法很像,等于 `useMemo` 第一个参数里面返回一个新函数.

举个例子,假如有如下的代码:

```js
import Child from './Child'
export default () => {

  function getTotal() {
    setCount(val => val * 1)
  }

  return <>
    <Child myClick={getTotal}/>
  </>
}
```

当此组件有其他内容的改变导致视图更新时,`Child`组件内容也会渲染一遍,如何避免这种浪费呢?

可以给子组件 `Child` 包裹一层`React.memo`,在 **prop** 没有改变时不会重新渲染.

但是关键在于,`getTotal`是一个函数,每次组件视图刷新,`getTotal`都是一个新函数,会导致子组件刷新,所以要用 `useCallback` 把函数缓存住,每次视图更新保证子组件的 **prop** 是不变的.

```js
import { useState, useCallback } from "react"
import Child from './Child.js'

export default () => {
  const [count, setCount] = useState(0);

  const getTotal = useCallback(() => {
    setCount(val => val + 1)
  }, [])

  return <>
    <div>{count}</div>
    <Child myClick={getTotal}/>
  </>
}
```

```js
// Child.js
import { memo } from 'react';

const Child = ({myClick}) => {
  return (
    <div onClick={myClick}>点我测试</div>
  );
};

export default memo(Child);
```

每次子组件触发 `myClick` **prop事件**时,会更新页面的`count`显示,但是`Child`组件却不会二次渲染.

**tip 提示**
`useCallback` 要和 `React.memo` 配合使用才能做到性能优化.

## useReducer

`useReducer` 是 `useState` 语法糖,是使用观感上,也是**加强版**的 `useState`,直接看个例子就明白了:

```js
import { useReducer } from 'react'
export default function() {
  const [counter, dispatch] = useReducer((state, action) => {
    if(action === "add") {
      return state += 3
    } 
  }, 0)
  return <>
    <span>{counter}</span>
    <span onClick={() => dispatch("add")}>点我加3</span>
  </>
}
```

相比较 `useState`,`useReducer` 多了个函数参数,把数据相应的逻辑在内部实现了.