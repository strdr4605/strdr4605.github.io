const jimp = require("jimp");

export async function generateImageBuffer(title: string): Promise<Buffer> {
  const baseImg = "./public/post-banner-template.jpg";
  const imgWidth = 1200;
  const imgHeight = 630;
  const x = 100;
  const y = 150;

  const [image, montserrat] = await Promise.all([
    jimp.read(baseImg),
    jimp.loadFont("./public/fonts/montserrat.fnt"),
  ]);

  return image
    .resize(imgWidth, imgHeight)
    .print(
      montserrat,
      x,
      y,
      {
        text: title,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: jimp.VERTICAL_ALIGN_MIDDLE,
      },
      1000,
      179
    )
    .getBufferAsync(jimp.MIME_JPEG);
}
