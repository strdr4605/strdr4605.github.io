import fs from "fs";
import path from "path";
import matter from "gray-matter";
import kebabCase from "lodash.kebabcase";
import { remark } from "remark";
import html from "remark-html";
import prism from "remark-prism";
import remarkGfm from "remark-gfm";

const postsDirectory = path.join(process.cwd(), "posts");

function getMDContent(markdownFile: string): string {
  // Read markdown file as string
  const fullPath = path.join(postsDirectory, markdownFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return fileContents;
}

export type PostData = {
  date: Date | string;
  title: string;
  description: string;
  draft?: boolean;
  starred?: boolean;
  banner?: string;
  slug: string;
  tags: string[];
  contentHtml: string;
};

export function getSortedPostsData(): PostData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostData[] = fileNames.map((folderName) => {
    const fileContents = getMDContent(folderName);

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      ...matterResult.data,
      slug: matterResult.data.slug || kebabCase(matterResult.data.title),
    } as PostData;
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

export type PostFolderName = { folderName: string; postSlug: string };

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
      // transformInlineCode: true,
      // plugins: [
      //   "autolinker",
      //   "command-line",
      //   "data-uri-highlight",
      //   "diff-highlight",
      //   "inline-color",
      //   "keep-markup",
      //   "line-numbers",
      //   "show-invisibles",
      //   "treeview",
      // ],
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
