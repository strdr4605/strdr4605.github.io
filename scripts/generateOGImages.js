import { Jimp, loadFont, HorizontalAlign, VerticalAlign } from "jimp";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import kebabCase from "lodash.kebabcase";

const postsDirectory = path.join(process.cwd(), "posts");

function getSortedPostsData(includeDraft = false) {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      ...matterResult.data,
      slug: matterResult.data.slug || kebabCase(matterResult.data.title),
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

async function writePostOGImage(postTitle, postSlug) {
  const output = "./out/" + postSlug + ".jpg";
  const baseImg = "./public/post-banner-template.jpg";
  const imgWidth = 1200;
  const imgHeight = 630;
  const x = 100;
  const y = 150;

  const [image, montserrat] = await Promise.all([
    Jimp.read(baseImg),
    loadFont("./public/fonts/montserrat.fnt"),
  ]);

  image
    .resize({ w: imgWidth, h: imgHeight })
    .print({
      font: montserrat,
      x,
      y,
      text: {
        text: postTitle,
        alignmentX: HorizontalAlign.CENTER,
        alignmentY: VerticalAlign.MIDDLE,
      },
      maxWidth: 1000,
      maxHeight: 179,
    })
    .write(output);
}

async function generatePostsOGImages() {
  const postsData = getSortedPostsData(true);
  for (const postData of postsData.filter((p) => p.slug)) {
    await writePostOGImage(postData.title, postData.slug);
  }
}

generatePostsOGImages();
