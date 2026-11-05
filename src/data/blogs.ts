// ─────────────────────────────────────────────────────────────────────────
//  BLOGS  ·  mirrored from LinkedIn (www.linkedin.com/in/jeston-singh)
// ─────────────────────────────────────────────────────────────────────────
//  The post list lives in ./blogs.json so it can be updated automatically.
//  To add a post, don't edit this file — run:
//
//      npm run blog:add "<linkedin-post-url>"
//
//  (or trigger the "Add LinkedIn blog" GitHub Action with the post URL).
//  That fetches the title, image and date, drops the image in /public/blog,
//  and prepends the entry to blogs.json. Clicking a card opens the live
//  LinkedIn post (via `urn`), so the content is mirrored, never retyped.

import blogsData from "./blogs.json";

export type Blog = {
  slug: string;
  /** First line of the post; shown on the card, truncated to one line. */
  title: string;
  /** LinkedIn activity id — drives the embed iframe. */
  urn: string;
  /** Local preview image under /public/blog. */
  image: string;
  /** Display date (decoded from the post's activity id). */
  date: string;
};

/** Newest first. Everything here is from "Nine GitLab projects" onward. */
export const blogs: Blog[] = blogsData as Blog[];

/** The live LinkedIn embed URL for a post. */
export function blogEmbedUrl(urn: string): string {
  return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${urn}`;
}

/** The canonical LinkedIn permalink for a post ("View on LinkedIn"). */
export function blogPostUrl(urn: string): string {
  return `https://www.linkedin.com/feed/update/urn:li:activity:${urn}/`;
}
