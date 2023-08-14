---
title: 用ffmpeg转换m3u8视频
tags: 音频 ffmpeg
book: 音频
---

[ffmpeg官网](http://ffmpeg.org/)

## mac上安装

```sh
brew install ffmpeg

#查看安装是否成功
ffmpeg -version 
```

## 使用

```sh
ffmpeg -i 文件路径 -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls 生成的目标文件路径
```