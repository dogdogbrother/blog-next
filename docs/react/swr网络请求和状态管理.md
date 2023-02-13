---
title: swr网络请求和状态管理
tags: swr react
book: react
---

[swr](https://swr.vercel.app/)把状态管理和ajax网络请求结合起来的库,类似的还有`query-react`(功能差不多).

> 可以down下[本文示例代码](https://github.com/dogdogbrother/lean-code/tree/master/swr-demo),本地跑一跑更容易理解.

## swr解决了什么痛点

假如我们有个需求,远程获取`count`值,并且提供个`post`请求更新`count`值.

在常规`react`项目中,我们需要哪些准备呢?

1. `useEffect`来开启初始化请求.
2. `loading`的state,来标识加载中.
3. `AddLoading`的state,来标识提交加载.
4. `count`的state,保存请求来的数据.

代码如下:

```jsx
import { getCount, addCount } from './api'
import { useEffect, useState } from 'react'

function App() {
  const [loading, setLoading] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  const [count, setcount] = useState(0)
  function getData() {
    setLoading(true)
    getCount().then(res => {
      setcount(res)
    }).finally(() => setLoading(false))
  }
  useEffect(() => {
    getData()
  }, [])
  function onAdd() {
    setAddLoading(true)
    addCount().then(() => getData()).finally(() => setAddLoading(false))
  }
  return (
    <div>
      {
        loading ? <p>加载中loading</p> : <p>{ count }</p>
      }
      <button onClick={onAdd}>{ addLoading ? '正常提交计算loading' : '点击+1'}</button>
    </div>
  )
}
```

## 用swr改造下代码

```jsx
import useSWR from 'swr'
import { getCount, addCount } from './api'

function SwrApp() {
  const { data: count, isLoading, mutate } = useSWR('getCount', getCount)
  async function onAdd() {
    await mutate(addCount, { optimisticData: count + 1, populateCache: true })
  }
  return (
    <div>
      {
        isLoading ? <p>加载中loading</p> : <p>{ count }</p>
      }
      <button onClick={onAdd}>{'点击+1'}</button>
    </div>
  )
}
```

`swr`帮我们把`useEffect`/`useState`/`loading`逻辑封装在`hook`中,并且提供`mutate`方法,让我们去发送`post`请求,并且会自动请求`get`获取最新值.

## 关于乐观更新

`swr`示例中,并没有`addLoading`相关的逻辑,是因为`swr`提供了乐观更新的功能.

> 所谓**乐观更新**,就是当我们发送post后,不需要验证后端是否操作成功,而是直接更新视图,带来更丝滑的用户体验.


`mutate`方法第二个参数`optimisticData`就是手动设置更新后的值,给用户一种点击了立马就ok了的感觉,从而不需要提供新的`loading`表示`网络还在请求中...`.

## swr其他的一些功能

大概列举下个人认为使用频率较高的一些特性:
1. **有序请求**:假如我们快速切换`tab`并且每一次切换都发送`get`请求,`swr`内部会处理逻辑,不会因为请求异步的原因导致`tab`内容显示错误.
2. **防止间隔极低的错误多余请求**:假如页面有2个组件,都使用了`useSWR`请求同一个接口,因为第一个参数`key`相同,`swr`会只发送第一次的网络请求,第二次的请求会通过缓存拿到,从而节省一次多余的网络请求. 
3. **`key`值依赖**:当`useSWR`第一个参数`key`带有`state`并变化时,触发请求.这个有什么用呢,举2个官网提供的例子:

```jsx
// 依赖请求,只有当网络请求回来user信息时,才会走下一个请求.
const { data: user } = useSWR('/api/user')
const { data: projects } = useSWR(() => '/api/projects?uid=' + user.id)
```

```jsx
// 分页,执行setPageIndex就会触发请求
const [pageIndex, setPageIndex] = useState(0);
const { data } = useSWR(`/api/data?page=${pageIndex}`, fetcher);
```

4. 提前加载数据,`swr`提供了`preload`方法,可以在任何地方执行`preload('api/user', fetcher)`,之后当我们第一次使用`swr`请求`api/user`接口时,不会走网络请求,而是拿到缓存的,从而达到急速显示的体验.

其他的一些功能,可以去[swr官网](https://swr.vercel.app/)看下.

## 总结

整体感觉`swr`并不难上手,难度不高.可以让代码简洁,并且对数据请求功能进行了加强,非常实用啊~
