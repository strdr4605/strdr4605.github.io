---
title: "Keep your JavaScript repository clean"
date: 2022-04-08
slug: keep-your-java-script-repository-clean
description: How we can clean up the repository root directory from config files like .eslintrc.js, tsconfig.json, jest.config.js and others.
tags:
  - tools
  - node
  - npm
---

As your JavaScript project grows, you start adding more tools and settings that will improve the development experience.

Nowadays, tools like eslint, husky, and tests are essential for any project.

The problem is that most of these tools require a config file at the root of your project/repo.
After some time, the root directory is full of config files, and it's a bit intimidating when you open it in the git hub.

One elegant solution I found in [remirror](https://github.com/remirror/remirror) repo.
There all config files that should stay in the root of the project are actually in the `./support/root/` directory,
and they are locally symlinked when setting up the project.

Inspired by their approach I created [symlink-config](https://github.com/strdr4605/symlink-config), which helps to migrate your project to this approach.

Here is how repo looks on Github before and after:

<table>
  <thead>
  <tr>
    <th>Default</th>
    <th>With symlink-config</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="/root-config-files-demo.png" alt="root config files demo"></td>
      <td style="display: flex;"><img src="/root-symlink-config-files-demo.png" alt="root symlink config files demo"></td>
    </tr>
  </tbody>
</table>

This demo has only 5 configs in the root, but imagine adding more tools, like tsconfig.json, jest.config.js, and others.

When exploring the project locally, 
all these files will be in the root but being just a symlink file they will differ from the rest of the files and you may skip them visually.

In the end, I think this tool is useful for big open source projects with a lot of config files, as it cleans up the entry point of the project (the repo root) and makes it more appealing to users.

Check out [**symlink-config**](https://github.com/strdr4605/symlink-config), and let me know your opinion!
