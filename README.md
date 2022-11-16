# 基于 VitePress 构建的个人笔记库

📝 **Wang Kaibing 的个人笔记库，记录个人碎片化、结构化、体系化的随笔。** 

🐢 [GitHub Pages（完整体验）](https://www.kai-web.cn)

# 开始

```bash
# 1.克隆本仓库
git clone https://github.com/Kai-web/Kai-web.github.io.git

# 2.安装 yarn
npm install -g yarn

# 4.安装依赖
yarn install

# 5.dev 运行，访问：http://localhost:5173
# 注意：本地node版本需大于v14.18.0
yarn dev

# 6.打包，文件存放位置：docs/.vitepress/dist
# 如果是部署到 GitHub Pages，可以利用 GitHub Actions，在 push 到 GitHub 后自动部署打包
# 详情见：.github/workflows/togithub.yml，根据个人需要删减工作流配置
yarn build

# 7.部署
# 7.1 push 到 GitHub 仓库，部署到 GitHub Pages：需要在仓库设置中启用 GitHub Pages（本仓库采用此种部署方式，该方式不利于国内搜索引擎SEO，可能会不收录）
# 7.2 在其他平台部署, 例如：Gitee Pages、Vercel、Netlify、个人虚拟主机、个人服务器等
```

## 博客

- 和大家平常见到的常规博客一样，类似于随笔，可能偶尔一个小时或半天的时间输出一小块内容，相对来说更多带有自己的思考和理解。

## 随笔

- 更多则是自己平常通过视频教程，文档等学习做的笔记，相对博客来说分类更加明确，整体更加系统，但更多是初次接触某个领域所做的笔记。