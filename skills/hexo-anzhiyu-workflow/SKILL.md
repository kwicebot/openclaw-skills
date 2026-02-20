---
name: hexo-anzhiyu-workflow
description: 用于维护 Hexo + AnZhiYu 博客的高效工作流。用户提到“博客改版/页面复刻/AnZhiYu主题/即刻栏/home_top/标签云/部署到GitHub Pages/域名 blog.112077.xyz/沙盘导出JSON落库”时使用。目标是减少来回试错，先本地验证再上线。
---

# Hexo + AnZhiYu 快速工作流

## 默认环境
- 项目目录：`D:\hexo\test`
- 主题：`anzhiyu`
- 部署仓库：`kwicebot/kwicebot.github.io`
- 域名：`https://blog.112077.xyz/`

## 必须遵循的节奏（避免浪费时间）
1. **先确认改动清单**（模块、目标、验收标准）。
2. **先本地构建验证**（`hexo clean && hexo generate`），必要时 `hexo s`。
3. **只改最小范围配置**（优先 `_config.anzhiyu.yml` / `source/_data/essay.yml`）。
4. **一次性汇报改动点**，确认后再 `hexo deploy`。

## 常见模块与对应配置

### 1) 首屏 8 字座右铭（home_top）
- 文件：`_config.anzhiyu.yml`
- 路径：`home_top.title` / `home_top.subTitle`
- 关键：若要显示文字，`peoplecanvas.enable` 必须是 `false`。

### 2) 即刻栏（首页滚动条）
- 数据文件：`source/_data/essay.yml`
- 关键字段：
  - `home_essay: true`
  - `essay_list`（控制滚动内容）
- 原生实现来自主题 `bbTimeList`，优先使用原生，不要额外挂同功能脚本。

### 3) 标签云卡
- 文件：`_config.anzhiyu.yml`
- 路径：`aside.card_tags.enable: true`
- 还需保证文章存在 tags（在 `source/_posts/*.md` front-matter 中配置）。

### 4) 页脚年份
- 文件：`_config.anzhiyu.yml`
- 路径：`footer.owner.since`

## 沙盘 JSON 落库规则
- 接收 `deploy-draft-*.json` 后：
  1. 过滤空值与异常超长污染文本。
  2. 仅将已知字段映射写回配置。
  3. 写一份 `*_applied.md` 记录“已应用/跳过项”。

## 执行命令模板
```bash
cd D:\hexo\test
npx hexo clean
npx hexo generate
npx hexo deploy
```

## 交付格式
- 改了哪些文件
- 改了哪些键值
- 是否已部署
- 用户下一步验证链接（通常 `https://blog.112077.xyz/` + 强刷提示）
