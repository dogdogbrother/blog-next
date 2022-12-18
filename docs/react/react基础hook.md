---
title: react基础hook
tags: react hook
book: react
---
## useState

```js
import { useState } from 'react'

export default function() {
  const [ number, setNumber] = useState(0)
  return(
    <button onClick={() => setNumber(number + 1)}>
      {number}
    </button>
  )
}
```

`useState` 返回一个数组,`[0]`位置为初始值,`[1]`位置是函数,用来更新`[0]`位的值.

**setNumber的参数**
`setNumber`也可以接收一个函数,函数参数为当前state值,函数返回值为更新值.所以也可以写成`setNumber(val => val + 1)`

## useEffect
**Effect**
Effect 是副作用的意思.

总结下 `useEffect` 功能:
* 每次组件初始化或者视图更新都会执行.

```js
useEffect(() => {
  document.title = `你点击了 ${number} 次`;
})
```

* 如果`useEffect`函数内部改变了变量值导致了视图更新,就会陷入无限循环的困境.事实上,`useEffect`也提供了第二个参数(数组)作为更新依赖.

```js
useEffect(() => {
  // ...
}, [])
```

当数组为空时,此`useEffect`只会在组件初始化时执行一次.当数组为`[number]`时,除了初始化执行一次,每当变量 `number` 变化时,就会触发一次 `useEffect` 函数的执行.

* 清除 Effect. 当`useEffect`函数内部注册了监听事件,而我们离开页面时需要移除此监听事件,就要用到 `useEffect` 的返回函数来移除.

```js
useEffect(() => {
  document.addEventListener('click', fn())
  return () => {
    document.removeEventListener('click', fn())
  }
}, [])
```

## useRef

主要功能有2个,一个是对dom元素的操作,一个跨生命周期保存某个值.

### 1. 操作dome

```js
import { useRef } from "react"

export default function() {
  const inputRef = useRef()
  return <input ref={inputRef} type="text" />
}
```

`inputRef.current.value` 就是 `input` 元素的值.

### forwardRef

如果有一个子组件,那么是不能用 `useRef` 去获取元素信息的,因为react-dom只有class类组件支持ref的调用.函数组件需要在导出的时候包裹一层`forwardRef`.

```js
import { forwardRef } from "react"

export default forwardRef(function() {
  return <>我是子组件</>
})
```

### 2. 跨生命周期值不变

组件里面有2种变量形式:
* `useState` 返回的,改成会影响视图更新.
* 用`var`,`const`,`let`创建的普通变量,更改不会引起更新,但是每次视图更新会重置此值.

```js
import { useState } from "react"
export default () => {
  const [count, setCount] = useState(0);
  let count2 =  0
}
```

所以当我想有一个变量,他改变的时候不会影响视图更新,并且不想因为被视图更新重置.就可以用 `useRef` 创建个跨生命周期的值.

```js
import { useRef } from "react"
export default () => {
  const ref = useRef(0)
  console.log("视图更新")  // 只会打印一次
  return (
    <>
      <span onClick={() => {
        console.log(ref.current);  // 每次都会打印最新值
        ref.current = ref.current + 1
      }}>开始计时</span>
      <span>{ref.current}</span>  {/*一直显示为0*/}
    </>
  );
}
```