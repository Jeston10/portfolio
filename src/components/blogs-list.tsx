"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ArrowUpRight, Loader2 } from "lucide-react";
import { blogs, blogEmbedUrl, blogPostUrl, type Blog } from "@/data/blogs";
import { cn } from "@/lib/utils";

const PER_PAGE = 15; // 3 rows x 5 columns

export function BlogsList() {
  const [page, setPage] = React.useState(0);
  const [active, setActive] = React.useState<Blog | null>(null);

  const pageCount = Math.max(1, Math.ceil(blogs.length / PER_PAGE));
  const start = page * PER_PAGE;
  const visible = blogs.slice(start, start + PER_PAGE);

  return (
    <div>
      {/* 3 columns on every screen (5 rows = 15 per page) */}
      <div className="grid grid-cols-3 gap-5">
        {visible.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} onOpen={() => setActive(blog)} />
        ))}
      </div>

      {/* Pagination (only when there is more than one page) */}
      {pageCount > 1 && (
        <div className="mt-14 flex items-center justify-center gap-2">
          <PagerButton
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </PagerButton>
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-current={i === page ? "page" : undefined}
              className={cn(
                "h-9 w-9 rounded-md border text-sm transition-colors",
                i === page
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-border text-muted-foreground hover:border-ring hover:text-foreground"
              )}
            >
              {i + 1}
            </button>
          ))}
          <PagerButton
            disabled={page >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </PagerButton>
        </div>
      )}

      {active && <BlogModal blog={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function BlogCard({ blog, onOpen }: { blog: Blog; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface text-left transition-colors hover:border-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Preview image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes="33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Title (single line, truncated with …) + date */}
      <div className="flex flex-col gap-1 px-3 py-3">
        <span className="truncate text-sm font-medium text-foreground">
          {blog.title}
        </span>
        <span className="text-xs text-muted-foreground">{blog.date}</span>
      </div>
    </button>
  );
}

function PagerButton({
  children,
  disabled,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-ring hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
      {...rest}
    >
      {children}
    </button>
  );
}

function BlogModal({ blog, onClose }: { blog: Blog; onClose: () => void }) {
  const [loaded, setLoaded] = React.useState(false);

  // Close on Escape and lock background scroll while open.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={blog.title}
    >
      <div
        className="flex h-full max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {blog.title}
            </p>
            <p className="text-xs text-muted-foreground">{blog.date} · LinkedIn</p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <a
              href={blogPostUrl(blog.urn)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
            >
              Open on LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Live LinkedIn embed (the real post, mirrored) */}
        <div className="relative flex-1 overflow-hidden bg-surface">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading post…
            </div>
          )}
          <iframe
            src={blogEmbedUrl(blog.urn)}
            title={blog.title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className="h-full w-full"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
