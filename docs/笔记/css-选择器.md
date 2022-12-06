---
title: css选择器
tags: 选择器
book: 笔记本
---

## :is() 包含

假如有一个 css 是这么写的:

```css
ul li {
  color: #000;
}
ol li {
  color: #000;
}
```
如果用预处理器写会好一点:

```less
ul, ol {
  li {
    color: #000;
  }
}
```
用 `:is()` 改造是这样的:

```css
:is(ul, ol) li{
  color: #000;
}
```
**值得注意的是优先级问题**  
如果ul元素有个class,叫做ul,那么当 `:is(ul, .ul)` 时,优先级以优先级高的class选择器为准的.

## :where() 和is相似,包含

用法和`:is()`一样,不同的是,用 `where` 伪类产生的样式,优先级是0.

## :not() 排除

假如有个 `ul` 元素是这样的:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li class="active">3</li>
  <li>4</li>
</ul>
```
我想给没有class的li添加样式,除了3都是红色:

```css
li:not(.active) {
  color: red;
}
```
`not` 还可以选择 `:hover`,假如当一个li被hover的时候是蓝色,其他的没有被hover的是是红色,就可以这么写:

```css
li:hover {
  color: blue;
}
li:not(:hover) {
  color: red;
}
```

## :nth-child 相关的一系列选择器

以 `first-child` 为例解释下选择规则:

```css
.test span:first-child {
  color: red;
}
```
以上元素满足2个规则样式即生效,即 此元素满足 **.test 下的 span**,并且在 **.test 父元素下是第一个属性**.

很明显,此选择器也可以配合`is`,`not`等选择器使用.

* nth-child(3) 表示选择列表中的第三个元素。
* nth-child(2n)表示列表中的偶数标签，即选择第2、第4、第6……标签
* nth-child(2n-1) 表示选择列表中的奇数标签，即选择 第1、第3、第5、第7……标签
* nth-child(n+3) 表示选择列表中的标签从第3个开始到最后（>=3）
* nth-child(-n+3) 表示选择列表中的标签从0到3，即小于3的标签(<=3)
* nth-last-child(3) 表示选择列表中的倒数第3个标签
* last-child 最后一个标签

## :nth-of-type(n) 元素类型选择

```css
p:nth-of-type(2) {
  color: red;
}
```
与`nth-child`不同的是,假如此元素父级下有很多个不同类型的元素,找的规则是**所有p标签里第二个**.

注意,前面只能跟类选择器,class/id 什么的都不行.

## + 相邻兄弟选择器

```css
h2+p {
  color: red;
}
```
选择一个p标签,他的同级标签的前面是h2标签.

如果有个结构是ul下有5个li,样式如下:

```css
li+li {
  color: red;
}
```
除了第一个li,其余的都变红.

## ~ 兄弟匹配器

```css
h2~p {}
```
规则是,只要这个p标签的前面有h2,就会受到作用.注意中间有其他的标签乱入也不影响效果.

## [] 属性选择器

```css
[title] {}
```
标签上带 title 属性的即被选中.
```css
[title=test] {}
```
还可以根据值还筛选.