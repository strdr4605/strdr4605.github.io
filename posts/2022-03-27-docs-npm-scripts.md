---
title: "NPM: How to document your package.json scripts"
date: 2022-03-27
slug: npm-how-to-document-your-package-json-scripts
description: Let's see different ways you can document your npm scripts using README, comments in package.json, or using npx why package.
tags:
  - npm
  - node
  - tools
---

As your project grows you add more scripts to package.json.
When a new member joins the project (or maybe you come back after a break) it's hard to understand from the script itself, 
what it is doing and why it was created, especially when the script is 80 chars long with a lot of params and `&&`.

Let's see what we do about this:

## README.md

You could add documentation for the scripts in a section of the README.md file.

```md
## NPM scripts

- **start**: Description for `npm start` script
- **test**: Description for `npm test` script
...
```

👍This approach is nice because you can use the markdown rich text features. Also, the README file is the first file opened by a new member of the team.

🙁A downside of this approach is that when you see a script in package.json you need to open the README, then do back to package.json or terminal (to run the command).

## package.json

Npm does not support [JSON5](https://json5.org/) for package.json that could allow comments in JSON for example in tsconfig.json.

There is a popular question on StackOverflow on the topic:

[How do I add comments to package.json for npm install?](https://stackoverflow.com/questions/14221579/how-do-i-add-comments-to-package-json-for-npm-install)

You can read all proposed variants (and discussions) on StackOverflow. One option that could be ok is:

```json
{
  "name": "package name",
  "version": "1.0",
  "description": "package description",
  "scripts": {
    "start": "npm install && node server.js"
  },
  "scriptsComments": {
    "start": "Runs development build on a local server configured by server.js"
  },
  ...
}
```

👍This approach is nice because script documentation stays closer to the script itself.

🙁The downside: as your package.json grows with more scripts, dependencies, other tools configs it's very easy to get lost.

## npx why

`npx why` is a tool created to fix the problem of documenting package.json scripts.

If we have to run the scripts from the terminal, why not have the documentation for the scripts in the terminal?

![npx why demo](https://raw.githubusercontent.com/strdr4605/why/master/support/assets/demo.gif)

`npx why --init` will create a **package-why.json** in the root of the project with all scripts from package.json and the default descriptions.

After this, calling `npx why` will print all scripts and descriptions.

`npx why <some script name>` will print only description for `npm run <some script name>`.

You could update the documention by passing a description to `npx why <some script name> "<script description>"`. Or changing **package-why.json** file directly.

For better experience I suggest installing the package as a development dependency:

```bash
npm install why --save-dev
```

🎉This solution for documenting the script is nice because you access the docs from the terminal (where you have to use the script). 
Also I am sure that with new updates and features the experience of using `why` will get better and better.

🙁The downside: the process of documenting script is not so comfortable because you have to move between package-why.json and package.json files.

Check out [`npx why` package](https://github.com/strdr4605/why#readme).
