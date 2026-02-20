---
name: github-publish
description: 自动将当前项目改动提交并推送到 GitHub。用户提到“push到GitHub、发布仓库、提交并推送、同步到github、自动发布代码”时使用。
---

# GitHub Publish

目标：把当前项目改动安全地提交并推送到 GitHub。

执行流程：

1) 检查环境
- `git rev-parse --is-inside-work-tree`
- `gh auth status`

2) 获取目标
- 若用户提供 `repo` 与 `branch`，直接使用。
- 若未提供，尝试读取 `tools/github-defaults.json`：
  - `repo`
  - `branch`
  - `autoCommitPrefix`
- 仍缺失则向用户要最小信息：repo URL + branch。

3) 绑定远程（如需要）
```bash
git remote -v
git remote add origin <repo>   # 若无 origin
git remote set-url origin <repo>  # 若 origin 不一致
```

4) 提交并推送
```bash
git add -A
git commit -m "<commit message>"   # 无改动会失败，需优雅处理
git branch -M <branch>
git push -u origin <branch>
```

5) 输出结果
- 远程地址
- 分支
- 最新 commit hash
- push 状态

## 推荐提交信息策略

- 默认：`chore: sync changes`
- 若 `tools/github-defaults.json` 存在 `autoCommitPrefix`，优先用该前缀。
- 如果用户给了提交信息，优先使用用户提供值。

## 回滚命令

```bash
# 取消最近一次 commit（保留改动）
git reset --soft HEAD~1

# 删除远程绑定（慎用）
git remote remove origin
```

## 常见错误与修复

1) `No configured push destination`
- 先 `git remote add origin <repo>` 再 `git push -u origin <branch>`

2) `rejected (non-fast-forward)`
- 先拉取并变基后再推送：
```bash
git pull --rebase origin <branch>
git push -u origin <branch>
```

3) `gh auth` 未登录
- 执行：
```bash
gh auth login
gh auth status
```

4) 当前无改动
- 输出“无可提交变更”，不报错结束。
