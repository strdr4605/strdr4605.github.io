---
title: "I don't use git anymore"
date: 2026-10-04
slug: i-dont-use-git-anymore
description: A story about how I switched from Git version control system to a better alternative jj-vcs.
tags:
  - git
  - jj
---

You probably opened this article with the thought:

> This guy outsourced all his work to coding agents and is not managing git by himself🤔😅

And this is a partial truth; although coding agents do manipulate git by themselves, I still check the git state, commits, branches (so it's not fully outsourced).

But this is a story about replacing git with a better alternative.

## How I started using git

I found out about git in the hard way.

While in the middle of a 4-week hackathon trying to develop [Fracfik](https://strdr4605.com/fracfik/) in collaboration with my teammates, not knowing about git, and sharing code changes on Messenger by sending files and archives of the project and handling code merging and conflicts manually😭.

![fracfik-version-2](/fracfik-version-2.png)

It was a nightmare to work that way and I thought to myself

> There should be a better way of doing this kind of collaboration over a coding project🤔

At the end of the hackathon a mentor saw how we work, and asked us, "Why don't you use git for the project?" It was too late for that project, but that day I went home and started digging into git and GitHub.

That day I had the "aha moment", and from then on I used git and GitHub for all my hackathons, university, and personal projects.

Going back I think version control systems and git should be among the first things that a software engineer needs to learn and understand. This is why I teach students git and GitHub at the beginning of all my courses.

## The git expert

Over the course of years I got more advanced at using git and went above "git add, commit, push, pull" commands. _I know engineers who are stuck at this level even after years in the career_.

I became the go-to person when some of my friends or teammates would have to handle some complicated git operations.

A friend of mine would call me every other week and ask me to help him fix a git problem. _Nowadays he doesn't reach out to me anymore as his coding agents solve any git-related problems_.

As you can see from [other articles of mine](/tags/git), I consider myself a proficient git user who can manipulate commits and branches with ease.

![iron-man-hologram](/iron-man-hologram.gif)

I `rebase` and `push --force` multiple times per day[^1].

[^1]: Who says that `--force` is dangerous and forbidden, does not know git.  

I kind of [hate `git merge`](/no-tits-in-git)😅, and promote [Trunk based development](https://trunkbaseddevelopment.com/).

I used [git worktrees](/you-need-to-use-git-worktree) before it became mainstream, and coding agents picked up on it too.

I added [custom aliases](/stop-doing-git-checkout-master-branch) to simplify my workflow.

And now my [.gitconfig](https://github.com/strdr4605/.dotfiles/blob/master/.gitconfig) has a lot of settings that match my needs.

## Problems with git

I encountered a bottleneck in git when trying to explore the [Stacked diffs](https://jg.gg/2018/09/29/stacked-diffs-versus-pull-requests/) concept and trying to do a [Stacked Pull Requests workflow](https://docs.github.com/en/pull-requests/how-tos/stacked-pull-requests) (even before it was a feature in GitHub).

I tried several tools ([ghstack](https://github.com/ezyang/ghstack), [spr](https://github.com/spacedentist/spr)) and eventually created my own scripts: [gh-pr-create-stacked](https://github.com/strdr4605/.dotfiles/blob/master/bin/gh-pr-create-stacked), [git-push-stacked](https://github.com/strdr4605/.dotfiles/blob/master/bin/git-push-stacked). But in the chase to create a perfect git flow and commit history, it was a nightmare to edit, rebase, fix stacked PRs, and maintain a simple workflow. _Even after discovering `git commit --fixup` and [nice git settings](https://github.com/strdr4605/.dotfiles/blob/master/.gitconfig#L22-L25)_.


## Finding the solution

In autumn of 2025 I found out about [GitButler](https://gitbutler.com/), a tool to simplify the work with git, but at that time it was presented as a Desktop app[^2] and, being a terminal guy, I skipped it but was still interested and watching tutorials on their YouTube channel.

[^2]: Nowadays GitButler has a CLI, so who knows, maybe one day I will switch to `but`

One day I saw [Jujutsu | Ep. 5 Bits and Booze](https://www.youtube.com/watch?v=dwyMlLYIrPk) and was very intrigued by this [jj-vcs](https://www.jj-vcs.dev/latest/) alternative to git; one that can use git as backend and allows you to collaborate with teammates that are still using git.

I installed the `jj` CLI and ran `jj git init` to colocate it in the same repo with a work project.

And OMG😱, I felt like one of my students when I teach them `git rebase -i`. All these commands were new to me, I was afraid to run most of them[^3].

[^3]: Especially because I was in the middle of a WIP feature that I did not want to lose 😅

I added the Neovim integration for Jujutsu and even [contributed to it](https://github.com/NicolasGB/jj.nvim/pull/2) but while doing this I encountered a conflict that was hard to understand (in jj workflow) so I decided I'd had enough jj for that day and went back to git.

## Final switch

This year, while building a new project, I decided to challenge myself and not use git[^4]. And created [`jjask`](https://github.com/strdr4605/.dotfiles/blob/master/jj-git-nudge.zsh#L75-L147) headless coding agents helpers to guide me:

```bash
command claude -p \
    --model "$JJ_SUGGEST_MODEL" \
    --output-format text \
    --append-system-prompt 'You are a Jujutsu (jj) expert helping a user accomplish a task in jj. Reply with concrete jj command(s) in a fenced code block, then brief reasoning. Keep it under ~12 lines, no preamble, no closing remarks. Target jj 0.43+ and use CURRENT commands only: prefer `jj new`/`jj edit` (never the deprecated `jj checkout`), `jj bookmark` (not `jj branch`), `jj git fetch`/`jj git push`, `jj describe`/`jj squash`; remote branches are bookmarks like `master@origin`. Do NOT call any tools; answer only from the provided context.' \
    "I want to: ${question}

Here is my current jj state:

${ctx}

What should I do?" </dev/null
```

[^4]: I even mapped the `git` command to a [helper function](https://github.com/strdr4605/.dotfiles/blob/master/jj-git-nudge.zsh#L32-L71) that no longer allowed me to run `git`😄, but it had a recursion bug that ended up spawning multiple headless claude instances so I had to abandon this idea.

To match my current setup (with git worktrees) I created [helper scripts](https://github.com/strdr4605/.dotfiles/blob/master/bin/jj-clone-jjmain-for-workspaces) that allow me to create jj workspaces.

I am still new to `jj` and have a lot to learn

> This is the part that excites me🤩, a new tool that I have the joy of exploring and becoming good at.

Here are some `jj` features that I really like:

### No staging area

Unlike `git`, in `jj` every change is automatically committed into a change and if I need these changes to be in separate commits I can run `jj split` with a very nice TUI:

![jj-split](/jj-split.png)

### Refactor without manual rebasing

When I need to change a previous commit, I don't do `git commit --fixup` or `git rebase -i`, I just run `jj edit -r <change-id>`, do my fixes and then I `jj edit -r <top-change-id>` and jj automatically rebases all changes.

### No need for branches

I consider that branches come and go (created and removed), only commits matter, then why are they almost always required for a normal git flow? With Jujutsu you create branches (bookmarks) at the end of developing when you want to share changes on GitHub. (No more need for temp/test branches).

### Handling conflicts 

In `jj` conflicts are first-class citizens, it records the conflict as a normal conflicted state in commit history instead of forcing you to stop and resolve immediately. You can keep working with conflicted changes and resolve conflicts later whenever you’re ready.

### `jj absorb`

In a stacked PRs scenario you can fix suggestions from multiple PRs in one big change and running `jj absorb` will move independent changes to their related descendant PRs.

## Final thoughts

It's still a long way until I may consider myself good at using jj as I am now with git. And in today's era, where coding agents do most of the manipulation with git and jj, it's hard to learn a proper usage (as it's easy to reach out to agents for help). Who knows, maybe one day I will discover that GitButler is better than jj and I will write another article titled **`"I don't use jj anymore"`** or even **`"I am going back to git"`** 😱🤔.

If you are interested in trying jj or GitButler I strongly suggest giving it a try, but before that, it's worth becoming comfortable with git's lower-level tools, so in rare cases when your company's agents subscription is cancelled/unpaid or APIs time out, you could rebase/bisect/cherry-pick without needing a coding agent.
