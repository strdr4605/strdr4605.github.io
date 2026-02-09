---
title: "MacOS: notify when the terminal command is finished"
date: 2023-04-20
slug: mac-os-notify-when-the-terminal-command-is-finished
description: I created a small bash function to notify me when a long-running terminal command finishes
tags:
  - macos
  - zsh
---

After reading [A decade of dotfiles](https://evanhahn.com/a-decade-of-dotfiles/) I wanted to create a similar bash function to `boop`.

And here it is:


```bash
# ~/.zshrc

# ...rest of zshrc

,notify () {
  local last_exit_status="$?"

  if [[ "$last_exit_status" == '0' ]]; then
    osascript -e "display notification \"Done\" with title \"Good\" sound name \"Fonk\""
  else
    osascript -e "display notification \"Exit code: $last_exit_status\" with title \"Bad\" sound name \"Ping\""
  fi
  $(exit "$last_exit_status")
}
```

It uses [osascript](https://ss64.com/osx/osascript.html) to execute the AppleScripts that pushes the notification.  
According to [stackoverflow](https://stackoverflow.com/questions/67406491/osascript-how-to-pass-in-a-variable/67413043#67413043) 
this is not the best way to pass bash variable to osascript, 
but I did not understand how to do it for my use case and as I use `last_exit_status` there should be no problem.

usage:

```bash
npm run test;,notify
```

I prefix the function name with a comma to faster search for it when doing `;,<Tab>`.

You can test it with `(exit 0);,notify` and `(exit 1);,notify`.

![notify good](/notify-good.png)
![notify bad](/notify-bad.png)
