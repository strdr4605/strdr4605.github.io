import { NextApiRequest, NextApiResponse } from "next";
import { generateImageBuffer } from "../../../lib/generateOGImage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postTitle } = req.query;

  const imageBuffer = await generateImageBuffer(postTitle as string);
  res.setHeader("Content-Type", "image/jpg");
  res.send(imageBuffer);
}
