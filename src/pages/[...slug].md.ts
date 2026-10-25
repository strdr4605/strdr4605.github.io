import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts');

  return posts.map((post) => ({
    params: { slug: post.data.slug ?? post.id },
    props: { post },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { post } = props;

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(post.data.title)}`,
    `date: ${post.data.date.toISOString()}`,
    `tags: [${post.data.tags.map((tag) => JSON.stringify(tag)).join(', ')}]`,
    ...(post.data.description
      ? [`description: ${JSON.stringify(post.data.description)}`]
      : []),
    '---',
    '',
  ].join('\n');

  return new Response(frontmatter + (post.body ?? ''), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
