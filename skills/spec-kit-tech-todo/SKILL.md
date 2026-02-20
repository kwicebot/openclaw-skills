---
name: spec-kit-tech-todo
description: 基于 Spec-Kit 工作流快速落地前端小应用（尤其是科技感拟物风 Todo）。当用户提到“按 spec-kit 实现、配置 workflow、从规范到实现、constitution/spec/plan/tasks/implement、拟物科技风 todo”时使用。
---

# Spec-Kit Tech Todo

目标：把需求按 Spec-Kit 思路拆解并快速交付可运行版本。

## Workflow（必须按顺序）

1. **Constitution**
   - 先写项目原则：质量、可访问性、性能、视觉风格、范围边界。
   - 文件：`.specify/memory/constitution.md`

2. **Specify**
   - 写清楚“做什么”和“为什么”，不要先陷入技术细节。
   - 文件：`specs/<feature-id>/spec.md`

3. **Plan**
   - 明确技术方案、数据模型、状态流、验证方式。
   - 文件：`specs/<feature-id>/plan.md`

4. **Tasks**
   - 产出可执行任务清单（先文档、再实现、再验证）。
   - 文件：`specs/<feature-id>/tasks.md`

5. **Implement**
   - 只实现已在 spec/plan/tasks 中约定的范围。
   - 前端默认目录：`app/`（`index.html`, `styles.css`, `script.js`）

## 默认模板（前端小项目）

目录建议：

```text
<project>/
  .specify/memory/constitution.md
  specs/<feature-id>/spec.md
  specs/<feature-id>/plan.md
  specs/<feature-id>/tasks.md
  app/index.html
  app/styles.css
  app/script.js
  README.md
```

## 拟物科技风 Todo 的最小要求

功能：
- add / toggle / delete
- all / active / completed filter
- clear completed
- localStorage 持久化（建议 key：`skeuo.todos.v2`）

视觉：
- 暗色玻璃面板（glassy panel）
- 青/蓝/紫霓虹辉光
- 拟物按键（高光 + 内阴影 + 压下反馈）
- 清晰可见的 focus ring

## 验收清单

- 刷新后数据仍在
- 过滤逻辑正确
- 清理已完成仅影响 completed
- 全键盘可操作
- 无明显控制台错误

## 运行方式

```bash
cd <project>/app
npx http-server -p 8092
```

访问：`http://127.0.0.1:8092`

## 交付规范

- 先给“可运行地址”
- 再给“改动文件列表”
- 最后给“下一步可选优化（最多3条）”
