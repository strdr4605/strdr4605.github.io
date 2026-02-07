import { getCollection } from 'astro:content';
import { Feed } from 'feed';
import kebabCase from 'lodash.kebabcase';
import externalPosts from '../../external-posts.json';

const siteURL = 'https://strdr4605.com';

export async function generateFeed() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  type PostItem = {
    slug: string;
    date: Date | string;
    title: string;
    description?: string;
    externalLink?: string;
  };

  const allPosts: PostItem[] = [
    ...posts.map((post) => ({
      slug: post.data.slug || kebabCase(post.data.title),
      date: post.data.date,
      title: post.data.title,
      description: post.data.description,
    })),
    ...externalPosts.map((post) => ({
      slug: '',
      date: post.date,
      title: post.title,
      externalLink: post.externalLink,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const date = new Date();
  const author = {
    name: 'Dragoș Străinu',
    email: 'str.dr4605@gmail.com',
    link: 'https://twitter.com/strdr4605',
  };

  const feed = new Feed({
    title: "Dragoș Străinu's blog",
    description:
      'I am Dragoș (Dragosh), a Front-end Software Engineer, Hackathoner, OSS enthusiast.',
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/banner.jpg`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Dragoș Străinu`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteURL}/feed/rss.xml`,
      json: `${siteURL}/feed/feed.json`,
      atom: `${siteURL}/feed/atom.xml`,
    },
    author,
  });

  allPosts.forEach((post) => {
    const url = post.externalLink || `${siteURL}/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.description,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  });

  return feed;
}
