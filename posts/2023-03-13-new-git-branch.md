---
title: "How I start working on a new task with Git"
date: 2023-03-13
description: My workflow when starting a new task for the project with git. How I checkout on a new branch based on origin/master branch.
tags:
  - git
---

I see a common workflow when starting to work on new task:

```bash
git checkout master
git pull # or git pull -r
git checkout -b feat/4605-new-task
```

But I do things a bit differently. The main difference is that I don't care about the local `master` branch because the source of truth is always remote `origin/master`. 
I don't do commits on `master` branch, because all changes to the project are done through Pull Requests. So why should I keep the local `master` in sync with `origin/master`?

The first thing I do is fetch the remote master branch to get the latest commits.

I have an alias in my `.gitconfig` file:

```bash
[alias]
  fetch-and-clean-branches = "!git fetch -p && git branch -vv | grep ': gone]'|  grep -v "\\*" | awk '{ print $1; }' | xargs git branch -D"
```

> [How to locally delete all remotely merged git branches](https://morgan.cugerone.com/blog/quick-tip-how-to-locally-delete-all-remotely-merged-git-branches/)

Running `git fetch-and-clean-branches`, will fetch new updates on remote branches and will remove local branches that are not relevant anymore.

Next, I create a new branch based on `origin/master`:

```bash
git checkout -b feat/4605-new-task origin/master # --no-track
```

I also created an alias for this command:

```bash
[alias]
  fetch-and-clean-branches = "!git fetch -p && git branch -vv | grep ': gone]'|  grep -v "\\*" | awk '{ print $1; }' | xargs git branch -D"
  start = "!git fetch-and-clean-branches && git checkout -b \"$1\" --no-track origin/master #"
```

And I can use it as: `git start feat/4605-new-task`. 

---

> Related: [How I use Git](/how-i-use-git)
