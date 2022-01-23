const jimp = require("jimp");
const getSortedPostsData = require("./utils").getSortedPostsData;

async function writePostOGImage(postTitle, postSlug) {
  const output = "./out/" + postSlug + ".jpg";
  const baseImg = "./public/post-banner-template.jpg";
  const imgWidth = 1200;
  const imgHeight = 630;
  const x = 100;
  const y = 150;

  const [image, montserrat] = await Promise.all([
    jimp.read(baseImg),
    jimp.loadFont("./public/fonts/montserrat.fnt"),
  ]);

  image
    .resize(imgWidth, imgHeight)
    .print(
      montserrat,
      x,
      y,
      {
        text: postTitle,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: jimp.VERTICAL_ALIGN_MIDDLE,
      },
      1000,
      179
    )
    .write(output);
}

async function generatePostsOGImages() {
  const postsData = await getSortedPostsData();
  postsData.forEach((postData) =>
    writePostOGImage(postData.title, postData.slug)
  );
}

generatePostsOGImages();
