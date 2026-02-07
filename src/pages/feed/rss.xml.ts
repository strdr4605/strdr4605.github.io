import type { APIRoute } from 'astro';
import { generateFeed } from '../../lib/feed';

export const GET: APIRoute = async () => {
  const feed = await generateFeed();
  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
