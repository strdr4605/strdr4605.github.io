import sharp from "sharp";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

function getSortedPostsData(includeDraft = false) {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      ...matterResult.data,
      slug: matterResult.data.slug,
    };
  });

  return allPostsData
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

function wrapText(text, maxCharsPerLine = 35) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    if (current && (current + " " + word).length > maxCharsPerLine) {
      lines.push(current);
      current = word;
    } else {
      current = current ? current + " " + word : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function writePostOGImage(postTitle, postSlug) {
  const output = "./out/" + postSlug + ".jpg";
  const baseImg = "./public/post-banner-template.jpg";

  const lines = wrapText(postTitle);
  const lineHeight = 52;
  const startY = 240 - (lines.length * lineHeight) / 2;

  const textSvg = `<svg width="1200" height="630">
    <style>
      text { font-family: sans-serif; font-size: 40px; font-weight: bold; fill: #333; }
    </style>
    ${lines.map((line, i) => `<text x="600" y="${startY + i * lineHeight}" text-anchor="middle">${line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")}</text>`).join("\n    ")}
  </svg>`;

  await sharp(baseImg)
    .resize(1200, 630)
    .composite([{ input: Buffer.from(textSvg), top: 0, left: 0 }])
    .jpeg({ quality: 80 })
    .toFile(output);
}

async function generatePostsOGImages() {
  const postsData = getSortedPostsData(true);
  for (const postData of postsData.filter((p) => p.slug)) {
    await writePostOGImage(postData.title, postData.slug);
  }
}

generatePostsOGImages();
