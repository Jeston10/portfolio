"use client";

import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";
import { FooterName } from "@/components/footer-name";

export function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  // Hidden on the landing terminal.
  if (pathname === "/") return null;

  return (
    <footer className="border-t border-border/60">
      <div className="container mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:px-6 lg:px-12">
        <p>
          © {year} {profile.copyrightName}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="text-term-ok">&gt;_</span>
            updated {profile.lastUpdated}
          </span>
          <KeyboardShortcuts />
          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border transition-colors hover:bg-accent hover:text-foreground"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Oversized 3D name band — press it for a button click */}
      <div className="flex justify-center overflow-hidden px-2 pb-4 pt-2 sm:pb-6">
        <FooterName name="Jeston Singh" />
      </div>
    </footer>
  );
}
