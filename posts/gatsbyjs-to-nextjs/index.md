---
title: Moving from GatsbyJS to Next.JS
date: 2022-01-23
description: "This is a story how I moved my website from GastbyJS to Next.JS. What Next.JS plugins I used. How I generated Open Graph Images for Next.JS"
draft: true
---

When I decided to create a personal website for blogging I picked [GatsbyJS](https://www.gatsbyjs.com/) because it was trandy at that time and it is a great solution for static sites. I seached for a minimalistic template and found [LekoArts/gatsby-starter-minimal-blog](https://github.com/LekoArts/gatsby-starter-minimal-blog), amazing theme with a lot of features.

I was happy with it, but over time I started changing the theme, so much that it became almost a custom one. You can check it [here](https://web.archive.org/web/20210714134946/https://strdr4605.github.io/).

I was thinking about creating a new website using [Next.JS](https://nextjs.org/) as I wanted to play with it, but I did not really like any available themes.

I attempted several times to clone and play with Next.JS templates, but after understanding how many features I need, I thought that it will take a lot of time to build from scratch.

## Final decision

While writing a new acticle I was getting ofter an annoying error when dev server was refreshing the page.

> [TypeError: Cannot read property 'title' of null](https://github.com/LekoArts/gatsby-themes/issues/589)

Force page refresh did not help. The only way to get rid of the error was restarting the dev server.
The maintainer releases a new version of the theme with Gatsby v3, but when trying to update, I did not succeed.

Also I decided to buy strdr4605.com domain, so starting with a new website was a good idea.

## How I started

Inspired by https://bearblog.dev/ minimalistic blog I decided to start with a basic example and first add all required features, then thinking about design.

Features:

- `.mdx` _(later I went `.md` as I was not really using `.mdx` features)_
- Slug from post title _(I did not want to break old links)_
- Generate Open Graph image from title _(for link preview)_
- RSS Feed _(as some of my followers may use [CoFeed-19](https://cofeed-19.github.io/))_

I started following [Next.JS Basic example](https://nextjs.org/learn/basics/create-nextjs-app) and got [435 points ✨](https://twitter.com/strdr4605/status/1485390442518753280).

## Challenges

The problems started appearing quickly.

Firstly, my content structure was:

```bash
|____content
| |____posts
| | |____post-folder
| | | |____index.mdx
| | | |____image-from-post.jpg
```

But Next.JS has this:

```bash
|____posts
| |____post-slug.md
|____public
| |____image-from-post.jpg
```

I had to [rename mdx to md](https://www.emgoto.com/md-to-mdx-rename/) and decided to fix images later.

Secondly, the post slug should be generated from title, but there is no simple way to pass both slug and post folder location.

> See [discussion](https://github.com/vercel/next.js/discussions/11272#discussioncomment-94708)

Had to do a hack with a generated cache file with (slug, folder) map.

---

https://phiilu.com/generate-open-graph-images-for-your-static-next-js-site

https://sreetamdas.com/blog/rss-for-nextjs

https://dev.to/kleveland/generating-sharable-content-images-with-open-graph-and-nextjs-4e34

https://www.tarynewens.com/posts/moving-my-site-from-gatsby-to-nextjs/
