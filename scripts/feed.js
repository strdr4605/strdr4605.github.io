const fs = require("fs");
const Feed = require("feed").Feed;
const getSortedPostsData = require("./utils").getSortedPostsData;

const buildFeed = async () => {
  const posts = await getSortedPostsData();
  const siteURL = process.env.SITE_URL || "https://strdr4605.com";
  const date = new Date();
  const author = {
    name: "Dragoș Străinu",
    email: "str.dr4605@gmail.com",
    link: "https://twitter.com/strdr4605",
  };
  const feed = new Feed({
    title: "Dragoș Străinu's blog",
    description: "I am Dragoș (Dragosh), a Front-end Software Engineer, Hackathoner, OSS enthusiast.",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/banner.jpg`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Dragoș Străinu`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/feed/rss.xml`,
      json: `${siteURL}/feed/feed.json`,
      atom: `${siteURL}/feed/atom.xml`,
    },
    author,
  });
  posts.forEach((post) => {
    const url = `${siteURL}/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.description,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  });
  fs.mkdirSync("./out/feed", { recursive: true });
  fs.writeFileSync("./out/feed/rss.xml", feed.rss2());
  fs.writeFileSync("./out/feed/atom.xml", feed.atom1());
  fs.writeFileSync("./out/feed/feed.json", feed.json1());
};

buildFeed();
