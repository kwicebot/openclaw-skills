---
name: claude-code
description: "Claude Code 官方文档速查与实操技能。用于：安装与登录、CLI 参数、MCP 配置、Subagents、Skills、Settings/Permissions、排障与最佳实践。"
homepage: https://code.claude.com/docs
metadata: { "openclaw": { "emoji": "🧠", "requires": { "bins": ["claude"] } } }
---

# Claude Code Skill

基于官方文档（https://code.claude.com/docs）整理的可执行速查技能。

## 何时使用

✅ 当用户要你：
- 安装或初始化 Claude Code
- 查 CLI 命令/参数（`claude -p`、`--model`、`--agents` 等）
- 配置/排查 MCP（`claude mcp add/list/get/remove`）
- 设计 subagents / skills / hooks / settings
- 做企业配置（managed settings、权限策略、环境变量）
- 快速定位文档页面与最佳实践

❌ 不适用：
- 需要 Anthropic 账号后台具体计费数据（本地无法直接读取）
- 需要访问私有内部文档（除非用户提供）

## 官方文档入口

- 总入口：`https://code.claude.com/docs`
- 文档索引：`https://code.claude.com/docs/llms.txt`
- 快速开始：`https://code.claude.com/docs/en/quickstart`
- CLI 参考：`https://code.claude.com/docs/en/cli-reference`
- Settings：`https://code.claude.com/docs/en/settings`
- Skills：`https://code.claude.com/docs/en/skills`
- Sub-agents：`https://code.claude.com/docs/en/sub-agents`
- Hooks：`https://code.claude.com/docs/en/hooks`
- MCP：`https://code.claude.com/docs/en/mcp`

## 快速操作手册

### 1) 安装与登录

```bash
# 启动
claude

# 首次或切换账号
/login
```

### 2) 高频 CLI

```bash
# 交互模式
claude

# 单次任务（执行后退出）
claude -p "explain this function"

# 继续最近会话
claude -c

# 按会话恢复
claude -r "session-or-name"

# 限制可用工具
claude --tools "Bash,Read,Edit"

# 指定模型
claude --model sonnet
```

### 3) MCP 常用

```bash
# 添加 HTTP MCP
claude mcp add --transport http <name> <url>

# 添加本地 stdio MCP
claude mcp add --transport stdio <name> -- <command>

# Windows 本地 npx MCP（关键）
claude mcp add --transport stdio my-server -- cmd /c npx -y @scope/pkg

# 管理
claude mcp list
claude mcp get <name>
claude mcp remove <name>
```

### 4) Subagent 设计模板

```markdown
---
name: code-reviewer
description: 代码审查专家，改动后主动使用
tools: Read, Grep, Glob, Bash
model: sonnet
---

你是资深代码审查员：
1. 先看 git diff
2. 优先找安全、正确性、可维护性问题
3. 输出按 Critical/Warning/Suggestion 分级
```

## Settings 关键点（实战）

- 层级优先级：Managed > CLI 参数 > Local > Project > User
- 常用文件：
  - `~/.claude/settings.json`
  - `.claude/settings.json`
  - `.claude/settings.local.json`
- 敏感文件保护建议（deny 规则）：

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ]
  }
}
```

## 常见排障清单

1. `claude -v` 确认版本
2. 登录异常：重新 `/login`
3. MCP 连接失败：
   - 先 `claude mcp get <name>` 看配置
   - Windows + npx 场景补 `cmd /c`
   - 检查 `MCP_TIMEOUT`
4. 工具被拒绝：检查 permissions 的 `deny/ask/allow`
5. 行为异常：先最小化参数，排除 `--system-prompt*`、`--append-system-prompt*` 影响

## 响应风格约定（调用本技能时）

- 先给“可直接复制执行”的最短命令
- 再给“为什么这样做”的 1-3 条解释
- 涉及风险配置（如 bypass permissions）必须明确警告
- 能给出回滚路径就给（例如删除 MCP、恢复 settings）

## 给助手的执行策略

当用户提到 Claude Code 相关需求时：
1. 先判断任务类别：安装/CLI/MCP/Subagent/Settings/排障
2. 给最小可执行方案（MVP 命令）
3. 必要时再扩展成团队级规范（managed settings、策略）
4. 若用户只问“怎么做”，优先给命令而非大段概念
