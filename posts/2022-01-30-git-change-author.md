---
title: "Git: temporary change commit author"
date: 2022-01-30
slug: git-temporary-change-commit-author
description: A small function that you can add to your shell config file that will change the GIT_COMMITTER_NAME, GIT_COMMITTER_EMAIL and git commit author
tags:
  - git
  - bash
  - tools
---

It may happen that sometimes you need to temporarily do commits with another author's name and email.
You can do this with this command:

```bash
GIT_COMMITTER_NAME="Other Name" GIT_COMMITTER_EMAIL="Other Email" git commit -m Test --author "Other Name <adriana.sanduta@isa.utm.md>"
```

But you may want to do it multiple times, so you can create a **shell** function:

```bash
# Add me to shell config file. ~/.zshrc or ~/.bashrc
# Git with author
git_w_a(){
  COMMITTER_NAME="Other Name"
  COMMITTER_EMAIL="other_email@example.com"
  echo "
    Running:
    GIT_COMMITTER_NAME=\"$COMMITTER_NAME\" GIT_COMMITTER_EMAIL=\"$COMMITTER_EMAIL\" git $@ --author \"$COMMITTER_NAME <$COMMITTER_EMAIL>\"
  "
  GIT_COMMITTER_NAME="$COMMITTER_NAME" \
  GIT_COMMITTER_EMAIL="$COMMITTER_EMAIL" \
  git $@ \
  --author "$COMMITTER_NAME <$COMMITTER_EMAIL>"
}
```

**Usage**:

```bash
git commit -m "Test" # Commit with default user name and email
git_w_a commit -m "Test" # Commit with other user name and email
```

> Don't forget to change the `COMMITTER_NAME` and `COMMITTER_EMAIL` 