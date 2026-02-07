---
title: "Git: hide specific branch when doing git log --all"
date: 2022-02-17
slug: git-hide-specific-branch-when-doing-git-log-all
description: How to hide a specific branch when looking into git log history.
tags:
  - git
---

I deploy this website on Github pages. Deployment and hosting are on `gh-pages` branch.
When doing my usual check of branch status and history using:

```bash
git log --oneline --all --graph
```

I faced this problem:

![git-gh-pages-branch](/git-gh-pages-branch.png)

I see a very long list of commits on `gh-pages` branch and I need to scroll down to see my other branches.

## Solution

You can hide a specific branch using `--exclude` option for `git log`. Now my command looks like this:

```bash

git log \
--oneline \
--graph \
--exclude=refs/remotes/origin/gh-pages \
--all
```

Now it looks better:

![git-hide-gh-pages-branch](/git-hide-gh-pages-branch.png)

You can add this command in a git alias.

If needed check [here](https://stackoverflow.com/questions/9437182/git-show-all-branches-but-not-stashes-in-log) for more things to exclude from `git log`.

> You can check why I prefer to do long commands instead of git aliases at [How I use Git](/how-i-use-git).