const fs = require("fs");
const path = require("path");
const Feed = require("feed").Feed;
const matter = require("gray-matter");
const kebabCase = require("lodash.kebabcase");

const postsDirectory = path.join(process.cwd(), "posts");

function getMDContent(folderName) {
  const markdownFile = folderName + "/index.md";
  // Read markdown file as string
  const fullPath = path.join(postsDirectory, markdownFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return fileContents;
}

function getSortedPostsData() {
  // Get file names under /posts
  const folderNames = fs.readdirSync(postsDirectory);
  const allPostsData = folderNames.map((folderName) => {
    const fileContents = getMDContent(folderName);

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      ...matterResult.data,
      slug: matterResult.data.slug || kebabCase(matterResult.data.title),
    };
  });
  // Sort posts by date
  return allPostsData
    .filter((p) => !p.draft)
    .sort(({ date: a }, { date: b }) => {
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      } else {
        return 0;
      }
    });
}

const buildFeed = async () => {
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
