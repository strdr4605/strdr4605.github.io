---
title: "NodeJS: How to test the npm package before releasing"
date: 2022-04-15
description: How to test and release an npm package when it is still a Work In Progress. How to create prereleases of a NodeJS package following semver.org convention.
tags:
  - development
  - node
  - npm
---

Let's say you have a **core** package that is used in your **app** and **mobile** projects.

Now you need to do some changes, both in **core** and **app**.

In the process of local development, you should test that **core** is working correctly with **app** before the release.
You can use [`npm link`](https://docs.npmjs.com/cli/v8/commands/npm-link), but from my experience, it's not always working as expected.

A better alternative is [yalc](https://github.com/wclr/yalc). You can check it yourself, but shortly, as the package itself says:

> Better workflow than **npm | yarn link** for package authors

After everything is working locally, you are ready to do a Pull Request. 
But wait! The CI will fail because the new version of **core** is only available locally.

To fix this, we need a prerelease version of the **core** that will be installed in CI, or then other engineers will try it on their machines.

Let's, say the previous version of **core** was `1.0.1`, and you are working on future `1.0.2`.

[Semver.org docs](https://semver.org/spec/v2.0.0-rc.1.html) suggests to use `1.0.2-rc.1` (release candidate),
but this approach does not work well when you are working on a project where many engineers can release to **core** before you.

From my experience, the best is to have a prerelease version that is associated with some issue/ticket/task number in the format:

**`<current version>`**-**`<issue number>`**.**`<WIP version>`**

Example: `1.0.1-4605.0`, `1.0.1-4605.1` ...

The important part before publishing such a prerelease version is to set a tag. 
If you don't set a tag, the package will be published as `latest`, 
and then someone will try to install the **core** package, it will get the wrong "`latest`" version which may still be WIP.   
For this, you might use the `dev` tag.

## So, the workflow

1. You do changes in **core**
2. Use the WIP version of **core** in **app** locally using `yalc`
3. When the task is ready:
  - Change the version of **core**: `1.0.1-4605.0`
  - Publish the WIP version: `npm publish --tag dev`
  - Update the **app** with WIP version of **core**
    - `npm install core@dev`
    - or manually set **core** version in **app** `package.json` and do `npm install`
  - Do move WIP prereleases if needed: `1.0.1-4605.1`
4. Create PRs for both projects
5. When **core** PR is approved
  - Merge **core**
  - Set new version `1.0.2`
  - Publish **core**: `npm publish` (`latest` tag is default)
6. Update **app** PR with new version of **core**
7. Merge **app** changes into master
8. Happy coding
