import fs from "fs";
import path from "path";
import matter from "gray-matter";
import kebabCase from "lodash.kebabcase";
import { remark } from "remark";
import html from "remark-html";
import prism from "remark-prism";
import remarkGfm from "remark-gfm";
import { getMDContent, postsDirectory } from "../scripts/utils";
import { PostData, PostFolderName } from "./types";

export function getAllPostFolderNames(): PostFolderName[] {
  // Get file names under /posts
  const folderNames = fs.readdirSync(postsDirectory);
  return folderNames.map((folderName) => {
    const fileContents = getMDContent(folderName);

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    return {
      folderName,
      postSlug: matterResult.data.slug || kebabCase(matterResult.data.title),
    };
  });
}

export async function getPostData(folderName: string): Promise<PostData> {
  const fileContents = getMDContent(folderName);

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .use(prism as any, {
      transformInlineCode: true,
      plugins: ["diff-highlight"],
    })
    .use(remarkGfm)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    ...matterResult.data,
    slug: matterResult.data.slug || kebabCase(matterResult.data.title),
    contentHtml,
  } as PostData;
}

export { getSortedPostsData } from "../scripts/utils";
