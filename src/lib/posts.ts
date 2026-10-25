import { getCollection } from 'astro:content';

const siteUrl = 'https://strdr4605.com';

export type PostSummary = {
  slug: string;
  date: Date;
  title: string;
  description?: string;
  tags: string[];
};

export async function getSortedPosts(): Promise<PostSummary[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  return posts
    .map((post) => ({
      slug: post.data.slug ?? post.id,
      date: post.data.date,
      title: post.data.title,
      description: post.data.description ?? undefined,
      tags: post.data.tags,
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function buildPostListMarkdown(posts: PostSummary[]): string {
  return posts
    .map(
      (post) =>
        `- [${post.title}](${siteUrl}/${post.slug})${post.description ? `: ${post.description}` : ''}`,
    )
    .join('\n');
}
