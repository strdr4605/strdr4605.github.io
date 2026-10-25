import type { APIRoute } from "astro";
import { buildPostListMarkdown, getSortedPosts } from "../lib/posts";

const siteUrl = "https://strdr4605.com";

export const GET: APIRoute = async () => {
  const posts = await getSortedPosts();

  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  const tags = [...tagSet].sort();

  const lines: string[] = [
    `# Dragoș Străinu's Blog`,
    "",
    `> Personal blog by Dragoș Străinu, a Full Stack Software Engineer, about development, developer tools, git workflows, vim, hackathons, and open-source.`,
    "",
    `## Blog Posts`,
    "",
    buildPostListMarkdown(posts),
    "",
    `## Tags`,
    "",
    ...tags.map((tag) => `- [${tag}](${siteUrl}/tags/${tag})`),
    "",
    `## Markdown`,
    "",
    "Every page has a markdown version. Add `.md` to a post URL, for example `https://strdr4605.com/how-i-use-git.md`. The blog index is at `https://strdr4605.com/index.md`.",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
