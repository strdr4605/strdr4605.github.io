---
title: "My first open-source project"
date: 2019-05-29
slug: my-first-open-source-project
description: "How I created mockingcase, a beginner-friendly npm package that converts strings to mOcKiNgCaSe, and what I learned about open-source contribution."
tags:
  - open-source
  - github
---

> Originally posted on [dev.to](https://dev.to/strdr4605/my-first-open-source-project-35ka).

## Preface

When I started University I participated in my first Hackathon. And from that day I understood that I really enjoy building things and contributing together with other people. Participating at hackathons I primordially used *JavaScript* as it is a perfect language to develop fast prototypes. I used a lot of open-source libraries and tools and at some point, I wanted to also contribute to any project as I thought that contributing will help me to raise my developing skills.

So occasionally I was trying to find a project on *GitHub* there I can contribute. And I faced the problem that I think everyone who is trying to contribute had. The problem is finding the right project and the issue that you can solve. I was surfing sites like https://up-for-grabs.net/ and others searching for a *JavaScript* library or package where I can contribute. In most cases even if the issues were labeled with *good first issue* or *first-timers-only* they involved a deep understanding of the project. And in cases where I found something that I can implement other contributors were already working on the issue.

In the end, I contributed to a project by updating the README and at that time it was an achievement for me :tada:. But I wanted to contribute with code so my first code contribution was (as I suggesting) converting the SVG clock logo to a real-time clock for http://rebble.io/. It was my next achievement. But I was still looking at something interesting to contribute. But everything changed when I created my first npm package.

## mOcKiNgCaSe

The idea of the package came to me after explaining to someone the differences between `camelCase`, `snake_case`, `kebab-case`. I remembered the [mocking spongebob](https://knowyourmeme.com/memes/mocking-spongebob) meme and did a quick research to see if there isn't such package already.

The purpose of the package is to change a `string` to `sTrInG`. I thought about naming it ***spongebobcase*** but in the end, decided to stick with ***mockingcase*** as it sounds better(in my and friends opinions). Later I found an article on Wikipedia [Studly caps](https://en.wikipedia.org/wiki/Studly_caps) which explains about this case.
So in one or two days I already published the first version of the [mOcKiNgCaSe](https://www.npmjs.com/package/@strdr4605/mockingcase) on npm. Even at that point, I learned a lot about **[semantic versioning](https://semver.org/)** and publishing npm packages.

Quickly after I made a post on [reddit.com/r/javascript/](https://www.reddit.com/r/javascript/comments/9ytkno/my_first_npm_package/) to see people opinions. Some of them reproached me because I made a useless package, some praised me because I learned something new and others just liked the idea of the package itself and it even received some [🌟 on GitHub](https://github.com/strdr4605/mockingcase/stargazers). People who liked the package started contributing to it, like adding unit tests and optimizing the converting function.
I decided that I will add more features even if it looked over-engineering for such kind of package. I thought about some features that can be added and opened the issues in the [repo](https://github.com/strdr4605/mockingcase/issues?q=is%3Aissue+is%3Aclosed+label%3A%22help+wanted%22) and added the project on the https://up-for-grabs.net/ so others can contribute too.

As the package itself and the features that should be implemented aren't so difficult, this open-source project is very beginner friendly. At the moment the project has already 11 contributors who did a lot of good work and really improved the package. Contributing to this projects teaches you about software versioning, unit testing, continuous integration, declaration files for *TypeScript*, documentation but also a lot of interesting things about *JavaScript* and development itself. I even created [mockingcase bindings](https://redex.github.io/package/unpublished/strdr4605/bs-mockingcase/) for [ReasonML](https://reasonml.github.io/).

> If you are interested you can check the documentation of the package on GitHub [mockingcase](https://github.com/strdr4605/mockingcase).

You decide if you like the package and if it is somehow useful in your point of view. But as I think it can be used as a joke to display funny messages or errors to users. The important feature (in my opinion) that will raise the popularity of this package is [changes all text on an HTML page](https://github.com/strdr4605/mockingcase/issues/37) which will let developers use this package as a 1st April joke for their web application.

## Conclusion

Even if it may look like a useless project to someone, I learned a lot during the development of it and also gave others beginner contributors a chance to make their first contribution to open-source. So I encourage you to start contributing to open-source as it is an amazing experience.
