#!/usr/bin/env node
// ───────────────────────────────────────────────────────────────────────────
//  add-blog.mjs  ·  Add a LinkedIn post to the portfolio Blogs section.
//
//  Usage:
//      node scripts/add-blog.mjs "<linkedin-post-url-or-activity-id>"
//      npm run blog:add -- "<linkedin-post-url>"
//
//  It fetches the post's public embed, pulls the first line (title), the
//  hero image and the date (decoded from the post id), saves the image to
//  /public/blog, and prepends an entry to src/data/blogs.json. Idempotent:
//  re-running with an already-added post is a no-op.
//
//  Flags:
//      --force   add even if the post is older than the "Nine GitLab
//                projects" boundary (by default older posts are rejected).
//
//  No dependencies, no credentials. Needs Node 18+ (global fetch).
// ───────────────────────────────────────────────────────────────────────────

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = join(ROOT, "src", "data", "blogs.json");
const IMAGE_DIR = join(ROOT, "public", "blog");

// Only posts from "Nine GitLab projects" onward belong in the blog.
const BOUNDARY_ID = 7505062396877582336n;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const args = process.argv.slice(2);
const force = args.includes("--force");
const input = args.find((a) => !a.startsWith("--"));

function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

if (!input) {
  fail(
    'Pass a LinkedIn post URL or activity id.\n' +
      '  e.g. node scripts/add-blog.mjs "https://www.linkedin.com/posts/..-activity-7524048485004783616-xxxx"'
  );
}

/** Pull the 19-ish digit activity id out of a URL or raw id. */
function parseActivityId(str) {
  const m = str.match(/(?:activity[-:]|urn:li:activity:)(\d{10,25})/);
  if (m) return m[1];
  const bare = str.match(/^\s*(\d{10,25})\s*$/);
  if (bare) return bare[1];
  return null;
}

/** Decode HTML entities that appear in meta/content attributes. */
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)));
}

/** Normalize LinkedIn "bold/italic" unicode glyphs back to plain ASCII. */
function normalizeText(s) {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").trim();
}

/** Date label from a LinkedIn activity id (ms = id >> 22). */
function dateFromId(id) {
  const ms = Number(BigInt(id) >> 22n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** First meaningful line of the post → the card title. */
function titleFromDescription(desc) {
  const lines = desc
    .split(/\r?\n/)
    .map((l) => normalizeText(l))
    .filter(Boolean);
  // Prefer the first line that isn't only hashtags.
  const real = lines.find((l) => !/^(#[\w-]+\s*)+$/.test(l));
  let title = real || lines[0] || "Untitled post";
  if (title.length > 160) title = title.slice(0, 157).trimEnd() + "…";
  return title;
}

/** Pick the best hero image rendition found in the embed HTML. */
function pickImage(html) {
  const urls = Array.from(
    new Set((html.match(/https:\/\/media\.licdn\.com\/dms\/image\/[^"\\ ]+/g) || []))
  ).map((u) => decodeEntities(u));
  const rank = (u) => {
    if (/feedshare-image-high-res/.test(u)) return 100;
    if (/feedshare-shrink_1280/.test(u)) return 90;
    if (/feedshare-shrink_800/.test(u)) return 80;
    if (/image-high-res/.test(u)) return 75;
    if (/image-shrink_1280/.test(u)) return 70;
    if (/image-shrink_800/.test(u)) return 60;
    if (/videocover-high/.test(u)) return 50;
    if (/feedshare-shrink_480/.test(u)) return 40;
    return 10;
  };
  urls.sort((a, b) => rank(b) - rank(a));
  if (urls.length) return urls[0];
  // Fallback: og:image (may be a video thumbnail host).
  const og = html.match(/<meta property="og:image" content="([^"]+)"/);
  return og ? decodeEntities(og[1]) : null;
}

function slugify(title, taken) {
  let base = title
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .split("-")
    .slice(0, 7)
    .join("-")
    .slice(0, 48)
    .replace(/-+$/g, "");
  if (!base) base = "post";
  let slug = base;
  let n = 2;
  while (taken.has(slug)) slug = `${base}-${n++}`;
  return slug;
}

async function main() {
  const id = parseActivityId(input);
  if (!id) fail(`Could not find an activity id in: ${input}`);

  if (!force && BigInt(id) < BOUNDARY_ID) {
    fail(
      `Post ${id} is older than the "Nine GitLab projects" boundary, so it was skipped.\n` +
        `  Re-run with --force if you really want to add it.`
    );
  }

  const blogs = JSON.parse(await readFile(DATA_FILE, "utf8"));
  if (blogs.some((b) => b.urn === id)) {
    console.log(`\n✓ Post ${id} is already in the blog — nothing to do.\n`);
    return;
  }

  const embedUrl = `https://www.linkedin.com/embed/feed/update/urn:li:activity:${id}`;
  console.log(`→ Fetching ${embedUrl}`);
  const res = await fetch(embedUrl, { headers: { "user-agent": UA } });
  if (!res.ok) {
    fail(
      `LinkedIn returned HTTP ${res.status} for the embed.\n` +
        `  LinkedIn sometimes blocks automated requests (status 999). ` +
        `If this keeps happening in CI, run the command locally instead.`
    );
  }
  const html = await res.text();

  const descMatch = html.match(/<meta name="description" content="([\s\S]*?)">/);
  if (!descMatch) fail("Could not read the post text from the embed.");
  const desc = decodeEntities(descMatch[1]);
  const title = titleFromDescription(desc);
  const date = dateFromId(id);

  const imageUrl = pickImage(html);
  if (!imageUrl) fail("Could not find a preview image for this post.");

  const taken = new Set(blogs.map((b) => b.slug));
  const slug = slugify(title, taken);
  const imageName = `${slug}.jpg`;

  console.log(`→ Downloading image ${imageUrl.slice(0, 80)}…`);
  const imgRes = await fetch(imageUrl, { headers: { "user-agent": UA } });
  if (!imgRes.ok) fail(`Image download failed: HTTP ${imgRes.status}`);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  if (buf.length < 500) fail(`Image looks empty (${buf.length} bytes).`);
  await writeFile(join(IMAGE_DIR, imageName), buf);

  const entry = { slug, title, urn: id, image: `/blog/${imageName}`, date };
  blogs.push(entry);
  // Newest first by activity id (ids are monotonic over time).
  blogs.sort((a, b) => (BigInt(b.urn) > BigInt(a.urn) ? 1 : -1));
  await writeFile(DATA_FILE, JSON.stringify(blogs, null, 2) + "\n");

  console.log(`\n✓ Added blog post\n`);
  console.log(`  title : ${title}`);
  console.log(`  date  : ${date}`);
  console.log(`  image : public/blog/${imageName} (${buf.length} bytes)`);
  console.log(`  slug  : ${slug}`);
  console.log(`\n  ${blogs.length} posts in src/data/blogs.json. Commit & push to deploy.\n`);
}

main().catch((e) => fail(e.stack || String(e)));
