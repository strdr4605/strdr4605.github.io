import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const siteUrl = "https://strdr4605.com";

export const GET: APIRoute = async () => {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  const sortedPosts = posts
    .map((post) => ({
      slug: post.data.slug,
      date: post.data.date,
      title: post.data.title,
      description: post.data.description,
      tags: post.data.tags,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const tagSet = new Set<string>();
  for (const post of sortedPosts) {
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
    ...sortedPosts.map(
      (post) =>
        `- [${post.title}](${siteUrl}/${post.slug})${post.description ? `: ${post.description}` : ""}`,
    ),
    "",
    `## Tags`,
    "",
    ...tags.map((tag) => `- [${tag}](${siteUrl}/tags/${tag})`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
