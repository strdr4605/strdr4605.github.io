---
title: "Optional pre-commit checks with husky"
date: 2022-03-31
slug: optional-pre-commit-checks-with-husky
description: How to make your husky pre-commit optional for each check   
tags:
  - git
  - node
  - tools
---

If you are working on a JavaScript project, you probably are using husky to check your [commit messages](/commitlint-custom-commit-message-with-emojis), 
maybe do some Prettier, Eslint formatting, or TypeScript checks.

Checking commit messages is fast, but running formatting and type checking takes more time as your project grows.

You can use [lint-staged](https://github.com/okonet/lint-staged) for prettier and eslint, 
but using it for TypeScript check makes no sense because if you change types in a git staged file it may break typing in another file.

All engineers have different workflows. To fix an issue from the TypeScript compiler, you could run a `tsc --watch` process and make sure nothing is broken.

I don't want to run `tsc --watch` because constantly running it slows the laptop. I don't mind if this check will be done at pre-commit stage even if the commit will take 10,20,30+ seconds.

But how to make this pre-commit optional? So the teammates that do manually formatting and type checking will not be frustrated.

[husky](https://www.npmjs.com/package/husky) version 7 enables pre-commit configuration using a bash script. So why not do checking before running `tsc` or `lint-staged`?!

This will be the beginning of the `.husky/pre-commit` file

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

APP_PRE_COMMIT_OPTIONS="$(dirname "$0")/_/pre-commit.options"
```

So we can put our options in a file named `pre-commit.options` inside the `.husky/_/` folder.

> `.husky/_/` should have a `.gitingore` file that will ignore our option file.

Next, let's print some message if the options files do not exist

```bash
YELLOW="\033[1;33m"
GREEN="\033[1;32m"
RESET="\033[0m"
if ! [ -f "$APP_PRE_COMMIT_OPTIONS" ]; then
  echo "${YELLOW}\nSkipping pre-commit hook."
  echo "If you want to use pre-commit for TypeScript check and lint-staged, run:\n"
  echo "  ${GREEN}echo -e 'APP_TS=true;\\\nAPP_LINT=true;' > $P_APP_PRE_COMMIT_OPTIONS${RESET}"
  echo ${YELLOW}\nIt will add some delay before committing!\n${RESET}"
  exit 0
fi

```

![optional-pre-commit](/optional-pre-commit.png)

Now, let's source the options file and check if the user enabled the linting:

```bash
source $APP_PRE_COMMIT_OPTIONS

if [ -n "${APP_LINT}" ] && [ "${APP_LINT}" == "true" ]; then
  echo "${GREEN}[husky] [pre-commit] [lint-staged]${RESET}"
  npx lint-staged
fi
```

You can add more options and checks if needed!

## Final result

The `.husky/pre-commit` file should look similar to this:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

APP_PRE_COMMIT_OPTIONS="$(dirname "$0")/_/pre-commit.options"

YELLOW="\033[1;33m"
GREEN="\033[1;32m"
RESET="\033[0m"
if ! [ -f "$APP_PRE_COMMIT_OPTIONS" ]; then
  echo "${YELLOW}\nSkipping pre-commit hook."
  echo "If you want to use pre-commit for TypeScript check and lint-staged, run:\n"
  echo "  ${GREEN}echo -e 'APP_TS=true;\\\nAPP_LINT=true;' > $P_APP_PRE_COMMIT_OPTIONS${RESET}"
  echo ${YELLOW}\nIt will add some delay before committing!\n${RESET}"
  exit 0
fi

source $APP_PRE_COMMIT_OPTIONS

if [ -n "${APP_TS}" ] && [ "${APP_TS}" == "true" ]; then
  echo "${GREEN}[husky] [pre-commit] [tsc]${RESET}"
  npx tsc
fi

if [ -n "${APP_LINT}" ] && [ "${APP_LINT}" == "true" ]; then
  echo "${GREEN}[husky] [pre-commit] [lint-staged]${RESET}"
  npx lint-staged
fi
```

