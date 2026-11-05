// ─────────────────────────────────────────────────────────────────────────
//  BLOGS  ·  mirrored from LinkedIn (www.linkedin.com/in/jeston-singh)
// ─────────────────────────────────────────────────────────────────────────
//  Each entry maps to one LinkedIn post. The card shows `image` + `title`;
//  clicking it opens the live LinkedIn post (via `urn`) in a fullscreen
//  embed, so the content is mirrored, never retyped.
//
//  To add a post: open it on LinkedIn, copy the number in its URL
//  (…activity-7XXXXXXXXXXXXXXXXXX…) into `urn`, drop its preview image in
//  /public/blog, and add a row at the TOP (newest first).

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

/** The live LinkedIn embed URL for a post. */
export function blogEmbedUrl(urn: string): string {
  return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${urn}`;
}

/** The canonical LinkedIn permalink for a post ("View on LinkedIn"). */
export function blogPostUrl(urn: string): string {
  return `https://www.linkedin.com/feed/update/urn:li:activity:${urn}/`;
}

// Newest first. Everything here is from "Nine GitLab projects" onward.
export const blogs: Blog[] = [
  {
    slug: "what-gitlab-is-all-about",
    title: "This is what GitLab is all about.",
    urn: "7524048485004783616",
    image: "/blog/gitlab-whole-journey.jpg",
    date: "Nov 5, 2026",
  },
  {
    slug: "one-child-row-never-gets-the-memo",
    title:
      "One user changes organizations in GitLab, and one child row never gets the memo.",
    urn: "7523605622995587072",
    image: "/blog/gitlab-foreign-key.jpg",
    date: "Nov 4, 2026",
  },
  {
    slug: "password-past-the-scrubber",
    title:
      "A password can survive secret-scrubbing by sitting one byte past where the scrubber stops reading.",
    urn: "7522275882841989121",
    image: "/blog/gitlab-secret-scrubbing.jpg",
    date: "Oct 31, 2026",
  },
  {
    slug: "move-one-user-between-organizations",
    title: "Move one user between GitLab organizations. The row hanging off it does not follow.",
    urn: "7521524319919943682",
    image: "/blog/gitlab-org-transfer.jpg",
    date: "Oct 29, 2026",
  },
  {
    slug: "nine-gitlab-projects",
    title:
      "Nine GitLab projects, Dozens of MR's. What GitLab taught me about Building at Scale.",
    urn: "7505062396877582336",
    image: "/blog/nine-gitlab-projects.jpg",
    date: "Sep 14, 2026",
  },
];
