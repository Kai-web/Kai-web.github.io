---
title: Github Pages自动化部署
---

# Github Pages自动化部署

## 实现功能：

+ 提交代码到 master 分支时，自动进行打包
+ 将打包的项目自动提交部署至 gh-pages 分支

## 生成ACCESS_TOKEN

+ 进入设置 -> 个人访问令牌 -> Tokens
+ 记录下生成的ACCESS_TOKEN

![](/环境部署/GithubPages自动化部署/生成ACCESS_TOKEN.png)

## 本地项目中创建Action文件

```
├─ blog
│  └─ github
│     └─ workflows
│        └─ main.yml
└─ package.json
```

```shell
# main.yml

name: build to my blog

on:
  # 配置当push进入什么分支的时候执行
  push:
    branches: 
     - master

jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # 具体的执行步骤
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - name: Checkout
        uses: actions/checkout@main

     # 使用的node版本   
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 16
          registry-url: https://registry.npmjs.org
      
     # 执行安装
      - name: Install dependencies
        run: npm install
    
    # 执行打包
      - name: Build Blog
        run: npm run build
      
    # 执行部署
      - name: Deploy to Pages
        run: |
          cd  docs/.vitepress/dist 
          git init
          git config user.name "wangkaibing"
          git config user.email "${{ secrets.GIT_EMAIL }}"
          git add -A
          git commit -m 'deploy'
          git push -f https://Kai-web:${{ secrets.ACCESS_TOKEN }}@github.com/Kai-web/Kai-web.github.io.git master:gh-pages
          cd -
```

## 生成secrets

+ 添加 ACCESS_TOKEN （记录下的ACCESS_TOKEN）
+ 添加 GIT_EMAIL（填写Git邮箱）

![](/环境部署/GithubPages自动化部署/生成secrets.png)

## 设置分支

![](/环境部署/GithubPages自动化部署/设置分支.png)

## 设置仓库名（按照自己的设置）

![](/环境部署/GithubPages自动化部署/设置仓库名.png)

## 推送代码至仓库 master

+ 进入Action即可查看执行的流程
+ 如果出现红色感叹号，那就是配置有误，点击进入即可看到具体的报错信息

![](/环境部署/GithubPages自动化部署/推送代码至仓库.png)