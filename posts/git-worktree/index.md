---
title: "You need to use Git worktree"
date: 2022-03-16
description: A basic guide on why and how to use Git worktree feature.
tags:
  - git
---

Recently I found `git worktree` feature and I plan to use it in all my projects.
Here is why and how you can use it.

## Why

If you are working on a big project with a lot of issues and tasks, you constantly have to switch between branches to do some quick-fix changes or maybe review a PR from a teammate.
The problem is that often you have some work in progress and switching branches means that you need to commit or stash your WIP changes.
If it's only 1-2 files/changes the cost of commit/stash is not that high. But if you work on a big feature with over 9000 changes it's hard to constantly change branches.

## How

Basically `git worktree` command allows to create a new directory with desired git state.  
Actually, your current workspace is already in git worktree.  
You can type `git worktree list` and you will see one item, which is your current git workspace.

Let's say you work on a big feature in your work project.

```bash
git worktree list
~/Work/project  17d8aab [big-feature]
```

And a quick-fix needs to be done from the `origin/master`.
You can create a git worktree with the following command:

```bash
git worktree add -b quick-fix ../quickfix origin/master
```

This command will create a new directory named **quickfix** at the same level as your **project** directory.  
The branch will be `quick-fix` and it will be set at commit from `origin/master`.  
You can see your git worktree:

```bash
git worktree list
~/Work/project   17d8aab [big-feature]
~/Work/quickfix  25e6c4b [quick-fix]
```

Next, you can navigate to **quickfix** directory, do your changes, push to remote, merge.

After you are done with **quickfix** you can remove the workspace with `git worktree remove quickfix`.

## Conclusion

This approach of using git worktree is not the most elegant but it's doing the job.
I might change the workflow (using bare git repos instead of normal repos) and will update this post.
For now you may check [How to use git worktree and in a clean way](https://morgan.cugerone.com/blog/how-to-use-git-worktree-and-in-a-clean-way/).

But I suggest to play a bit with git worktree if you have problems from **Why** section. And adding this git feature to your toolkit will make you a more productive engineer.

> Let me know if you have a nice workflow for git worktree!
