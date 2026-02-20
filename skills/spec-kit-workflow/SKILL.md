---
name: spec-kit-workflow
description: 使用 Spec-Kit 方法完成“从需求到实现”的全流程能力。适用于用户提到 spec-kit、speckit 命令、constitution/spec/plan/tasks/implement、规范驱动开发、从文档到落地等场景，不局限于 Todo。
---

# Spec-Kit Workflow

本技能用于执行 **Spec-Kit 能力本身**，而不是某个固定项目模板。

## 何时触发

当用户需求包含以下任意意图时触发：
- “按 spec-kit 做”
- “配置 spec-kit workflow”
- “先出规范再开发”
- “constitution/spec/plan/tasks/implement”
- “用 speckit 命令走完整流程”

## 执行模式（两种）

### A) 原生命令模式（优先）
若环境可用 `specify` CLI：
1. `specify check`
2. `specify init <project> --ai <agent> [--here|--force]`
3. 在代理里按顺序执行：
   - `/speckit.constitution`
   - `/speckit.specify`
   - `/speckit.clarify`（可选但推荐）
   - `/speckit.plan`
   - `/speckit.tasks`
   - `/speckit.implement`

### B) 等价落地模式（兜底）
若 `specify` 不可用，按同等结构手工生成：
- `.specify/memory/constitution.md`
- `specs/<feature-id>/spec.md`
- `specs/<feature-id>/plan.md`
- `specs/<feature-id>/tasks.md`
- 实现代码（按 plan/tasks）

并明确告诉用户：这是“Spec-Kit 等价工作流落地”，非 CLI 原生命令链。

## 每阶段产出标准

### 1) Constitution
- 项目原则（质量、测试、UX、一致性、性能、边界）
- 决策约束（什么必须、什么禁止）

### 2) Spec
- 用户故事
- 功能需求（可验证）
- 非功能需求
- 验收标准
- 范围外（Out of Scope）

### 3) Plan
- 技术选型与理由
- 架构分层
- 数据模型/接口草案
- 风险与回滚方案

### 4) Tasks
- 任务原子化（可执行）
- 标注依赖与并行项
- 先测试/验证，再实现（如适用）

### 5) Implement
- 严格按 spec+plan+tasks 开发
- 每完成一块就验证
- 汇总变更与结果

## 质量闸门

在交付前必须检查：
1. 需求覆盖率：spec 要点是否都实现
2. 一致性：spec / plan / tasks / code 是否互相对齐
3. 可运行性：本地可启动、无关键报错
4. 可验证性：给出复现步骤和地址/命令

## 交付模板

- 先给：运行方式（命令 + 地址）
- 再给：关键文件变更清单
- 再给：验证结果（通过/未通过项）
- 最后给：下一步建议（≤3条）

## 注意事项

- 不要把技能绑定到 Todo 或某个特定技术栈。
- 用户未指定栈时，先给默认最小栈并说明可替换。
- 若需外部安装（如 uv/specify），先说明并征求用户确认。
