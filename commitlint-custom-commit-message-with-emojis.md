---
title: "Commitlint: custom commit message with emojis"
date: 2022-01-11T00:00:00.000Z
tags: ["tools", "git", "npm"]
description: "A guide to customize the commitlint to your need and use it as convention in your git repository. Customize commitlint header format to use emojis."
---
[Commitlint@16.0.2](https://commitlint.js.org/) is the next step on enforcing rules in your JS project after eslint.

Installation and configuration is very simple:

```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

Commitlint suggests [Conventional commits](https://www.conventionalcommits.org/en/) which have this format:

```
type(scope?): subject
```

But what if I want to use a custom format specific to my team?! Let's say I want to use emoji as a type, an optional ticket, and then the subject, like:

```
type [ticket]? subject
```

To change the header format I need to change `headerPattern` from `parserOpts` config:

First I need to find a RegExp that will match `"✅ [T-4605] Add tests"`, also we need to add at least one rule so let's add `type-enum` that is [provided by commitlint](https://commitlint.js.org/#/reference-rules) to set allowed emojis

```js
// commitlint.config.js
// emojis like "✅ ", "😂 ", ...
const matchAnyEmojiWithSpaceAfter =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])\s/;
const matchOptionalTicketNumberWithSpaceAfter = /(?:\[(T-\d+)\]\s)?/; // "[T-4605] ", "[T-1]"
const subjectThatDontStartWithBracket = /([^\[].+)/; // "Add tests" but don't allow "[ Add tests"

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(
        "^" +
          matchAnyEmojiWithSpaceAfter.source +
          matchOptionalTicketNumberWithSpaceAfter.source +
          subjectThatDontStartWithBracket.source +
          "$"
      ),
      headerCorrespondence: ["type", "ticket", "subject"],
    },
  },
  rules: {
    "type-enum": [2, "always", ["⭐️", "🐞", "✅", "🚧", "♻️", "📝"]],
  },
};
```

Testing locally:

```bash
> echo "✅ [T-4605] Add tests" | commitlint # passes
> echo "✅ Add tests" | commitlint # passes
> echo "Something else" | commitlint # should fail but still passes 🤔
```

The problem is that there is no rule to make sure that the header matched our RegExp. I can add 2 other rules from commitlint:

```js
"type-empty": [2, "never"],
"subject-empty": [2, "never"],
```

but what if I have other variables names, `emoji` instead of `type`, `desc` instead of `subject`?

I need to create a custom rule using [Commitlint plugins](https://commitlint.js.org/#/reference-plugins). 
Let's name the rule `header-match-team-pattern` and also use `emoji` instead of `type`. In the rule, we check if all variables are `null` and return a message

```js
...
      headerCorrespondence: ["emoji", "ticket", "subject"],
    },
  },
  plugins: [
    {
      rules: {
        "header-match-team-pattern": (parsed) => {
          const { emoji, ticket, subject } = parsed;
          
          if (emoji === null && ticket === null && subject === null) {
            return [
              false,
              "header must be in format '✅ [T-4605] Add tests' or '✅ Add tests'",
            ];
          }
          return [true, ""];
        },
      },
    },
  ],
  rules: {
    "header-match-team-pattern": [2, "always"],
...
```

> You can `console.log({ parsed })`, for debugging

Now let's create a better `type-enum` rule, `explained-emoji-enum`:

```js
...
        "explained-emoji-enum": (parsed, _when, emojisObject) => {
          const { emoji } = parsed;
          if (emoji && !Object.keys(emojisObject).includes(emoji)) {
            return [
              false,
              `emoji must be one of:
${Object.keys(emojisObject)
                .map((emojiType) => `${emojiType} - ${emojisObject[emojiType]}`)
                .join("\n")}`,
            ];
          }
          return [true, ""];
        },
      },
    },
  ],
  rules: {
    ...
    "explained-emoji-enum": [
      2,
      "always",
      {
        "⭐️": "New feature",
        "🐞": "Bugfix",
        "✅": "Add, update tests",
        "🚧": "Work in progress",
        "♻️": "Refactor",
        "📝": "Documentation update",
      },
    ],
  },
...
```

And when the engineer will set a wrong emoji it will have a error like:

```bash
> echo "😂 Add tests" | commitlint                                                                                                                                 
⧗   input: 😂 Add tests
✖   emoji must be one of:
⭐️ - New feature
🐞 - Bugfix
✅ - Add, update tests
🚧 - Work in progress
♻️ - Refactor
📝 - Documentation update [explained-emoji-enum]

✖   found 1 problems, 0 warnings
```

## Final result

```js
// commitlint.config.js
// emojis like "✅ ", "😂 ", ...
const matchAnyEmojiWithSpaceAfter =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])\s/;
const matchOptionalTicketNumberWithSpaceAfter = /(?:\[(T-\d+)\]\s)?/; // "[T-4605] ", "[T-1]"
const subjectThatDontStartWithBracket = /([^\[].+)/; // "Add tests" but don't allow "[ Add tests"

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(
        "^" +
          matchAnyEmojiWithSpaceAfter.source +
          matchOptionalTicketNumberWithSpaceAfter.source +
          subjectThatDontStartWithBracket.source +
          "$"
      ),
      headerCorrespondence: ["emoji", "ticket", "subject"],
    },
  },
  plugins: [
    {
      rules: {
        "header-match-team-pattern": (parsed) => {
          const { emoji, ticket, subject } = parsed;
          if (emoji === null && ticket === null && subject === null) {
            return [
              false,
              "header must be in format '✅ [T-4605] Add tests' or '✅ Add tests'",
            ];
          }
          return [true, ""];
        },
        "explained-emoji-enum": (parsed, _when, emojisObject) => {
          const { emoji } = parsed;
          if (emoji && !Object.keys(emojisObject).includes(emoji)) {
            return [
              false,
              `emoji must be one of:
${Object.keys(emojisObject)
                .map((emojiType) => `${emojiType} - ${emojisObject[emojiType]}`)
                .join("\n")}`,
            ];
          }
          return [true, ""];
        },
      },
    },
  ],
  rules: {
    "header-match-team-pattern": [2, "always"],
    "explained-emoji-enum": [
      2,
      "always",
      {
        "⭐️": "New feature",
        "🐞": "Bug fix",
        "✅": "Add, update tests",
        "🚧": "Work in progress",
        "♻️": "Refactor",
        "📝": "Documentation update",
      },
    ],
  },
};
```

## Next steps

I can add [some rules from Commitlint](https://commitlint.js.org/#/reference-rules) or create other custom ones.   
Put the config in a [new package](https://commitlint.js.org/#/concepts-shareable-config).  
Add `husky` and use it in every company repo on the pre-commit hook.