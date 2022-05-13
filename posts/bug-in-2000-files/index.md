---
title: "How I found a bug in 2000 files"
date: 2022-05-13
description: A story how I found a bug in a change of 2000 files using bash, git commits and git bisect. Another title for this post cound be How to creat a commit per file that was changed.
tags:
  - development
---

I was adding a new eslint plugin that will sort imports in js/ts files.   
After adding [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort), 
I run `eslint --fix` and found about 2000 files changed. 
As there was only reorder of imports I thought that there should not be any issues.

I was surprised when I found a very strange 

```
TypeError: Cannot read properties of undefined
```

Reverting the import order did not help to fix the issue.  
And now I started thinking  about how I can find the issue without going through all 2000 files. 

Then an idea came. As all changes are independent,
I could do a commit for every file change and then run a `git bisect` and find the file that causes the problem.

So I created a bash script that will get all file names from `git status` and create a commit with the file name:

Let's see how:

```bash
git status --porcelain # prints git status in a format that can be parsed
# M utils/index.ts
# M components/Button.tsx
# ...
```

Then we pipe this result to `awk` and print only the file name:

```bash
git status --porcelain | awk '{print $2}'
# utils/index.ts
# components/Button.tsx
# ...
```

read each line (filename), and do a commit with `--no-verify` to not trigger pre-commit check:

```bash
#!/bin/bash

(git status --porcelain | awk '{print $2}') | 
while read -r line
do
    git add $line
    git commit -m "Add file $line" --no-verify
done
```

After running this script I had about 2000 commits where I could run [`git bisect`](https://git-scm.com/docs/git-bisect) and find the issue.
`git bisect` reduced the number of checks from **2000** (theoretically) to just **11**.

I found the file that caused the issue, and it was completely unrelated to the file where the error was thrown. 
So I just eslint ignored the sorting rule in that file (till later investigation). 
Then I did a soft reset to undo all 2000 commits and pushed a single commit that successfully adds the new eslint plugin and rules to the project.
