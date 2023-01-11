---
title: css-flex
tags: css flex
book: css笔记本
---
flex的属性容器上有6个,子项上也有6个

## flex-direction

**属性决定主轴的方向（即项目的排列方向）。**

它可能有4个值:

* row（默认值）：主轴为水平方向，起点在左端。
* row-reverse：主轴为水平方向，起点在右端。:::
* column：主轴为垂直方向，起点在上沿。
* column-reverse：主轴为垂直方向，起点在下沿。

## flex-wrap

**如果一条轴线排不下，定义如何换行**

* nowrap（默认）：不换行
* wrap：换行，第一行在上方。
* wrap-reverse：换行，第一行在下方

## flex-flow

**是`flex-direction`和`flex-wrap`的简写,默认值是`row nowrap`.**
```css
.box {
  flex-flow: row nowrap;
}
```
## justify-content

**属性定义了项目在主轴上的对齐方式。**

* flex-start（默认值）：左对齐
* flex-end：右对齐
* center： 居中
* space-between：两端对齐，项目之间的间隔都相等。
* space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

## align-items

**定义项目在交叉轴上如何对齐。**

* flex-start：交叉轴的起点对齐。
* flex-end：交叉轴的终点对齐。
* center：交叉轴的中点对齐。
* baseline: 项目的第一行文字的基线对齐。
* stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

![align-items](/docImg/align-items.png)

## align-content

**定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。**

* flex-start：与交叉轴的起点对齐。
* flex-end：与交叉轴的终点对齐。
* center：与交叉轴的中点对齐。
* space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
* space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
* stretch（默认值）：轴线占满整个交叉轴。

![align-content](/docImg/align-content.png)

align-items和align-content都是对轴线的控制.  
在子元素高度一致且固定的情况下,没有必要设置align-items.  
在父元素高度由子项高度撑开的情况下,没有必要设置align-content.

****

flex子项上的6个属性:

## order

**数值越小，排列越靠前，默认为0。**
此属性可以打破元素排列的位置,如果想让某个元素一直在第一个位置,就设置最小值即可.

## flex-grow

**定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。**  
如果想让一个元素占满flex父级元素剩余的位置,设置为 `1` 即可.

## flex-shrink

**定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。**  
如果所有项目的`flex-shrink`属性都为`1`，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为`0`，其他项目都为`1`，则空间不足时，前者不缩小.

## flex-basis

**定义了在分配多余空间之前，项目占据的主轴空间（main size）。**浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

```css
.item {
  flex-basis: 28px;
}
```

这个属性和 `width` 的作用相似又稍有不同,有点绕,总结几个特点:
* `flex-basis`是指占据主轴空间的大小,如果父容器的`flex-direction`的值是`column`, 那么`flex-basis`代表的就是元素的高度了.
* 设置了`width`值的元素,如果内部元素大于该元素,内部会溢出,但是如果主轴剩余空间足够的话,`flex-basis`会被撑开.
* `flex-basis`受到`min-width`和`max-width`的约束限制.

## flex

`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

## align-self

**允许单个项目有与其他项目不一样的对齐方式.**可覆盖align-items属性。

![align-self](/docImg/align-self.png)