---
title: html元素
tags: html
book: 前端
---

## img元素缝隙问题

是因为属性`vertical-align: base-line`基线问题,可以将图片转为块元素`display: block`,也可以直接改`vertical-align`为`middle`.

```css 
img {
  vertical-align: middle;
}
```

## `input`的`type=file`上传文件时的文件限制
 * 允许上传文件数量:允许选择多个文件：`<input type="file" multiple>`,只允许上传一个文件：`<input type="file" single>`.
 * 上传指定的文件格式,需要设置`accept`属性，比如只允许上传图片文件：`<input type="file" accept="image/*">`.`*`代表此大类下所有小类型都能选中,如果想设置多个类型,用逗号隔开就好.常用的accept有:
   - `text/css` .css.
   - `application/msword` .doc .dot
   - `image/gif` .gif
   - `text/html` .htm .html
   - `image/jpeg` .jpe .jpeg .jpg
   - ` text/javascript` `application/javascript` .js
   - `application/json` .json
   - `audio/mpeg` .mp3 .mpeg .mpg
   - `application/pdf` .pdf 
   - `application/png` .png 
   - `application/vnd.ms-powerpoint` .pot .pps .ppt
   - `application/vnd.ms-works` .wdb .wps
   - `application/vnd.ms-excel` .xlc .xlm .xls .xlt .xlw
