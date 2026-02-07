---
title: "Meteor: a better way to use meteor npm command"
date: 2022-01-13
slug: meteor-a-better-way-to-use-meteor-npm-command
description: Did you forget to add meteor command before npm? Try adding a bash script that will make sure you always run it correctly.
tags:
  - tools
  - node
  - npm
---

Meteor advice to run [`meteor npm ...`](https://docs.meteor.com/commandline.html#meteornpm) instead of `npm ...`.

> Using the `meteor npm ...` commands in place of traditional `npm ...` commands is particularly important when using Node.js modules that have binary dependencies that make native C calls (like `bcrypt`) because doing so ensures that they are built using the same libaries.

But if you are switching constantly between node projects (with/without meteor) sometimes you may forget to use `meteor npm ...` or use it in the wrong place.

## Solution

We can create a bash function that will replace `npm` and run `meteor npm ...` if we have a `.meteor` folder in the project.

> as [all Meteor apps have a .meteor directory](https://zodern.me/posts/meteor-local-folder/)

Edit your shell config file with **vim**, **nano**, or **vscode**. Add this function at the end of the file.

```bash
# Add me to shell config file. ~/.zshrc or ~/.bashrc
ORIGINAL_NPM=$(which npm)
npm() {
  RED='\033[0;31m'
  GREEN='\033[0;92m'
  NC='\033[0m' # No Color
  if [[ -d .meteor ]]
  then
    echo "${RED}Meteor project${NC}\nRunning:\n\n\t${GREEN}meteor npm $@${NC}\n";
    meteor npm $@
  else
    eval $ORIGINAL_NPM $@
  fi
}
```

If needed we can also add another function for `meteor node`.
