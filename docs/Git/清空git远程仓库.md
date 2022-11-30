---
title:清空git远程仓库并重新提交
---

# 清空git远程仓库并重新提交

```bash
#克隆远程仓库到本地
git clone [远程仓库地址]

#在 git bash 中删除当前目录下所有文件
rm -rf ./*

#修改提交
git commit -a -m "delete old files"

#推送到远程仓库
git push -f
```