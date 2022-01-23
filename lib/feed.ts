import fs from "fs";
import { Feed } from "feed";
import { getSortedPostsData } from "./posts";
export const buildFeed = async () => {
  const posts = await getSortedPostsData();
  const siteURL = process.env.SITE_URL;
  const date = new Date();
  const author = {
    name: "Dragos Strainu",
    email: "str.dr460@gmail.com",
    link: "https://twitter.com/strdr4605",
  };
  const feed = new Feed({
    title: "Dragos Strainu' blog",
    description: "",
    id: siteURL || "https://strdr4605.com",
    link: siteURL,
    image: `${siteURL}/banner.svg`,
    favicon: `${siteURL}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Dragos Strainu`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
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
  return feed;
};
