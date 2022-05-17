---
title: "How to gradually add an eslint rule"
date: 2022-05-17
description: Sometimes you decide to add a new eslint plugin or rule to your javascript project. To not do 2000+ files change you may try to gradually change files with lint-staged.
tags:
  - development
---

As your javascript project grows and new engineers are joining the team, you may try to add new eslint plugins and rules to make the code base more rigid.

The problem is that often these new eslint rules may require changes in all project files, and as your project is big enough, you may have a situation when eslint rules require changes in [2000+ files](/how-i-found-a-bug-in-2000-files).

What if you could gradually enforce an eslint rule, without breaking the CI of your project.

We can do this using [lint-staged](https://github.com/okonet/lint-staged), [husky](https://typicode.github.io/husky/), and some changes in the `.eslintrc.js` file.

I hope you are already using `lint-staged` with `husky`. If not, please set up it.

Your `.lintstagedrc.js` file may look something like this:

```js
// .lintstagedrc.js
module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --quiet --fix'],
  '*.css': 'stylelint --fix',
  '*.md': 'prettier --write'
};
```

You may also have a script in your `package.json` file, that you run in CI to make sure eslint rules are followed:

```json
...
"scripts": {
  "eslint:run": "eslint --ext=.js,.jsx,.ts,.tsx --quiet .",
}
```

Now let's say you want to enforce the removal of all console logs using the eslint rule `no-console`.

In your `.eslintrc.js` file, set the rule to warning:

```js
// .eslintrc.js
module.exports = {
  ...
  rules: {
    'no-console': 'warn',
  ...
```

Now running `npm run eslint:run` will just show a bunch of warnings but will pass the check.

Next, you need to create a new eslintrc file that will be used only by `lint-staged`. Let's name it `eslintrc-staged.js`. 
There you need to extend the default eslint config and override the rule to error.

```js
// .eslintrc-staged.js
module.exports = {
  extends: './.eslintrc.js',
  rules: {
    'no-console': 'error',
  }
};
```

The last change needs to be done in `.lintstagedrc.js` to tell lint-staged to use another config file when running eslint.

```js
module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint -c eslintrc-staged.js --no-eslintrc --quiet --fix'],
  '*.css': 'stylelint --fix',
  '*.md': 'prettier --write'
};
```

Now, when doing changes to the project, eslint will throw errors only to the files that were changed before the commit.
