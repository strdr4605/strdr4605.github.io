const fs = require("fs");
const path = require("path");
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

module.exports = { getSortedPostsData };
