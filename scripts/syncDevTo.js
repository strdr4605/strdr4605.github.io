// Sync the blog posts to dev.to. Every post gets a canonical URL back to the blog.
// Usage: DEVTO_API_KEY=xxx node scripts/syncDevTo.js [posts/a.md posts/b.md]
// Without a file, all posts are processed.
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import matter from "gray-matter";

const SITE = "https://strdr4605.com";
const API = "https://dev.to/api/articles";
const postsDirectory = path.join(process.cwd(), "posts");

const key = process.env.DEVTO_API_KEY;
if (!key) {
  console.error(
    "Missing DEVTO_API_KEY. Get one at https://dev.to/settings/extensions",
  );
  process.exit(1);
}

async function api(url, method, body) {
  const res = await fetch(url, {
    method,
    headers: { "api-key": key, "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  // dev.to rate limits at 30 requests per 30 seconds.
  if (res.status === 429) {
    const wait = Number(res.headers.get("x-rate-limit-reset") || 30) * 1000;
    await new Promise((r) => setTimeout(r, wait + 1000));
    return api(url, method, body);
  }

  if (!res.ok) {
    console.error(res.status, await res.text());
    process.exit(1);
  }
  return res.json();
}

// dev.to cannot resolve the blog-relative asset paths.
function toBody(content) {
  let body = content
    .replace(/\]\(\/([^)]+)\)/g, `](${SITE}/$1)`)
    .replace(/src="\/([^"]+)"/g, `src="${SITE}/$1"`)
    .replace(/poster="\/([^"]+)"/g, `poster="${SITE}/$1"`);

  // Relative image paths, such as "shot.gif#small".
  body = body.replace(
    /\]\((?!https?:\/\/|\/)([^)]+\.(?:png|jpg|jpeg|gif|webp|svg)(?:#\w+)?)\)/g,
    (m, path) => `](${SITE}/${path.replace(/#\w+$/, "")})`,
  );

  // "#wide" and "#small" are Astro image helpers, not part of the file name.
  body = body.replace(/\.(png|jpg|jpeg|gif|webp|svg)#\w+/g, ".$1");

  // dev.to renders no <video> tag. Point to the file instead.
  body = body.replace(
    /<video[^>]*>\s*(<source[^>]*\/>)\s*<\/video>/g,
    (m, source) =>
      `[Watch the recording](${(source.match(/src="([^"]+)"/) || [])[1] || ""})`,
  );

  // HTML comments do not render on dev.to.
  return body.replace(/<!--[\s\S]*?-->/g, "");
}

// dev.to rules: 1 to 4 tags, each 30 characters max, alphanumeric only (no dashes).
// Description: 128 characters max.
function toArticle(data, body) {
  const tags = (data.tags || [])
    .map((t) => t.toLowerCase().replace(/[^a-z0-9]/g, ""))
    .filter(Boolean)
    .slice(0, 4);

  return {
    title: data.title,
    body_markdown: body,
    published: !data.draft,
    canonical_url: `${SITE}/${data.slug}`,
    tags,
    description: (data.description || "").slice(0, 128) || undefined,
    cover_image: data.banner ? `${SITE}/${data.banner}` : undefined,
  };
}

// dev.to reads canonical_url from YAML front matter in the body, so the body wins.
// Rewrite the front matter when the article has one.
function fixFrontMatter(body, article) {
  const match = body.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return body;

  let front = match[1];
  if (/^canonical_url:/m.test(front)) {
    front = front.replace(
      /^canonical_url:.*$/m,
      `canonical_url: ${article.canonical_url}`,
    );
  } else {
    front += `\ncanonical_url: ${article.canonical_url}`;
  }

  return `---\n${front}\n---\n` + body.slice(match[0].length);
}

// Find the dev.to article for a post: by title, then by canonical slug, then by dev.to url slug.
function findExisting(existing, post) {
  const slug = post.data.slug;
  const title = (post.data.title || "").trim().toLowerCase();
  const byTitle = existing.find((a) => a.title.trim().toLowerCase() === title);
  if (byTitle) return byTitle;

  const byCanonical = existing.find((a) =>
    (a.canonical_url || "").endsWith("/" + slug),
  );
  if (byCanonical) return byCanonical;

  return existing.find((a) =>
    new URL(a.url).pathname.split("/").pop().startsWith(slug),
  );
}

// Change the canonical URL only when it points at one of the author's own sites.
function ownCanonical(current) {
  return (
    !current ||
    current.includes("strdr4605.com/") ||
    current.includes("strdr4605.github.io/") ||
    current.includes("dev.to/strdr4605/")
  );
}

// dev.to allows 30 requests per 30 seconds. Keep the pace under that limit.
const sleep = () => new Promise((r) => setTimeout(r, 1200));

// Usage: DEVTO_API_KEY=xxx node scripts/syncDevTo.js [posts/a.md posts/b.md] [--body]
// --body overwrites the dev.to body with the local post. Use it only for articles
// that dev.to got from this script, because a manual edit on dev.to is lost.
const forceBody = process.argv.includes("--body");

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));

// In CI, sync only the posts that changed in the push.
function changedPosts() {
  const before = process.env.DEVTO_DIFF_BEFORE;
  const after = process.env.DEVTO_DIFF_AFTER || "HEAD";

  // A new branch push has no previous commit to diff against.
  if (!before || /^0+$/.test(before)) return [];

  const out = execSync(`git diff --name-only ${before} ${after} -- posts`, {
    encoding: "utf8",
  });

  return out
    .split("\n")
    .filter(Boolean)
    .map((f) => path.join(process.cwd(), f))
    .filter((f) => fs.existsSync(f));
}

const files =
  args.length > 0
    ? args
    : process.env.DEVTO_DIFF_BEFORE
      ? changedPosts()
      : fs.readdirSync(postsDirectory).map((f) => path.join(postsDirectory, f));

if (files.length === 0) {
  console.log("no posts to sync");
  process.exit(0);
}

const existing = await api(`${API}/me?per_page=1000`, "GET");

for (const file of files) {
  const post = matter(fs.readFileSync(file, "utf8"));
  if (post.data.draft) {
    console.log(`skipped  ${post.data.slug} (draft)`);
    continue;
  }
  const found = findExisting(existing, post);

  if (found) {
    // Update the canonical URL only. The dev.to body may hold manual edits.
    if (!ownCanonical(found.canonical_url)) {
      console.log(
        `kept     ${post.data.slug} (canonical: ${found.canonical_url})`,
      );
      continue;
    }

    const body = forceBody
      ? toBody(post.content)
      : fixFrontMatter(found.body_markdown, {
          canonical_url: `${SITE}/${post.data.slug}`,
        });

    await api(`${API}/${found.id}`, "PUT", {
      article: {
        canonical_url: `${SITE}/${post.data.slug}`,
        published: !post.data.draft,
        body_markdown: body,
      },
    });
    console.log(`updated  ${post.data.slug} -> ${found.url}`);
    await sleep();
    continue;
  }

  const created = await api(API, "POST", {
    article: toArticle(post.data, toBody(post.content)),
  });
  console.log(`created  ${post.data.slug} -> ${created.url}`);
  await sleep();
}
