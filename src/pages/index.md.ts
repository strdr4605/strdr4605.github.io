import type { APIRoute } from 'astro';
import { buildPostListMarkdown, getSortedPosts } from '../lib/posts';

export const GET: APIRoute = async () => {
  const posts = await getSortedPosts();

  const body = [
    '---',
    'title: "Dragoș Străinu\'s blog"',
    'description: "Personal blog by Dragoș Străinu, a Full Stack Software Engineer, about development, developer tools, git workflows, vim, hackathons, and open-source."',
    '---',
    '',
    '# Blog Posts',
    '',
    buildPostListMarkdown(posts),
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
