---
title: nvm安装多个node版本.md
---

## 下载安装nvm

* 下载安装nvm，首先安装目录不要有空格和中文，会出现乱码

* 下载地址官网：[https://nvm.uihtm.com/](https://nvm.uihtm.com/ "https://nvm.uihtm.com/")

* 下载地址Github：[https://github.com/coreybutler/nvm-windows/releases/](https://github.com/coreybutler/nvm-windows/releases/ "https://github.com/coreybutler/nvm-windows/releases/")

![](/环境部署/nvm安装多个node版本/download.png)

## 默认安装路径

![](/环境部署/nvm安装多个node版本/安装路径.png)

## 环境变量

![](/环境部署/nvm安装多个node版本/环境变量.png)

## nvm安装node指定版本

```powershell
nvm install xxxx
```

![](/环境部署/nvm安装多个node版本/安装指定版本.png)

## 查看已安装的版本

```powershell
nvm ls
```

![](/环境部署/nvm安装多个node版本/查看已安装的版本.png)

## nvm使用指定版本

```powershell
nvm use xxxx
```

![](/环境部署/nvm安装多个node版本/使用指定版本.png)

## 安装node后没有对应的npm问题

* 手动下载node对应的npm

* npm下载地址：[http://npm.taobao.org/mirrors/npm/](http://npm.taobao.org/mirrors/npm/ "http://npm.taobao.org/mirrors/npm/")

* node版本对应npm：[https://nodejs.org/zh-cn/download/releases/](https://nodejs.org/zh-cn/download/releases/ "https://nodejs.org/zh-cn/download/releases/")

![](/环境部署/nvm安装多个node版本/npm对应版本.png)

* 解压后更名为npm

![](/环境部署/nvm安装多个node版本/解压更名.png)

* 更名后npm复制到对应node文件夹下

![](/环境部署/nvm安装多个node版本/npm复制到对应文件夹)

* 将npm文件夹里面的bin目录下的npm和npm.cmd两个文件复制到对应node版本的根目录下

![](/环境部署/nvm安装多个node版本/复制到对应文件夹.png)

* 最后查询是否安装成功

![](/环境部署/nvm安装多个node版本/查询是否安装成功.png)
