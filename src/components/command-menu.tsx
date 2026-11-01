"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft } from "lucide-react";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

type Item = { label: string; hint: string; href: string };

const navItems: Item[] = [
  { label: "Home", hint: "page", href: "/home" },
  { label: "Experience", hint: "page", href: "/experience" },
  { label: "Projects", hint: "page", href: "/projects" },
  { label: "Skills", hint: "page", href: "/skills" },
  { label: "Blogs", hint: "page", href: "/blogs" },
  { label: "OpenSource", hint: "page", href: "/opensource" },
];

const projectItems: Item[] = projects.map((p) => ({
  label: p.name,
  hint: p.category,
  href: `/projects#${p.slug}`,
}));

const allItems = [...navItems, ...projectItems];

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter(
      (i) =>
        i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q)
    );
  }, [query]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    setActive(0);
  }, [query, open]);

  const go = React.useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router]
  );

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].href);
    }
  };

  return (
    <>
      {/* Trigger: matches the search box in the header */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex h-9 items-center gap-2 rounded-md border border-input bg-surface/60 px-3 text-sm text-muted-foreground transition-colors hover:border-ring sm:w-56"
      >
        <Search className="h-4 w-4" />
        <span className="hidden flex-grow text-left sm:inline">Search…</span>
        <kbd className="hidden items-center gap-0.5 rounded border border-border px-1.5 text-[10px] text-muted-foreground sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[18vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-border px-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onListKey}
                placeholder="Search pages and projects…"
                className="h-12 flex-grow bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                esc
              </kbd>
            </div>

            <ul className="scrollbar-thin max-h-72 overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No results.
                </li>
              )}
              {results.map((item, i) => (
                <li key={item.href + item.label}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(item.href)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors",
                      i === active
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground"
                    )}
                  >
                    <span>{item.label}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {item.hint}
                      </span>
                      {i === active && (
                        <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
