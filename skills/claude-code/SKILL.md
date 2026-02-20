---
name: claude-code
description: Claude Code 官方文档实操技能。用于安装/登录、CLI 参数、MCP 配置、Subagents、Skills、Hooks、Settings 与排障。用户提到“Claude Code、CC、MCP、subagent、技能、权限、settings、hooks、怎么配”时使用。
---

# Claude Code

使用官方文档：
- https://code.claude.com/docs
- https://code.claude.com/docs/llms.txt

按下面流程执行：

1) 先判定任务类型：安装、CLI、MCP、Subagent、Skill、Hooks、Settings、排障。
2) 先给最短可执行命令，再给 1-3 条关键解释。
3) 涉及高风险项（如 bypass permissions）必须明确警告。
4) 最后给回滚命令（如 remove mcp / 恢复配置）。

## 常用命令速查

### 安装与登录
```bash
claude
/login
```

### 会话与执行
```bash
claude
claude -p "your task"
claude -c
claude -r "session-name-or-id"
claude --model sonnet
claude --tools "Bash,Read,Edit"
```

### MCP
```bash
claude mcp add --transport http <name> <url>
claude mcp add --transport stdio <name> -- <command>
claude mcp list
claude mcp get <name>
claude mcp remove <name>
```

Windows 本地 npx MCP：
```bash
claude mcp add --transport stdio my-server -- cmd /c npx -y @scope/pkg
```

### Subagent 样板
```markdown
---
name: code-reviewer
description: 代码审查专家，代码变更后主动使用
tools: Read, Grep, Glob, Bash
model: sonnet
---

执行代码审查，按 Critical/Warning/Suggestion 输出。
```

## 推荐安全基线（settings）

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

## 快速排障

1. `claude -v` 检查版本。
2. `/login` 重新鉴权。
3. `claude mcp get <name>` 检查 MCP 配置。
4. 检查 permissions 的 deny/ask/allow。
5. 若异常，先移除自定义系统提示参数再试。
