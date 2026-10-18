"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Keyboard, X } from "lucide-react";

type Shortcut = { label: string; keys: string[] };

const shortcuts: Shortcut[] = [
  { label: "Go to Home", keys: ["Shift", "H"] },
  { label: "Go to Experience", keys: ["Shift", "E"] },
  { label: "Go to Projects", keys: ["Shift", "P"] },
  { label: "Go to Skills", keys: ["Shift", "S"] },
  { label: "Toggle Theme", keys: ["Shift", "T"] },
  { label: "Open Shortcuts", keys: ["Ctrl", "/"] },
  { label: "Command Palette", keys: ["⌘", "K"] },
];

const routeByLetter: Record<string, string> = {
  H: "/",
  E: "/experience",
  P: "/projects",
  S: "/skills",
};

// Resolve the pressed letter from either `code` (KeyE) or `key` (E/e),
// so it works with real and synthetic keyboard events alike.
function letterOf(e: KeyboardEvent) {
  if (e.code && e.code.startsWith("Key")) return e.code.slice(3).toUpperCase();
  if (e.key && e.key.length === 1) return e.key.toUpperCase();
  return "";
}

function isTypingTarget(el: EventTarget | null) {
  const node = el as HTMLElement | null;
  if (!node) return false;
  const tag = node.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    node.isContentEditable
  );
}

export function KeyboardShortcuts() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ctrl + / opens the shortcuts panel (works even from inputs).
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      // Plain Shift shortcuts — ignore while typing or when other modifiers held.
      if (
        !e.shiftKey ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        isTypingTarget(e.target)
      ) {
        return;
      }

      const letter = letterOf(e);
      if (routeByLetter[letter]) {
        e.preventDefault();
        router.push(routeByLetter[letter]);
      } else if (letter === "T") {
        e.preventDefault();
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [router, resolvedTheme, setTheme]);

  return (
    <>
      <button
        type="button"
        aria-label="Keyboard shortcuts"
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border transition-colors hover:bg-accent hover:text-foreground"
      >
        <Keyboard className="h-4 w-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-lg border border-border bg-popover p-6 text-popover-foreground shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Keyboard Shortcuts
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Move around the site without the mouse.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="space-y-3">
              {shortcuts.map((s) => (
                <li
                  key={s.label}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-sm font-medium text-foreground">
                    {s.label}
                  </span>
                  <kbd className="flex items-center gap-1 rounded border border-border bg-surface/60 px-2 py-1 text-xs text-muted-foreground">
                    {s.keys.join(" + ")}
                  </kbd>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
