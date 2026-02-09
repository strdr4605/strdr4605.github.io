---
title: "Dynamic Tmux Window Naming with Claude Code"
date: 2025-10-27
slug: dynamic-tmux-window-naming-with-claude-code
description: How to automatically rename tmux windows based on your current task when working with Claude Code.
tags:
  - tmux
  - claude
  - automation
  - tools
---

When working with Claude Code in tmux, I wanted a way to automatically update my window names based on what I'm currently working on. Instead of manually renaming windows or having generic names, I set up Claude Code to dynamically update the window name as I switch between tasks.

## The Setup

The goal was to have Claude Code automatically rename the tmux window with:
- A `claude-` prefix to identify Claude Code sessions
- 2-3 dash-separated words describing the current task
- Updates only when the topic changes significantly (new task, after `/clear`, progress milestones)

Examples:
- `claude-code` - default/idle state
- `claude-fix-auth` - fixing authentication issues
- `claude-explore-api` - exploring API code
- `claude-blog-post` - writing blog posts

## Step 1: Custom Instructions

First, I created a custom instructions file that Claude Code reads on startup:

```bash
mkdir -p ~/.claude
```

Create `~/.claude/instructions.md`:

```markdown
# Tmux Window Management

When running inside a tmux session, automatically manage the window name:

- Always use "claude-" prefix followed by 2-3 words separated by dashes
- Update the window name ONLY when the topic changes significantly:
  - After `/clear` command is used
  - When starting a new task or issue
  - When making significant progress on a task
  - When switching between different work contexts
- Use the command: `tmux rename-window "name-here"`
- Do it silently without announcing the rename to the user
- Keep names concise and descriptive of the current work

Initial name: "claude-code"
```

## Step 2: Auto-Approve Tmux Commands

Claude Code has a permission system that prompts for approval before running bash commands. To make the window renaming seamless, I needed to auto-approve `tmux rename-window` commands using a PreToolUse hook.

Create `~/.claude/approve-tmux.py`:

```python
#!/usr/bin/env python3
import json
import sys

def main():
    # Read the hook input from stdin
    hook_input = json.loads(sys.stdin.read())

    # Check if this is a Bash tool use
    if hook_input.get("tool") == "Bash":
        command = hook_input.get("parameters", {}).get("command", "")

        # Auto-approve tmux rename-window commands
        if command.startswith("tmux rename-window"):
            response = {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": "allow",
                    "permissionDecisionReason": "Tmux rename-window auto-approved"
                }
            }
            print(json.dumps(response))
            return

    # For all other commands, no decision (normal flow)
    print("{}")

if __name__ == "__main__":
    main()
```

Make it executable:

```bash
chmod +x ~/.claude/approve-tmux.py
```

## Step 3: Configure the Hook

Update `~/.claude/settings.json` to add the PreToolUse hook:

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/approve-tmux.py"
          }
        ]
      }
    ]
  }
}
```

## How It Works

Once configured, Claude Code will:

1. Read the instructions on startup and understand its role in managing tmux window names
2. Monitor task changes during the session
3. When a significant topic change occurs, run `tmux rename-window` with an appropriate name
4. The PreToolUse hook intercepts the bash command and auto-approves it
5. The window name updates seamlessly without any user prompts

## Result

Now my tmux status bar always shows what Claude Code is currently helping me with. It's especially useful when running multiple tmux sessions - I can quickly identify which window has Claude Code and what it's working on.

The window names update naturally as I work:
- Start debugging → `claude-debug-api`
- Switch to writing tests → `claude-write-tests`
- Explore codebase → `claude-explore-auth`
- Back to idle → `claude-code`

This small automation makes tmux window management effortless and gives me better context awareness across my terminal sessions.
