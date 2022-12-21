const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const kebabCase = require("lodash.kebabcase");
const externalPosts = require("../external-posts.json");

const postsDirectory = path.join(process.cwd(), "posts");

function getMDContent(markdownFile) {
  // Read markdown file as string
  const fullPath = path.join(postsDirectory, markdownFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return fileContents;
}

/**
 * @typedef {import("../lib/types").PostData} PostData
 */

/**
 * @returns {PostData[]}
 */
function getSortedPostsData(includeDraft = false) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((folderName) => {
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
    .concat(externalPosts)
    .filter((p) => includeDraft || !p.draft)
    .sort(({ date: a }, { date: b }) => {
      const aDate = new Date(a);
      const bDate = new Date(b);
      if (aDate < bDate) {
        return 1;
      } else if (aDate > bDate) {
        return -1;
      } else {
        return 0;
      }
    });
}

module.exports = { getSortedPostsData, postsDirectory, getMDContent };
