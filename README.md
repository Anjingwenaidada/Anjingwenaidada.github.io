# 安静文 · AI 产品经理作品集

使用 React、Vite、TypeScript、Tailwind CSS 和 Framer Motion。

## 本地运行

```sh
npm install
npm run dev
```

## 构建

```sh
npm run build
```

## 修改内容

- `src/data/portfolio.ts`：个人信息、导航、工作经历、项目摘要及个人优势。
- `src/App.tsx`：页面板块与联系功能。
- `src/components/Projects.tsx`：项目卡片与概览弹窗。
- `src/styles.css`：颜色、排版和响应式布局。
- `public/assets/`：职业照、微信二维码和简历 PDF。

## GitHub Pages 发布

仓库的 Settings → Pages → Source 选择 GitHub Actions。
推送到 `main` 后，`.github/workflows/deploy.yml` 自动安装依赖、构建并发布网站。

部署时通过 `PAGES_BASE_PATH` 配置站点路径，同时支持账号主页和项目子路径。
本地开发默认使用根路径，图片、视频、简历和二维码随网站一起发布。

`docs/`、`tmp/`、`.openai/`、依赖目录及本地环境文件不提交到 GitHub。
