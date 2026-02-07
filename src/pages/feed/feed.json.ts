import type { APIRoute } from 'astro';
import { generateFeed } from '../../lib/feed';

export const GET: APIRoute = async () => {
  const feed = await generateFeed();
  return new Response(feed.json1(), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
