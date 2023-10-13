---
title: css 常用属性
tags: css 复制粘贴
book: css笔记本
---

## 文本超出省略号显示

```css
.box{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
```

## 文本超出省略号显示(多行)

```css
.box {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
```