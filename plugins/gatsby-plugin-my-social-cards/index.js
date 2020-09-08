const path = require("path");
const jimp = require("jimp");
const kebabCase = require("lodash.kebabcase");

module.exports = async ({ markdownNode }) => {
  // console.log({ markdownNode });

  const { frontmatter } = markdownNode;

  const slug = frontmatter.slug || kebabCase(frontmatter.title);

  if (slug) {
    const output = path.join("./public", slug, "post-banner.jpg");
    const baseImg = "post-banner-template.jpg";
    const imgWidth = 1200;
    const imgHeight = 630;
    const x = 100;
    const y = 150;

    const [image, montserrat] = await Promise.all([
      jimp.read(path.join(__dirname, baseImg)),
      jimp.loadFont(path.join(__dirname, "./fonts/montserrat.fnt")),
    ]);

    image
      .resize(imgWidth, imgHeight)
      .print(
        montserrat,
        x,
        y,
        {
          text: frontmatter.title,
          alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: jimp.VERTICAL_ALIGN_MIDDLE,
        },
        1000,
        179
      )
      .write(output);
  }

  return;
};
