--- 
title: mac系统node版本切换
tags: node
book: node
---

可使用n同时安装多个版本Node.js，并切换到指定版本Node.js。

1. 全局安装
2. 安装指定node版本
3. 查看已安装的版本列表
4. 删除指定版本
5. 切换指定版本

```sh
npm install -g n

sudo -E n 18.16.0

n list

n rm 16.13.2

sudo n
```

