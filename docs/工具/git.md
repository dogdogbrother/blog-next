---
title: git的一些常见操作
tags: git
book: git
---

## git commit

```sh
# 等同于 git add . && git commit -m
git commit -am
# 对最近一次的提交的信息进行修改,此操作会修改commit的hash值
git commit --amend
```

## git pull

```sh
# 从远程仓库拉取代码并合并到本地，可简写为 git pull 等同于 git fetch && git merge 
git pull <远程主机名> <远程分支名>:<本地分支名>
# 使用rebase的模式进行合并
git pull --rebase <远程主机名> <远程分支名>:<本地分支名>
```

## git fetch

与 `git pull` 不同的是 `git fetch` 操作仅仅只会拉取远程的更改，不会自动进行 `merge` 操作。

```sh
# 获取远程仓库特定分支的更新
git fetch <远程主机名> <分支名>
# 获取远程仓库所有分支的更新
git fetch --all
```
## git branch

```sh
# 新建本地分支，但不切换
git branch <branch-name> 
# 查看本地分支
git branch
# 查看远程分支
git branch -r
# 查看本地和远程分支
git branch -a
# 删除本地分支
git branch -D <branch-nane>
# 重新命名分支
git branch -m <old-branch-name> <new-branch-name>
```
## git remote

```sh
# 查看远程仓库
git remote -v

# 删除
git remote remove <name>

# 新增
git remote add <origin名称> <git地址>

# 更改仓库别名
git remote rename <origin> <new-origin>

# 更新远程仓库分支信息
git remote update <origin>
```

## git stash 暂存文件

```sh
# 把本地的改动暂存起来
git stash 

# 从未 track 的文件是不会被隐藏的 需要加上-u参数, --include-untracked 的简写

git stash -u

# 执行存储时，添加备注，方便查找。
git stash save "message" 

# 应用最近一次暂存的修改，并删除暂存的记录
git stash pop

# 应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即 stash@{0}，如果要使用其他个，git stash apply stash@{$num}
git stash apply

# 查看 stash 有哪些存储
git stash list

# 删除所有缓存的 stash
git stash clear
```

## git revert 回滚某次的提交

`git revert` 撤销某次操作，此操作不会修改原本的提交记录，而是会新增一条提交记录来抵消某次操作。

```sh
# 针对普通 commit
git revert <commit-id> 
# 针对 merge 的 commit
git revert <commit-id> -m 
```

## 配置 git alias 提升工作效率

可以简化命令,例如用`ci`代替`commit`:`git config --global alias.ci commit`

```sh
# 原始命令
git config --global alias.<简化的字符> 
# 查看已添加的快捷键
git config --global alias
```

## git log显示优化

```sh
# alias 配置
lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```